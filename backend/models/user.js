'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('user', 'admin')
  }, {});
  user.associate = function(models) {
    user.belongsToMany(models.topic, { through: models.cert_list, constraints: false });
    user.hasMany(models.debate);
  };
  return user;
};
