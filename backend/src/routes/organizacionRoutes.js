const express = require('express');
const router = express.Router();
const organizacionController = require('../controllers/organizacionController');
const { validarJWT } = require('../middlewares/authMiddleware');
const { permitirRoles } = require('../middlewares/roleMiddleware');

router.get('/', organizacionController.obtenerTodas);

router.get('/:id', organizacionController.obtenerPorId);

router.post('/', [validarJWT, permitirRoles('Admin')], organizacionController.crear);

router.put('/:id', [validarJWT, permitirRoles('Admin')], organizacionController.actualizar);

router.delete('/:id', [validarJWT, permitirRoles('Admin')], organizacionController.eliminar);

module.exports = router;
