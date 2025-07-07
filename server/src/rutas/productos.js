const express = require('express');
const router = express.Router();
const productosControlador = require('../controladores/productosControlador');

// ...otras rutas...

// Ruta para obtener los 6 productos más vendidos
router.get('/mas-vendidos', productosControlador.obtenerMasVendidos);

module.exports = router;
