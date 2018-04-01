'use strict';
module.exports = (sequelize, DataTypes) => {
  var vote = sequelize.define('vote', {
    yes_no: DataTypes.BOOLEAN
  }, {});
  vote.associate = function(models) {
    // associations can be defined here
  };
  return vote;
};