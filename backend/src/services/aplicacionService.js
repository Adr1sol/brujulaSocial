const { Aplicacion, Usuario, Organizacion } = require('../models');

const includesCompletos = [
  { model: Usuario,      as: 'usuario',      attributes: ['id', 'Nombre', 'Correo'] },
  { model: Organizacion, as: 'organizacion', attributes: ['id', 'NombreOrganizacion'] }
];

/**
 * Obtener todas las aplicaciones con paginación. Solo Admin.
 */
const obtenerTodas = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Aplicacion.findAndCountAll({
    include: includesCompletos,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['FechaAplicacion', 'DESC']]
  });

  return {
    total: count,
    paginas: Math.ceil(count / limit),
    paginaActual: parseInt(page),
    aplicaciones: rows
  };
};

/**
 * Obtener aplicaciones de un usuario específico.
 */
const obtenerPorUsuario = async (idUsuario, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Aplicacion.findAndCountAll({
    where: { idUsuario },
    include: includesCompletos,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['FechaAplicacion', 'DESC']]
  });

  return {
    total: count,
    paginas: Math.ceil(count / limit),
    paginaActual: parseInt(page),
    aplicaciones: rows
  };
};

/**
 * Obtener una aplicación por ID.
 */
const obtenerPorId = async (id) => {
  return await Aplicacion.findByPk(id, { include: includesCompletos });
};

/**
 * Crear una aplicación (voluntario aplica a una organización).
 */
const crear = async (idUsuario, idOrganizacion) => {
  // Verificar que no exista una aplicación duplicada
  const existe = await Aplicacion.findOne({ where: { idUsuario, idOrganizacion } });
  if (existe) throw new Error('Ya aplicaste a esta organización');

  // Verificar que la organización exista
  const org = await Organizacion.findByPk(idOrganizacion);
  if (!org) throw new Error('Organización no encontrada');

  return await Aplicacion.create({
    idUsuario,
    idOrganizacion,
    FechaAplicacion: new Date()
  });
};

/**
 * Eliminar una aplicación.
 */
const eliminar = async (id, idUsuario, rolUsuario) => {
  const aplicacion = await Aplicacion.findByPk(id);
  if (!aplicacion) throw new Error('Aplicación no encontrada');

  // Solo el dueño o un Admin puede eliminar
  if (rolUsuario !== 'Admin' && aplicacion.idUsuario !== idUsuario) {
    throw new Error('No tienes permiso para eliminar esta aplicación');
  }

  await aplicacion.destroy();
};

module.exports = { obtenerTodas, obtenerPorUsuario, obtenerPorId, crear, eliminar };
