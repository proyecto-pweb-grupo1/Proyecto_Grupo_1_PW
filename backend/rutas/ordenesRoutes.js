// backend/rutas/ordenesRoutes.js
import { Router } from 'express';
import * as ctrl from '../controladores/ordenesControlador.js';

const router = Router();

router.get('/', ctrl.listarOrdenes);
router.get('/:id', ctrl.obtenerOrden);
router.post('/', ctrl.crearOrden);
router.put('/:id', ctrl.actualizarOrden);
router.delete('/:id', ctrl.eliminarOrden);

export default router;
