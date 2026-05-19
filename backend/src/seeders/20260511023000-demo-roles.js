'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Voluntario',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Organizacion',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
