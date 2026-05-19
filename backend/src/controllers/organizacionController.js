const organizacionService = require('../services/organizacionService');

/**
 * GET /api/organizaciones
 * Lista todas las organizaciones con paginación y filtros opcionales.
 * Query params: ?page=1&limit=10&search=eco&idCategoria=1&IdProvincia=2
 */
const obtenerTodas = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, idCategoria, IdProvincia } = req.query;
    const resultado = await organizacionService.obtenerTodas(page, limit, { search, idCategoria, IdProvincia });
    res.json({ ok: true, ...resultado });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

/**
 * GET /api/organizaciones/:id
 * Retorna una organización por ID.
 */
const obtenerPorId = async (req, res) => {
  try {
    const org = await organizacionService.obtenerPorId(req.params.id);
    if (!org) return res.status(404).json({ ok: false, msg: 'Organización no encontrada' });
    res.json({ ok: true, organizacion: org });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

/**
 * POST /api/organizaciones
 * Crea una nueva organización. Solo Admin.
 */
const crear = async (req, res) => {
  try {
    const org = await organizacionService.crear(req.body);
    res.status(201).json({ ok: true, organizacion: org });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

/**
 * PUT /api/organizaciones/:id
 * Actualiza una organización. Solo Admin.
 */
const actualizar = async (req, res) => {
  try {
    const org = await organizacionService.actualizar(req.params.id, req.body);
    res.json({ ok: true, organizacion: org });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

/**
 * DELETE /api/organizaciones/:id
 * Elimina una organización. Solo Admin.
 */
const eliminar = async (req, res) => {
  try {
    await organizacionService.eliminar(req.params.id);
    res.json({ ok: true, msg: 'Organización eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

module.exports = { obtenerTodas, obtenerPorId, crear, actualizar, eliminar };
