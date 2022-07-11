'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      description: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : {
            tableName : 'categories'
          },
          key : 'id'
        }
      },
      stock: {
        type: Sequelize.INTEGER
      },
       discount: {
        type: Sequelize.INTEGER
      },
      sales: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};