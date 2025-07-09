// backend/rutas/equipos.js
import { Router } from 'express';
import * as ctrl from '../controladores/equiposControlador.js';

const router = Router();

router.get('/', ctrl.listarEquipos);
router.get('/:id', ctrl.obtenerEquipo);
router.post('/', ctrl.crearEquipo);
router.put('/:id', ctrl.actualizarEquipo);
router.delete('/:id', ctrl.eliminarEquipo);

export default router;
