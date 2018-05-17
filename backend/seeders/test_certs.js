'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cert_lists', [
      { type: 1, topicName: 'cooking', userUsername: 'aaa' },
      { type: 2, topicName: 'T.V.', userUsername: 'aaa' },
      { type: 2, topicName: 'T.V.', userUsername: 'bbb' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cert_lists', null, {});
  }
};
