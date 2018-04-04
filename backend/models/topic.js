'use strict';
module.exports = (sequelize, DataTypes) => {
  var topic = sequelize.define('topic', {
    name: DataTypes.STRING
  }, {});
  topic.associate = function(models) {
    topic.belongsToMany(models.user, { through: models.cert_list, constraints: false });
    topic.hasMany(models.debate);    
  };
  return topic;
};
