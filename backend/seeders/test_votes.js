'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('votes', [
      { id: 1, vote: 0, createdAt: new Date(), updatedAt: new Date(), debateId: 1, userUsername: 'aaa' },
      { id: 4, vote: 0, createdAt: new Date(), updatedAt: new Date(), debateId: 1, userUsername: 'bbb' },
      { id: 4, vote: 1, createdAt: new Date(), updatedAt: new Date(), debateId: 1, userUsername: 'ccc' },
      { id: 6, vote: 0, createdAt: new Date(), updatedAt: new Date(), debateId: 2, userUsername: 'bbb' },
      { id: 8, vote: 1, createdAt: new Date(), updatedAt: new Date(), debateId: 2, userUsername: 'ccc' },
      { id: 9, vote: 1, createdAt: new Date(), updatedAt: new Date(), debateId: 2, userUsername: 'aaa' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('votes', null, {});
  }
};
