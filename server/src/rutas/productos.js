const express = require('express');
const router = express.Router();
const productosCtrl = require('../controladores/productosControlador');

router.get('/', productosCtrl.obtenerProductos);
router.get('/:id', productosCtrl.obtenerProductoPorId);
router.post('/', productosCtrl.crearProducto);
router.put('/:id', productosCtrl.editarProducto);
router.delete('/:id', productosCtrl.eliminarProducto);

module.exports = router;