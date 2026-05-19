'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Horas extends Model {
    static associate(models) {
      // El registro de horas pertenece a un usuario
      Horas.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuario'
      });
      // El registro de horas pertenece a una organización
      Horas.belongsTo(models.Organizacion, {
        foreignKey: 'idOrganizacion',
        as: 'organizacion'
      });
    }
  }
  Horas.init({
    // Cambiados a INTEGER para coincidir con las llaves primarias de Usuario y Organizacion
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idOrganizacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    actividad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    horas: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Horas',
    tableName: 'horas'
  });
  return Horas;
};