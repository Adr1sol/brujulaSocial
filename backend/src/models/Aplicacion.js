'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Aplicacion extends Model {
    static associate(models) {
      // Una aplicación pertenece a un usuario
      Aplicacion.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuario'
      });
      // Una aplicación pertenece a una organización
      Aplicacion.belongsTo(models.Organizacion, {
        foreignKey: 'idOrganizacion',
        as: 'organizacion'
      });
    }
  }
  Aplicacion.init({
    // Cambiados a INTEGER para consistencia con los modelos relacionados
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idOrganizacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FechaAplicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Aplicacion',
    tableName: 'aplicacions' // Nombre explícito en la DB
  });
  return Aplicacion;
};