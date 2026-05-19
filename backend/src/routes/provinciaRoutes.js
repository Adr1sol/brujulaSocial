const express = require('express');
const router = express.Router();
const { Provincia } = require('../models');

router.get('/', async (req, res) => {
  try {
    const provincias = await Provincia.findAll({ order: [['NombreProvincia', 'ASC']] });
    res.json({ ok: true, provincias });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
});

module.exports = router;
