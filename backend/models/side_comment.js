'use strict';
module.exports = (sequelize, DataTypes) => {
  var side_comment = sequelize.define('side_comment', {
    text: DataTypes.TEXT
  }, {});
  side_comment.associate = function(models) {
//    side_comment.hasOne(models.user);
  };
  return side_comment;
};
