'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('topics', [
      { id: 1, name: 'topic_A', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'topic_B', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('topics', null, {});
  }
};
