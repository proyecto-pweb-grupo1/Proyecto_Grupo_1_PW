// backend/rutas/carritoRoutes.js
import { Router } from 'express';
import * as ctrl from '../controladores/carritoControlador.js';

const router = Router();

router.get('/:id_usuario', ctrl.obtenerCarrito);
router.post('/:id_usuario/agregar', ctrl.agregarAlCarrito);
router.post('/:id_usuario/quitar', ctrl.quitarDelCarrito);

export default router;
