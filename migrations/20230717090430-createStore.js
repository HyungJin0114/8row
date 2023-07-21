'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("stores", {
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      storePhoneNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      sales: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("stores")
  },
};
