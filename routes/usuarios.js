const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db');

// Obtener todos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_usuario, nombre, apellido, telefono, correo, usuario, rol FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear usuario
router.post('/', async (req, res) => {
  const { nombre, apellido, telefono, correo, usuario, contrasena, rol } = req.body;
  try {
    const hash = await bcrypt.hash(contrasena, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, telefono, correo, usuario, contrasena, rol) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [nombre, apellido, telefono, correo, usuario, hash, rol]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [req.params.id]);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;