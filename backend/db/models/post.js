'use strict';

const { post } = require('../../routes/api/session');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    hearts: DataTypes.INTEGER,
    reblogs: DataTypes.INTEGER,
    isReply: DataTypes.BOOLEAN,
    replyTo: DataTypes.INTEGER,
    isReblog: DataTypes.BOOLEAN,
    reblogOf: DataTypes.INTEGER
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.belongsToMany(models.User, { through: models.Heart });
    Post.hasMany(models.Post, { as: 'Reblogs', foreignKey: 'reblogOf' });
    Post.hasMany(models.Post, { as: 'Replies', foreignKey: 'replyTo' });
  };
  return Post;
};
