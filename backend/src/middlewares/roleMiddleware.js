/**
 * Middleware de autorización por rol.
 * Debe usarse siempre después de validarJWT.
 * @param {...string} rolesPermitidos - Nombres de roles con acceso permitido
 */
const permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuarioRol || !rolesPermitidos.includes(req.usuarioRol)) {
      return res.status(403).json({
        ok: false,
        msg: `Acceso denegado: Se requiere el rol de ${rolesPermitidos.join(' o ')}`
      });
    }
    next();
  };
};

module.exports = { permitirRoles };
