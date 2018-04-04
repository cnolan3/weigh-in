'use strict';
module.exports = (sequelize, DataTypes) => {
  var debate = sequelize.define('debate', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  debate.associate = function(models) {
    debate.hasMany(models.vote);
    debate.hasMany(models.main_comment);
//    debate.hasMany(models.side_comment);
//    debate.belongsTo(models.user);
  };
  return debate;
};
