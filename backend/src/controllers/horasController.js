const horasService = require('../services/horasService');

/**
 * GET /api/horas
 * Lista todos los registros de horas. Solo Admin.
 */
const obtenerTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const resultado = await horasService.obtenerTodos(page, limit);
    res.json({ ok: true, ...resultado });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

/**
 * GET /api/horas/mis-horas
 * Lista las horas del usuario autenticado.
 */
const misHoras = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const resultado = await horasService.obtenerPorUsuario(req.usuarioId, page, limit);
    res.json({ ok: true, ...resultado });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

/**
 * GET /api/horas/:id
 * Retorna un registro de horas por ID.
 */
const obtenerPorId = async (req, res) => {
  try {
    const registro = await horasService.obtenerPorId(req.params.id);
    if (!registro) return res.status(404).json({ ok: false, msg: 'Registro no encontrado' });
    res.json({ ok: true, registro });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

/**
 * POST /api/horas
 * Registra horas voluntarias. El idUsuario viene del token.
 * Body: { idOrganizacion, actividad, fecha, horas }
 */
const crear = async (req, res) => {
  try {
    const registro = await horasService.crear(req.usuarioId, req.body);
    res.status(201).json({ ok: true, registro });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

/**
 * PUT /api/horas/:id
 * Actualiza un registro de horas. Solo el dueño o Admin.
 */
const actualizar = async (req, res) => {
  try {
    const registro = await horasService.actualizar(req.params.id, req.usuarioId, req.usuarioRol, req.body);
    res.json({ ok: true, registro });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

/**
 * DELETE /api/horas/:id
 * Elimina un registro de horas. Solo el dueño o Admin.
 */
const eliminar = async (req, res) => {
  try {
    await horasService.eliminar(req.params.id, req.usuarioId, req.usuarioRol);
    res.json({ ok: true, msg: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

module.exports = { obtenerTodos, misHoras, obtenerPorId, crear, actualizar, eliminar };
