'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('featured', [
      { id: 1, debateId: 1 },
      { id: 2, debateId: 3 }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('featured', null, {});
  }
};
