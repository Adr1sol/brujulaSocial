'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // No permite correos duplicados
      },
      Contrasena: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Telefono: {
        type: Sequelize.STRING
      },
      Tipo: {
        type: Sequelize.ENUM('Estudiante', 'Empresa', 'Admin'), // Roles definidos
        allowNull: false,
        defaultValue: 'Estudiante'
      },
      IdProvincia: {
        type: Sequelize.INTEGER,
        references: { model: 'Provincia', key: 'id' } // Relación con Provincias
      },
      idOrganizacion: {
        type: Sequelize.INTEGER, // Cambiado a INTEGER para coincidir con el ID de organizaciones
        references: { model: 'Organizacions', key: 'id' }
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
    await queryInterface.dropTable('Usuarios');
  }
};