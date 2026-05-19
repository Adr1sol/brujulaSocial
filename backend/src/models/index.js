const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

//archivo .js correctamente ---
const config = require('../config/config.js');

// Sequelize usará la configuración de 'development' de tu archivo config.js
const dbConfig = config.development;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect || 'mysql',
    logging: false 
});

// --- IMPORTACIÓN DE MODELOS ---
const Rol = require('./Rol')(sequelize, DataTypes);
const Usuario = require('./Usuario')(sequelize, DataTypes);
const Provincia = require('./Provincia')(sequelize, DataTypes);
const Organizacion = require('./Organizacion')(sequelize, DataTypes);
const Categoria = require('./Categoria')(sequelize, DataTypes);
const Aplicacion = require('./Aplicacion')(sequelize, DataTypes);
const Disponibilidad = require('./Disponibilidad')(sequelize, DataTypes);
const Horas = require('./Horas')(sequelize, DataTypes);

// --- DEFINICIÓN DE ASOCIACIONES ---

// 1. Rol ↔ Usuario
Rol.hasMany(Usuario, { foreignKey: 'idRol', as: 'usuarios' });
Usuario.belongsTo(Rol, { foreignKey: 'idRol', as: 'rol' });

// 2. Usuario ↔ Provincia
Usuario.belongsTo(Provincia, { foreignKey: 'IdProvincia', as: 'provincia' });
Provincia.hasMany(Usuario, { foreignKey: 'IdProvincia', as: 'usuarios' });

// 3. Usuario ↔ Organizacion
Usuario.belongsTo(Organizacion, { foreignKey: 'idOrganizacion', as: 'organizacion' });
Organizacion.hasMany(Usuario, { foreignKey: 'idOrganizacion', as: 'miembros' });

// 4. Organizacion ↔ Categoria
Organizacion.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categoria' });
Categoria.hasMany(Organizacion, { foreignKey: 'idCategoria', as: 'organizaciones' });

// 5. Organizacion ↔ Provincia
Organizacion.belongsTo(Provincia, { foreignKey: 'IdProvincia', as: 'provincia' });
Provincia.hasMany(Organizacion, { foreignKey: 'IdProvincia', as: 'organizaciones' });

// 6. Organizacion ↔ Disponibilidad
Organizacion.belongsTo(Disponibilidad, { foreignKey: 'idDisponibilidad', as: 'disponibilidad' });
Disponibilidad.hasMany(Organizacion, { foreignKey: 'idDisponibilidad', as: 'organizaciones' });

// 7. Aplicacion ↔ Usuario y Organizacion
Aplicacion.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
Usuario.hasMany(Aplicacion, { foreignKey: 'idUsuario', as: 'aplicaciones' });

Aplicacion.belongsTo(Organizacion, { foreignKey: 'idOrganizacion', as: 'organizacion' });
Organizacion.hasMany(Aplicacion, { foreignKey: 'idOrganizacion', as: 'aplicaciones' });

// 8. Horas ↔ Usuario y Organizacion
Horas.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
Usuario.hasMany(Horas, { foreignKey: 'idUsuario', as: 'registroHoras' });

Horas.belongsTo(Organizacion, { foreignKey: 'idOrganizacion', as: 'organizacion' });
Organizacion.hasMany(Horas, { foreignKey: 'idOrganizacion', as: 'registroHoras' });

module.exports = {
    sequelize,
    Rol,
    Usuario,
    Provincia,
    Organizacion,
    Categoria,
    Aplicacion,
    Disponibilidad,
    Horas
};