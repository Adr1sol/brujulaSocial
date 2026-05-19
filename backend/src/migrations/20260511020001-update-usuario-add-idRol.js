'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Agregar columna idRol como FK a la tabla roles
    await queryInterface.addColumn('usuarios', 'idRol', {
      type: Sequelize.INTEGER,
      allowNull: true, // Temporal en null para no romper registros existentes
      references: {
        model: 'roles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // 2. Eliminar la columna Tipo (ENUM) que ya no se usará
    await queryInterface.removeColumn('usuarios', 'Tipo');
  },

  async down(queryInterface, Sequelize) {
    // Revertir: agregar Tipo de vuelta y quitar idRol
    await queryInterface.addColumn('usuarios', 'Tipo', {
      type: Sequelize.ENUM('Admin', 'Voluntario', 'Organizacion'),
      allowNull: false,
      defaultValue: 'Estudiante'
    });

    await queryInterface.removeColumn('usuarios', 'idRol');
  }
};
