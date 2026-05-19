'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Disponibilidad extends Model {
    static associate(models) {
    
      Disponibilidad.hasMany(models.Organizacion, {
        foreignKey: 'idDisponibilidad',
        as: 'organizaciones'
      });
    }
  }
  Disponibilidad.init({
    
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Disponibilidad',
    tableName: 'disponibilidads' // Nombre explícito de la tabla en la DB
  });
  return Disponibilidad;
};