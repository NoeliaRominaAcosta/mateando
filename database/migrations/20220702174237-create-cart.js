'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
         allowNull: false,
         references : {
          model : {
            tableName : 'users'
          },
          key : 'id'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
         allowNull: false,
         references : {
          model : {
            tableName : 'products'
          },
          key : 'id'
        }
      },
      orderId: {
        type: Sequelize.INTEGER,
         allowNull: false,
         references : {
          model : {
            tableName : 'orders'
          },
          key : 'id'
        }
      },
      quantify: {
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
    await queryInterface.dropTable('Carts');
  }
};