const express = require('express');
const router = express.Router();
const { Categoria } = require('../models');

router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ order: [['NombreCategoria', 'ASC']] });
    res.json({ ok: true, categorias });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
});

module.exports = router;
