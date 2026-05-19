'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Organizacion extends Model {
    static associate(models) {
      // Relación con Categoría
      Organizacion.belongsTo(models.Categoria, {
        foreignKey: 'idCategoria',
        as: 'categoria'
      });
      
      // Relación con Provincia (Corregido a 'IdProvincia' con P mayúscula)
      Organizacion.belongsTo(models.Provincia, {
        foreignKey: 'IdProvincia', 
        as: 'provincia'
      });
      
      // Relación con Disponibilidad
      Organizacion.belongsTo(models.Disponibilidad, {
        foreignKey: 'idDisponibilidad',
        as: 'disponibilidad'
      });
      
      // Relación con Usuarios
      Organizacion.hasMany(models.Usuario, {
        foreignKey: 'idOrganizacion',
        as: 'miembros'
      });
    }
  }

  Organizacion.init({
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'NombreOrganizacion'
    },
    Descripcion: DataTypes.TEXT,
    Contacto: DataTypes.STRING,
    idCategoria: DataTypes.INTEGER,
    IdProvincia: DataTypes.INTEGER, // 'P' mayúscula para coincidir con la DB
    idDisponibilidad: DataTypes.INTEGER,
    ImagenUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organizacion',
    tableName: 'organizacions' // El nombre que vimos en tu MySQL Workbench
  });

  return Organizacion;
};