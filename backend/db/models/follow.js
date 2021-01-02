'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    follower: DataTypes.INTEGER,
    following: DataTypes.INTEGER
  }, {});
  Follow.associate = function (models) {
    Follow.belongsTo(models.User, { foreignKey: 'following' });
    Follow.belongsTo(models.User, { foreignKey: 'follower' });
  };
  return Follow;
};
