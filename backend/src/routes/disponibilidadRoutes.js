const express = require('express');
const router = express.Router();
const { Disponibilidad } = require('../models');

router.get('/', async (req, res) => {
  try {
    const disponibilidades = await Disponibilidad.findAll({ order: [['Nombre', 'ASC']] });
    res.json({ ok: true, disponibilidades });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
});

module.exports = router;
