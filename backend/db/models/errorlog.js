'use strict';
module.exports = (sequelize, DataTypes) => {
  const ErrorLog = sequelize.define('ErrorLog', {
    location: DataTypes.STRING,
    during: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});
  ErrorLog.associate = function(models) {
    // associations can be defined here
  };
  return ErrorLog;
};