'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cert_lists', [
      { type: 1, topicName: 'topic_A', userUsername: 'aaa' },
      { type: 2, topicName: 'topic_B', userUsername: 'aaa' },
      { type: 2, topicName: 'topic_B', userUsername: 'bbb' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cert_lists', null, {});
  }
};
