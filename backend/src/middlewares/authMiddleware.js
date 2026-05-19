const jwt = require('jsonwebtoken');

/**
 * Middleware que valida el JWT desde la cookie httpOnly.
 * Inyecta req.usuarioId, req.idRol y req.usuarioRol.
 */
const validarJWT = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay sesión activa. Por favor inicia sesión.'
    });
  }

  try {
    const { id, idRol, rol } = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = id;
    req.idRol = idRol;
    req.usuarioRol = rol;
    next();
  } catch (error) {
    res.clearCookie('token');
    res.status(401).json({ ok: false, msg: 'Sesión expirada. Por favor inicia sesión nuevamente.' });
  }
};

module.exports = { validarJWT };
