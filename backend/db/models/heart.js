'use strict';
module.exports = (sequelize, DataTypes) => {
  const Heart = sequelize.define('Heart', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Heart.associate = function (models) {
    Heart.belongsTo(models.User, { foreignKey: 'userId' });
    Heart.belongsTo(models.Post, { foreignKey: 'postId' });
  };
  return Heart;
};
