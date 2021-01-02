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
    Post.belongsToMany(models.User, { through: models.Heart, foreignKey: 'postId', otherKey: 'userId' });
    [{ as: 'Reblogs', foreignKey: 'reblogOf' }, { as: 'Replies', foreignKey: 'replyTo' }]
      .forEach(fkeyMap => Post.hasMany(models.Post, fkeyMap));
    Post.hasMany(models.Tag, { foreignKey: 'postId' });
  };
  return Post;
};
