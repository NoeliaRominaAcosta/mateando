"use strict";
const bcryptjs = require('bcryptjs');

const users = [
  {
    name: "admin",
    email : "admin@gmail.com",
    password : bcryptjs.hashSync("123456",10),
    rolId : 1,
    createdAt: new Date(),
  },
  {
    name: "Noelia",
    email : "noeliaromina20@gmail.com",
    password : bcryptjs.hashSync("123456",10),
    rolId : 2,
    createdAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
