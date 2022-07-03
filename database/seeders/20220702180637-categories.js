'use strict';
const categories = [
  {
    name :'mates',
    createdAt: new Date()
  },
  {
    name :'termos',
    createdAt: new Date()
  },
  {
    name :'kits',
    createdAt: new Date()
  }

]
module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Categories', categories, {});
   
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
