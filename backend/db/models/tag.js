'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tag: DataTypes.STRING,
    postId: DataTypes.INTEGER
  }, {});
  Tag.associate = function (models) {
    Tag.belongsTo(models.Post, { foreignKey: 'postId' });
  };
  return Tag;
};
