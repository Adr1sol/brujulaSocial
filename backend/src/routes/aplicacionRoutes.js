const express = require('express');
const router = express.Router();
const aplicacionController = require('../controllers/aplicacionController');
const { validarJWT } = require('../middlewares/authMiddleware');
const { permitirRoles } = require('../middlewares/roleMiddleware');

router.get('/mis-aplicaciones', validarJWT, aplicacionController.misAplicaciones);

router.get('/:id', validarJWT, aplicacionController.obtenerPorId);

router.post('/', [validarJWT, permitirRoles('Voluntario')], aplicacionController.crear);

router.delete('/:id', validarJWT, aplicacionController.eliminar);

router.get('/', [validarJWT, permitirRoles('Admin')], aplicacionController.obtenerTodas);

module.exports = router;
