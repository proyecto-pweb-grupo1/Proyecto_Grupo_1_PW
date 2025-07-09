import express from 'express';
import * as catalogoCtrl from '../controladores/productosControlador.js';

const router = express.Router();

// PRODUCTOS
router.get('/productos', catalogoCtrl.obtenerProductos);
router.get('/productos/:id', catalogoCtrl.obtenerProductoPorId);
router.post('/productos', catalogoCtrl.crearProducto);
router.put('/productos/:id', catalogoCtrl.editarProducto);
router.delete('/productos/:id', catalogoCtrl.eliminarProducto);

// EQUIPOS
router.get('/equipos', catalogoCtrl.obtenerEquipos);
router.post('/equipos', catalogoCtrl.crearEquipo);

// MARCAS
router.get('/marcas', catalogoCtrl.obtenerMarcas);
router.post('/marcas', catalogoCtrl.crearMarca);

// TEMPORADAS
router.get('/temporadas', catalogoCtrl.obtenerTemporadas);
router.post('/temporadas', catalogoCtrl.crearTemporada);

// PAISES
router.get('/paises', catalogoCtrl.obtenerPaises);

// REGIONES
router.get('/regiones', catalogoCtrl.obtenerRegiones);

// TIPO_CLUB
router.get('/tipo-club', catalogoCtrl.obtenerTipoClubes);

// EQUIPO_REGION
router.post('/equipo-region', catalogoCtrl.crearEquipoRegion);

export default router;
