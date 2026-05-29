const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.*, u.nombre, u.apellido
      FROM membresias m
      JOIN usuarios u ON m.id_usuario = u.id_usuario
      ORDER BY m.fecha_fin ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { id_usuario, tipo, fecha_inicio, fecha_fin, estado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO membresias (id_usuario, tipo, fecha_inicio, fecha_fin, estado) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [id_usuario, tipo, fecha_inicio, fecha_fin, estado]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { tipo, fecha_inicio, fecha_fin, estado } = req.body;
  try {
    const result = await pool.query(
      'UPDATE membresias SET tipo=$1, fecha_inicio=$2, fecha_fin=$3, estado=$4 WHERE id_membresia=$5 RETURNING *',
      [tipo, fecha_inicio, fecha_fin, estado, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;