'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('cert_lists', [
      { type: 'certified', topicId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { type: 'expert', topicId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { type: 'expert', topicId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    return queryInterface.bulkInsert('topics', [
      { id: 1, name: 'topic_A', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'topic_B', createdAt: new Date(), updatedAt: new Date() }
    ], {}).then(() => {

      return queryInterface.bulkInsert('users', [
        { id: 1, firstName: 'aaa', lastName: 'aaa', email: 'aaa', username: 'aaa', password: 'aaa', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, firstName: 'bbb', lastName: 'bbb', email: 'bbb', username: 'bbb', password: 'bbb', createdAt: new Date(), updatedAt: new Date() },
        { id: 3, firstName: 'ccc', lastName: 'ccc', email: 'ccc', username: 'ccc', password: 'ccc', createdAt: new Date(), updatedAt: new Date() }
      ], {}).then(() => {

        return queryInterface.bulkInsert('debates', [
          { id: 1, title: 'debate_A', description: 'AAA', topicId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() }
        ], {}).then(() => {

          return queryInterface.bulkInsert('main_comments', [
            { id: 1, text: 'I don\'t know about that', debateId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, text: 'Do some research', debateId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() }
          ], {});

        });
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('debates', null, {});
    queryInterface.bulkDelete('main_comments', null, {});
    queryInterface.bulkDelete('topics', null, {});
    queryInterface.bulkDelete('cert_lists', null, {});
    return queryInterface.bulkDelete('users', null, {}); 
  }
};
