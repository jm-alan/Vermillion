'use strict';
module.exports = (sequelize, DataTypes) => {
  const Heart = sequelize.define('Heart', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Heart.associate = function(models) {
    // associations can be defined here
  };
  return Heart;
};