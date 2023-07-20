'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      name: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      point: {
        type: Sequelize.INTEGER,
        defaultValue: 1000000,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  },
};
