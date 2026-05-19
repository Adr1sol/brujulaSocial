'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Organizacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NombreOrganizacion: {
        type: Sequelize.STRING
      },
      Descripcion: {
        type: Sequelize.TEXT
      },
      CorreoContacto: {
        type: Sequelize.STRING
      },
      contrasena: {
        type: Sequelize.STRING
      },
      idCategoria: {
        type: Sequelize.INTEGER
      },
      IdProvincia: {
        type: Sequelize.INTEGER
      },
      idDisponibilidad: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Organizacions');
  }
};