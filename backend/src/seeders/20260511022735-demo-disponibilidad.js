'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Disponibilidads', [
      { NombreDisponibilidad: 'Fines de semana', createdAt: new Date(), updatedAt: new Date() },
      { NombreDisponibilidad: 'Lunes a Viernes', createdAt: new Date(), updatedAt: new Date() },
      { NombreDisponibilidad: 'Remoto / Teletrabajo', createdAt: new Date(), updatedAt: new Date() },
      { NombreDisponibilidad: 'Horario Flexible', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Disponibilidads', null, {});
  }
};