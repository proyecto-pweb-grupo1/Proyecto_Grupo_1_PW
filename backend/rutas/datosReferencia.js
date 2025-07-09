// backend/rutas/datosReferencia.js
import { Router } from 'express';
import * as ctrl from '../controladores/datosReferenciaControlador.js';

const router = Router();

router.get('/paises', ctrl.listarPaises);
router.get('/regiones', ctrl.listarRegiones);
router.get('/tipos_club', ctrl.listarTipoClubs);
router.get('/generos', ctrl.listarGeneros);
router.get('/tallas', ctrl.listarTallas);
router.get('/tipos_camiseta', ctrl.listarTiposCamiseta);
router.get('/marcas', ctrl.listarMarcas);
router.get('/temporadas', ctrl.listarTemporadas);
router.get('/categorias', ctrl.listarCategorias);

export default router;
