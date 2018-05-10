'use strict';
module.exports = (sequelize, DataTypes) => {
  var ballot = sequelize.define('ballot', {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  ballot.associate = function(models) {
  };
  return ballot;
};
