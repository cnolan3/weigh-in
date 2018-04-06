'use strict';
module.exports = (sequelize, DataTypes) => {
  var debate = sequelize.define('debate', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  debate.associate = function(models) {
    debate.hasMany(models.vote);
    debate.belongsTo(models.user, { as: 'author' });
  };
  return debate;
};
