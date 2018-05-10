'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('votes', [
      { id: 1, vote: 0, createdAt: new Date(), updatedAt: new Date(), debateId: 1 },
      { id: 2, vote: 1, createdAt: new Date(), updatedAt: new Date(), debateId: 1 },
      { id: 3, vote: 1, createdAt: new Date(), updatedAt: new Date(), debateId: 1 },
      { id: 4, vote: 0, createdAt: new Date(), updatedAt: new Date(), debateId: 1 },
      { id: 5, vote: 1, createdAt: new Date(), updatedAt: new Date(), debateId: 1 },
      { id: 6, vote: 0, createdAt: new Date(), updatedAt: new Date(), debateId: 2 },
      { id: 7, vote: 2, createdAt: new Date(), updatedAt: new Date(), debateId: 2 },
      { id: 8, vote: 2, createdAt: new Date(), updatedAt: new Date(), debateId: 2 },
      { id: 9, vote: 1, createdAt: new Date(), updatedAt: new Date(), debateId: 2 },
      { id: 10, vote: 0, createdAt: new Date(), updatedAt: new Date(), debateId: 2 },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('votes', null, {});
  }
};
