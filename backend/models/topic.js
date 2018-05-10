'use strict';
module.exports = (sequelize, DataTypes) => {
  var topic = sequelize.define('topic', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    timestamps: false
  });
  topic.associate = function(models) {
    topic.belongsToMany(models.user, { through: models.cert_list, constraints: false });
    topic.hasMany(models.debate);    
  };
  return topic;
};
