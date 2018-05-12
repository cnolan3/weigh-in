'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('topics', [
      { name: 'topic_A' },
      { name: 'topic_B' },
      { name: 'topic_C' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('topics', null, {});
  }
};
