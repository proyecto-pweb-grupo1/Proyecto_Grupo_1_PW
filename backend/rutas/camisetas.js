// backend/rutas/camisetas.js
import { Router } from 'express';
import * as ctrl from '../controladores/camisetasControlador.js';

const router = Router();

router.get('/', ctrl.listarCamisetas);
router.get('/:id', ctrl.obtenerCamiseta);
router.post('/', ctrl.crearCamiseta);
router.put('/:id', ctrl.actualizarCamiseta);
router.delete('/:id', ctrl.eliminarCamiseta);

export default router;
