const authService = require('../services/authService');

/**
 * POST /api/v1/auth/register
 * Registra un nuevo usuario.
 */
const register = async (req, res) => {
    try {
        const nuevoUsuario = await authService.registrar(req.body);
        res.status(201).json({ ok: true, usuario: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ ok: false, msg: error.message });
    }
};

/**
 * POST /api/v1/auth/login
 * Inicia sesión, setea cookie httpOnly con el JWT y retorna datos del usuario.
 */
const login = async (req, res) => {
    try {
        const { Correo, Contrasena } = req.body;
        const { usuario, token } = await authService.login(Correo, Contrasena);

        // Setear cookie httpOnly — el browser la envía automáticamente
        res.cookie('token', token, {
            httpOnly: true,        // JavaScript no puede leerla
            secure: process.env.NODE_ENV === 'production', // HTTPS en prod
            sameSite: 'Lax',       // Protección CSRF básica
            maxAge: 60 * 60 * 1000 // 1 hora en ms
        });

        res.json({
            ok: true,
            usuario: {
                id: usuario.id,
                nombre: usuario.Nombre,
                correo: usuario.Correo,
                rol: usuario.rol.nombre
            }
        });
    } catch (error) {
        res.status(401).json({ ok: false, msg: error.message });
    }
};

/**
 * POST /api/v1/auth/logout
 * Cierra sesión limpiando la cookie.
 */
const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'Lax' });
    res.json({ ok: true, msg: 'Sesión cerrada correctamente' });
};

module.exports = { login, register, logout };
