// backend/rutas/datosReferencia.js
import { Router } from 'express';
import * as ctrl from '../controladores/datosReferenciaControlador.js';

const router = Router();

router.get('/productos', catalogoCtrl.obtenerProductos);
router.get('/productos/:id', catalogoCtrl.obtenerProductoPorId);
router.post('/productos', catalogoCtrl.crearProducto);
router.put('/productos/:id', catalogoCtrl.editarProducto);
router.delete('/productos/:id', catalogoCtrl.eliminarProducto);

router.get('/equipos', catalogoCtrl.obtenerEquipos);
router.post('/equipos', catalogoCtrl.crearEquipo);

router.get('/marcas', catalogoCtrl.obtenerMarcas);
router.post('/marcas', catalogoCtrl.crearMarca);

router.get('/temporadas', catalogoCtrl.obtenerTemporadas);
router.post('/temporadas', catalogoCtrl.crearTemporada);

router.get('/paises', catalogoCtrl.obtenerPaises);

router.get('/regiones', catalogoCtrl.obtenerRegiones);

router.get('/tipo-club', catalogoCtrl.obtenerTipoClubes);

router.post('/equipo-region', catalogoCtrl.crearEquipoRegion);

export default router;
