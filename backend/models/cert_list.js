'use strict';
module.exports = (sequelize, DataTypes) => {
  var cert_list = sequelize.define('cert_list', {
    type: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  return cert_list;
};
