const { Organizacion, Categoria, Provincia, Disponibilidad } = require('../models');
const { Op } = require('sequelize');

// Includes reutilizables para no repetir en cada consulta
const includesCompletos = [
  { model: Categoria,     as: 'categoria',     attributes: ['id', 'NombreCategoria'] },
  { model: Provincia,     as: 'provincia',     attributes: ['id', 'NombreProvincia'] },
  { model: Disponibilidad, as: 'disponibilidad', attributes: ['id', 'Nombre'] }
];

/**
 * Obtener todas las organizaciones con paginación y filtros opcionales.
 * @param {number} page - Página actual
 * @param {number} limit - Registros por página
 * @param {object} filtros - { search, idCategoria, IdProvincia }
 */
const obtenerTodas = async (page = 1, limit = 10, filtros = {}) => {
  const offset = (page - 1) * limit;
  const where = {};

  if (filtros.search) {
    where.NombreOrganizacion = { [Op.like]: `%${filtros.search}%` };
  }
  if (filtros.idCategoria) where.idCategoria = filtros.idCategoria;
  if (filtros.IdProvincia) where.IdProvincia = filtros.IdProvincia;

  const { count, rows } = await Organizacion.findAndCountAll({
    where,
    include: includesCompletos,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['NombreOrganizacion', 'ASC']]
  });

  return {
    total: count,
    paginas: Math.ceil(count / limit),
    paginaActual: parseInt(page),
    organizaciones: rows
  };
};

/**
 * Obtener una organización por ID.
 */
const obtenerPorId = async (id) => {
  return await Organizacion.findByPk(id, { include: includesCompletos });
};

/**
 * Crear una nueva organización.
 */
const crear = async (datos) => {
  const { Nombre, Descripcion, Contacto, idCategoria, IdProvincia, idDisponibilidad, ImagenUrl } = datos;

  if (!Nombre) throw new Error('El nombre de la organización es requerido');

  return await Organizacion.create({
    NombreOrganizacion: Nombre,
    Descripcion,
    Contacto,
    idCategoria,
    IdProvincia,
    idDisponibilidad,
    ImagenUrl
  });
};

/**
 * Actualizar una organización existente.
 */
const actualizar = async (id, datos) => {
  const org = await Organizacion.findByPk(id);
  if (!org) throw new Error('Organización no encontrada');

  await org.update(datos);

  return await Organizacion.findByPk(id, { include: includesCompletos });
};

/**
 * Eliminar una organización.
 */
const eliminar = async (id) => {
  const org = await Organizacion.findByPk(id);
  if (!org) throw new Error('Organización no encontrada');
  await org.destroy();
};

module.exports = { obtenerTodas, obtenerPorId, crear, actualizar, eliminar };
