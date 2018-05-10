'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  comment.associate = function(models) {
    comment.belongsTo(models.user);
    comment.belongsTo(models.debate);
  };
  return comment;
};
