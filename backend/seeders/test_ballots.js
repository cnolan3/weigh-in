'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ballots', [
      { id: 1, vote: 1, name: 'yes', debateId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, vote: 0, name: 'no', debateId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, vote: 0, name: 'A', debateId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, vote: 1, name: 'B', debateId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, vote: 2, name: 'C', debateId: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ballots', null, {});
  }
};
