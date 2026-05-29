const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.nombre, u.apellido
      FROM pagos p
      JOIN usuarios u ON p.id_usuario = u.id_usuario
      ORDER BY p.fecha_pago DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { id_usuario, monto, fecha_pago, metodo_pago } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pagos (id_usuario, monto, fecha_pago, metodo_pago) VALUES ($1,$2,$3,$4) RETURNING *',
      [id_usuario, monto, fecha_pago, metodo_pago]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;