'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Provincia extends Model {
    static associate(models) {
      // Una provincia tiene muchas organizaciones (Usando IdProvincia)
      Provincia.hasMany(models.Organizacion, {
        foreignKey: 'IdProvincia',
        as: 'organizaciones'
      });
      
      // Una provincia tiene muchos usuarios (Usando IdProvincia)
      Provincia.hasMany(models.Usuario, {
        foreignKey: 'IdProvincia',
        as: 'usuarios'
      });
    }
  }

  Provincia.init({
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'NombreProvincia'

    }
  }, {
    sequelize,
    modelName: 'Provincia',
    tableName: 'provincia' // Nombre exacto en tu MySQL Workbench
  });

  return Provincia;
};