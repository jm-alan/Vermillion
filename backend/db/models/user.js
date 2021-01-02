'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail (value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: [
          'hashedPassword',
          'email',
          'createdAt',
          'updatedAt'
        ]
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: [
            'hashedPassword',
            'createdAt',
            'updatedAt'
          ]
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  User.associate = function (models) {
    [
      models.Post,
      models.Heart
    ].forEach(model => User.hasMany(model, { foreignKey: 'userId' }));
    [
      { foreignKey: 'follower' },
      { foreignKey: 'following' }
    ].forEach(fkey => User.hasMany(models.Follow, fkey));
    [
      [
        models.User,
        {
          through: models.Follow,
          as: 'Followers',
          foreignKey: 'follower'
        }
      ],
      [
        models.User,
        {
          through: models.Follow,
          as: 'Following',
          foreignKey: 'following'
        }
      ],
      [
        models.Post,
        {
          through: models.Heart,
          foreignKey: 'userId',
          otherKey: 'postId'
        }
      ]
    ].forEach(map => User.belongsToMany(...map));
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ identification, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: identification,
          email: identification
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.prototype.toSafeObject = function () {
    return { id: this.id, username: this.username, email: this.email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};
