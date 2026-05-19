'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.Provincia, {
        foreignKey: 'IdProvincia',
        as: 'provincia'
      });

      Usuario.belongsTo(models.Organizacion, {
        foreignKey: 'idOrganizacion',
        as: 'organizacion'
      });

      // Relación con la tabla roles (reemplaza el campo Tipo ENUM)
      Usuario.belongsTo(models.Rol, {
        foreignKey: 'idRol',
        as: 'rol'
      });

      Usuario.hasMany(models.Aplicacion, { foreignKey: 'idUsuario', as: 'aplicaciones' });
      Usuario.hasMany(models.Horas, { foreignKey: 'idUsuario', as: 'registroHoras' });
    }
  }

  Usuario.init({
    Nombre: { type: DataTypes.STRING, allowNull: false },
    Correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    Contrasena: { type: DataTypes.STRING, allowNull: false },
    Telefono: DataTypes.STRING,
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'roles', key: 'id' }
    },
    IdProvincia: DataTypes.INTEGER,
    idOrganizacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios'
  });

  return Usuario;
};