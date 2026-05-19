'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categoria', [
      { NombreCategoria: 'Medio Ambiente', createdAt: new Date(), updatedAt: new Date() },
      { NombreCategoria: 'Educación', createdAt: new Date(), updatedAt: new Date() },
      { NombreCategoria: 'Salud', createdAt: new Date(), updatedAt: new Date() },
      { NombreCategoria: 'Bienestar Animal', createdAt: new Date(), updatedAt: new Date() },
      { NombreCategoria: 'Comunidad', createdAt: new Date(), updatedAt: new Date() },
      { NombreCategoria: 'Cultura', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categoria', null, {});
  }
};