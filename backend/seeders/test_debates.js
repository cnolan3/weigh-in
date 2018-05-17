'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('debates', [
      { id: 1, title: 'Is lasagna a baked good?', description: 'Is lasanga a baked good or not?', minUserType: 1, createdAt: new Date(), updatedAt: new Date(), topicName: "Cooking", authorUsername: "aaa" },
      { id: 2, title: 'Are we in a simulation?', description: 'bbb', minUserType: 1, createdAt: new Date(), updatedAt: new Date(), topicName: "Philosophy", authorUsername: "aaa" },
      { id: 3, title: 'Is Silicon Valley Good?', description: 'aaaaaaa', minUserType: 2, createdAt: new Date(), updatedAt: new Date(), topicName: "T.V.", authorUsername: "bbb" },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('debates', null, {});
  }
};
