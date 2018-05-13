'use strict';
module.exports = (sequelize, DataTypes) => {
  var vote = sequelize.define('vote', {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  vote.associate = function(models) {
    vote.belongsTo(models.user);
    vote.belongsTo(models.debate);
  };
  return vote;
};
