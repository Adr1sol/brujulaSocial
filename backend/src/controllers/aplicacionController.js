const aplicacionService = require('../services/aplicacionService');

/**
 * GET /api/aplicaciones
 * Lista todas las aplicaciones. Solo Admin.
 */
const obtenerTodas = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const resultado = await aplicacionService.obtenerTodas(page, limit);
    res.json({ ok: true, ...resultado });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

/**
 * GET /api/aplicaciones/mis-aplicaciones
 * Lista las aplicaciones del usuario autenticado.
 */
const misAplicaciones = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const resultado = await aplicacionService.obtenerPorUsuario(req.usuarioId, page, limit);
    res.json({ ok: true, ...resultado });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

/**
 * GET /api/aplicaciones/:id
 * Retorna una aplicación por ID.
 */
const obtenerPorId = async (req, res) => {
  try {
    const aplicacion = await aplicacionService.obtenerPorId(req.params.id);
    if (!aplicacion) return res.status(404).json({ ok: false, msg: 'Aplicación no encontrada' });
    res.json({ ok: true, aplicacion });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

/**
 * POST /api/aplicaciones
 * Crea una aplicación. El idUsuario viene del token JWT.
 * Body: { idOrganizacion }
 */
const crear = async (req, res) => {
  try {
    const { idOrganizacion } = req.body;
    if (!idOrganizacion) return res.status(400).json({ ok: false, msg: 'idOrganizacion es requerido' });

    const aplicacion = await aplicacionService.crear(req.usuarioId, idOrganizacion);
    res.status(201).json({ ok: true, aplicacion });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

/**
 * DELETE /api/aplicaciones/:id
 * Elimina una aplicación. Solo el dueño o Admin.
 */
const eliminar = async (req, res) => {
  try {
    await aplicacionService.eliminar(req.params.id, req.usuarioId, req.usuarioRol);
    res.json({ ok: true, msg: 'Aplicación eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

module.exports = { obtenerTodas, misAplicaciones, obtenerPorId, crear, eliminar };
