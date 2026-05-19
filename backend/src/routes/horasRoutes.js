const express = require('express');
const router = express.Router();
const horasController = require('../controllers/horasController');
const { validarJWT } = require('../middlewares/authMiddleware');
const { permitirRoles } = require('../middlewares/roleMiddleware');

router.get('/mis-horas', validarJWT, horasController.misHoras);

router.get('/:id', validarJWT, horasController.obtenerPorId);

router.post('/', [validarJWT, permitirRoles('Voluntario')], horasController.crear);

router.put('/:id', validarJWT, horasController.actualizar);

router.delete('/:id', validarJWT, horasController.eliminar);

router.get('/', [validarJWT, permitirRoles('Admin')], horasController.obtenerTodos);

module.exports = router;
