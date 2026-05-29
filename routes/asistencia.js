const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const { fecha } = req.query;
  try {
    const result = await pool.query(`
      SELECT a.*, u.nombre, u.apellido
      FROM asistencia a
      JOIN usuarios u ON a.id_usuario = u.id_usuario
      ${fecha ? 'WHERE a.fecha = $1' : ''}
      ORDER BY a.hora DESC
    `, fecha ? [fecha] : []);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { id_usuario, fecha, hora } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO asistencia (id_usuario, fecha, hora) VALUES ($1,$2,$3) RETURNING *',
      [id_usuario, fecha, hora]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;