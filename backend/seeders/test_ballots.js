'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ballots', [
      { id: 1, vote: 1, name: 'yes', debateId: 1 },
      { id: 2, vote: 0, name: 'no', debateId: 1 },
      { id: 3, vote: 0, name: 'no', debateId: 2 },
      { id: 4, vote: 1, name: 'yes', debateId: 2 },
      { id: 5, vote: 0, name: 'no', debateId: 3 },
      { id: 6, vote: 1, name: 'yes', debateId: 3 }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ballots', null, {});
  }
};
