'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      { id: 1, firstName: "aaa", lastName: "aaa", email: "aaa@aaa", username: "aaa", password: "$2a$10$nxQT2FihxpcSXYHicAK3V.azbv/RJA8ebu4MUn2kdailpmuS/vM7a", role: "user", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, firstName: "bbb", lastName: "bbb", email: "bbb@bbb", username: "bbb", password: "$2a$10$/ANi6eieX8u5iDBbHHpyAemJFphY/NfRVliuMqg.i.woDxNdABKFy", role: "user", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, firstName: "ccc", lastName: "ccc", email: "ccc@ccc", username: "ccc", password: "$2a$10$VwnBaY2UwR3jttSZCs/PPeYr7oziA.BJjWxzwef2d8n8aDJtRE5H2", role: "user", createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
