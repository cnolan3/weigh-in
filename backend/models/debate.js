'use strict';
module.exports = (sequelize, DataTypes) => {
  var debate = sequelize.define('debate', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    minUserType: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {});
  debate.associate = function(models) {
    debate.hasMany(models.vote, { constraints: false });
    debate.hasMany(models.ballot, { constraints: false });
    debate.belongsTo(models.user, { as: 'author', constraints: false });
  };
  return debate;
};
