const usuarioService = require('../services/usuarioService');

/**
 * GET /api/usuarios/:id
 * Retorna el perfil de un usuario por su ID (sin contraseña).
 */
const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await usuarioService.buscarPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
    }
    res.json({ ok: true, usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
  }
};

/**
 * GET /api/usuarios
 * Retorna todos los usuarios (solo Admin).
 */
const obtenerTodos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodosLosUsuarios();
    res.json({ ok: true, usuarios });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al obtener la lista' });
  }
};

/**
 * PUT /api/usuarios/:id
 * Actualiza los datos de un usuario.
 */
const actualizarPerfil = async (req, res) => {
  try {
    const actualizado = await usuarioService.actualizarUsuario(req.params.id, req.body);
    res.json({ ok: true, usuario: actualizado });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

/**
 * DELETE /api/usuarios/:id
 * Elimina un usuario.
 * Permitido: el propio usuario o un Admin.
 * El mensaje de respuesta varía según el rol del usuario eliminado.
 */
const eliminarPerfil = async (req, res) => {
  try {
    const idSolicitado = parseInt(req.params.id);
    const esElMismo    = req.usuarioId === idSolicitado;
    const esAdmin      = req.usuarioRol === 'Admin';

    if (!esElMismo && !esAdmin) {
      return res.status(403).json({
        ok: false,
        msg: 'No tienes permiso para eliminar esta cuenta'
      });
    }

    await usuarioService.eliminarUsuario(idSolicitado);

    const mensajes = {
      'Admin':        'Administrador eliminado correctamente',
      'Voluntario':   'Usuario eliminado correctamente',
      'Organizacion': 'Organización eliminada correctamente'
    };
    const msg = mensajes[req.usuarioRol] || 'Usuario eliminado correctamente';

    res.json({ ok: true, msg });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
};

module.exports = {
  obtenerPerfil,
  obtenerTodos,
  actualizarPerfil,
  eliminarPerfil
};