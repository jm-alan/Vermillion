'use strict';
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
  };
  return Post;
};
