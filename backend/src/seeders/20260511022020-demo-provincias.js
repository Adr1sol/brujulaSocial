'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Provincia', [
      { NombreProvincia: 'San José', createdAt: new Date(), updatedAt: new Date() },
      { NombreProvincia: 'Alajuela', createdAt: new Date(), updatedAt: new Date() },
      { NombreProvincia: 'Cartago', createdAt: new Date(), updatedAt: new Date() },
      { NombreProvincia: 'Heredia', createdAt: new Date(), updatedAt: new Date() },
      { NombreProvincia: 'Guanacaste', createdAt: new Date(), updatedAt: new Date() },
      { NombreProvincia: 'Puntarenas', createdAt: new Date(), updatedAt: new Date() },
      { NombreProvincia: 'Limón', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Provincia', null, {});
  }
};