'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductReviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      rating: {
        type : Sequelize.INTEGER,
        allowNull : false,
      },
      ProductId: {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "ProductDetails",
          key : "id"
        }
      }, 
      UserId: {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "Users",
          key : "id"
        }
      }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductReviews');
  }
};