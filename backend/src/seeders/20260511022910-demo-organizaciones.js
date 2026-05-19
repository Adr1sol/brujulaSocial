'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('organizacions', [
      {
        NombreOrganizacion: 'EcoVida Costa Rica',
        Descripcion: 'Organización dedicada a la reforestación y limpieza de playas.',
        CorreoContacto: 'info@ecovida.cr',
        contrasena: 'password123',
        idCategoria: 1, 
        IdProvincia: 1, 
        idDisponibilidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        NombreOrganizacion: 'Patitas al Rescate',
        Descripcion: 'Refugio para perros y gatos en busca de un hogar.',
        CorreoContacto: 'adopciones@patitas.cr',
        contrasena: 'password123',
        idCategoria: 1, 
        IdProvincia: 2, 
        idDisponibilidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('organizacions', null, {});
  }
};