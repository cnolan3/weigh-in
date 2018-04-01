'use strict';
module.exports = (sequelize, DataTypes) => {
  var debate = sequelize.define('debate', {
    title: DataTypes.STRING,
    author: DataTypes.STRING
  }, {});
  debate.associate = function(models) {
    debate.hasMany(models.vote);
  };
  return debate;
};
