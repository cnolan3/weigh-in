'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('main_comments', [
      { id: 1, text: "first", createdAt: new Date(), updatedAt: new Date(), debateId: 1, userId: 1 },
      { id: 2, text: "second", createdAt: new Date(), updatedAt: new Date(), debateId: 1, userId: 2 },
      { id: 3, text: "third", createdAt: new Date(), updatedAt: new Date(), debateId: 2, userId: 1 },
      { id: 4, text: "fourth", createdAt: new Date(), updatedAt: new Date(), debateId: 3, userId: 3 }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('main_comments', null, {});
  }
};
