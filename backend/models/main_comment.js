'use strict';
module.exports = (sequelize, DataTypes) => {
  var main_comment = sequelize.define('main_comment', {
    text: DataTypes.TEXT
  }, {});
  main_comment.associate = function(models) {
    main_comment.belongsTo(models.user);
    main_comment.belongsTo(models.debate);
  };
  return main_comment;
};
