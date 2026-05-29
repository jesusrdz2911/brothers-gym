const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use('/api/auth',        require('./routes/auth'));
app.use('/api/usuarios',    require('./routes/usuarios'));
app.use('/api/membresias',  require('./routes/membresias'));
app.use('/api/pagos',       require('./routes/pagos'));
app.use('/api/asistencia',  require('./routes/asistencia'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Brothers Gym API corriendo en http://localhost:${PORT}`);
});