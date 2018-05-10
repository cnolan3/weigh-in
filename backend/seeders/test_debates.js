'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('debates', [
      { id: 1, title: 'debate_A', description: 'aaa', minUserType: 1, createdAt: new Date(), updatedAt: new Date(), topicId: 1, authorId: 1 },
      { id: 2, title: 'debate_B', description: 'bbb', minUserType: 1, createdAt: new Date(), updatedAt: new Date(), topicId: 2, authorId: 1 },
      { id: 3, title: 'debate_C', description: 'ccc', minUserType: 2, createdAt: new Date(), updatedAt: new Date(), topicId: 2, authorId: 2 },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('debates', null, {});
  }
};
