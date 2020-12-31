'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    follower: DataTypes.INTEGER,
    following: DataTypes.INTEGER
  }, {});
  Follow.associate = function (models) {
    // associations can be defined here
  };
  return Follow;
};
