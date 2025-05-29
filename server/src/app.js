const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const productosRouter = require('./rutas/productos');
app.use('/api/productos', productosRouter);

app.get('/api', (req, res) => {
  res.json({ ok: true, mensaje: 'API Viva!' });
});

module.exports = app;