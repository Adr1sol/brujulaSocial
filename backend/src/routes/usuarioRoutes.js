const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { validarJWT } = require('../middlewares/authMiddleware');
const { permitirRoles } = require('../middlewares/roleMiddleware');

// RUTAS PRIVADAS — requieren token JWT
router.get('/:id', validarJWT, usuarioController.obtenerPerfil);
router.put('/:id', validarJWT, usuarioController.actualizarPerfil);

// RUTAS DE ADMINISTRADOR — requieren token + rol Admin
router.get('/', [validarJWT, permitirRoles('Admin')], usuarioController.obtenerTodos);
// DELETE — permitido al propio usuario o Admin (la verificación está en el controlador)
router.delete('/:id', validarJWT, usuarioController.eliminarPerfil);

module.exports = router;
