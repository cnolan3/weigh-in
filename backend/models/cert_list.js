'use strict';
module.exports = (sequelize, DataTypes) => {
  var cert_list = sequelize.define('cert_list', {
    type: DataTypes.ENUM('certified', 'expert')
  }, {});
  return cert_list;
};
