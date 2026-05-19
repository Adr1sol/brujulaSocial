'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      // Una categoría puede tener muchas organizaciones
      Categoria.hasMany(models.Organizacion, {
        foreignKey: 'idCategoria',
        as: 'organizaciones'
      });
    }
  }
  Categoria.init({

    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'NombreCategoria'
    }
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categoria' // Nombre explícito en la base de datos
  });
  return Categoria;
};