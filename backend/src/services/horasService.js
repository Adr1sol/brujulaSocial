const { Horas, Usuario, Organizacion } = require('../models');

const includesCompletos = [
  { model: Usuario,      as: 'usuario',      attributes: ['id', 'Nombre', 'Correo'] },
  { model: Organizacion, as: 'organizacion', attributes: ['id', 'NombreOrganizacion'] }
];

/**
 * Obtener todos los registros de horas con paginación. Solo Admin.
 */
const obtenerTodos = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Horas.findAndCountAll({
    include: includesCompletos,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['fecha', 'DESC']]
  });

  return {
    total: count,
    paginas: Math.ceil(count / limit),
    paginaActual: parseInt(page),
    registros: rows
  };
};

/**
 * Obtener las horas registradas por un usuario específico.
 */
const obtenerPorUsuario = async (idUsuario, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Horas.findAndCountAll({
    where: { idUsuario },
    include: includesCompletos,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['fecha', 'DESC']]
  });

  return {
    total: count,
    paginas: Math.ceil(count / limit),
    paginaActual: parseInt(page),
    registros: rows
  };
};

/**
 * Obtener un registro de horas por ID.
 */
const obtenerPorId = async (id) => {
  return await Horas.findByPk(id, { include: includesCompletos });
};

/**
 * Registrar horas voluntarias.
 * @param {number} idUsuario - ID del voluntario
 * @param {object} datos - { idOrganizacion, actividad, fecha, horas }
 */
const crear = async (idUsuario, datos) => {
  const { idOrganizacion, actividad, fecha, horas } = datos;

  if (!idOrganizacion || !actividad || !horas) {
    throw new Error('idOrganizacion, actividad y horas son requeridos');
  }

  if (horas <= 0) throw new Error('Las horas deben ser un número positivo');

  const org = await Organizacion.findByPk(idOrganizacion);
  if (!org) throw new Error('Organización no encontrada');

  return await Horas.create({
    idUsuario,
    idOrganizacion,
    actividad,
    fecha: fecha || new Date(),
    horas
  });
};

/**
 * Actualizar un registro de horas.
 */
const actualizar = async (id, idUsuario, rolUsuario, datos) => {
  const registro = await Horas.findByPk(id);
  if (!registro) throw new Error('Registro de horas no encontrado');

  if (rolUsuario !== 'Admin' && registro.idUsuario !== idUsuario) {
    throw new Error('No tienes permiso para modificar este registro');
  }

  await registro.update(datos);
  return await Horas.findByPk(id, { include: includesCompletos });
};

/**
 * Eliminar un registro de horas.
 */
const eliminar = async (id, idUsuario, rolUsuario) => {
  const registro = await Horas.findByPk(id);
  if (!registro) throw new Error('Registro de horas no encontrado');

  if (rolUsuario !== 'Admin' && registro.idUsuario !== idUsuario) {
    throw new Error('No tienes permiso para eliminar este registro');
  }

  await registro.destroy();
};

module.exports = { obtenerTodos, obtenerPorUsuario, obtenerPorId, crear, actualizar, eliminar };
