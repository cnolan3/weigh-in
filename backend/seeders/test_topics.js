'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('topics', [
      { name: 'Cooking' },
      { name: 'Philosophy' },
      { name: 'T.V.' },
      { name: 'Sports' },
      { name: 'Art' },
      { name: 'Pets/Animals' },
      { name: 'Misc.' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('topics', null, {});
  }
};
