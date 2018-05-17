'use strict';
module.exports = (sequelize, DataTypes) => {
  var featured = sequelize.define('featured', {

  }, {
    timestamps: false,
    freezeTableName: true
  });
  featured.associate = function(models) {
    featured.belongsTo(models.debate);
  };
  return featured;
};

