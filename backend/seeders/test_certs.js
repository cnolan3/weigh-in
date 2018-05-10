'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cert_lists', [
      { type: 1, createdAt: new Date(), updatedAt: new Date(), topicId: 1, userId: 1 },
      { type: 2, createdAt: new Date(), updatedAt: new Date(), topicId: 2, userId: 1 },
      { type: 2, createdAt: new Date(), updatedAt: new Date(), topicId: 2, userId: 2 }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cert_lists', null, {});
  }
};
