'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('topics', [
      { id: 1, name: 'topic_A', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'topic_B', createdAt: new Date(), updatedAt: new Date() }
    ], {}).then(() => {

			return queryInterface.bulkInsert('users', [
				{ id: 1, firstName: 'aaa', lastName: 'aaa', username: 'aaa', password: '$2a$10$np/CREtQERjnrP5fkD1YVeSBY43oxH48bdUtF1Vfrjk.02pXHGL/S', email: 'aaa@aaa', role: 'user', createdAt: new Date(), updatedAt: new Date() },
				{ id: 1, firstName: 'bbb', lastName: 'bbb', username: 'bbb', password: '$2a$10$huFy0KXqrf1IjjxMbalB4OFJEiRnM4pmGtIMwl3xrzHOdXhdeWM1i', email: 'bbb@bbb', role: 'user', createdAt: new Date(), updatedAt: new Date() },
				{ id: 1, firstName: 'bbb', lastName: 'bbb', username: 'bbb', password: '$2a$10$SggJ0nPVGyQEgMlp.pDW3eSi0xP8J.FP8LpZGS3m/mMub48FzmcCK', email: 'bbb@bbb', role: 'user', createdAt: new Date(), updatedAt: new Date() }
			], {}).then(() => {

				return queryInterface.bulkInsert('cert_lists', [
					{ type: 'expert', createdAt: new Date(), updatedAt: new Date(), topicId: 1, userId: 1 },
					{ type: 'certified', createdAt: new Date(), updatedAt: new Date(), topicId: 2, userId: 1 },
					{ type: 'certified', createdAt: new Date(), updatedAt: new Date(), topicId: 2, userId: 2 }
				], {});

			});
		});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('topics', null, {});
    queryInterface.bulkDelete('users', null, {}); 
    return queryInterface.bulkDelete('cert_lists', null, {});
  }
};
