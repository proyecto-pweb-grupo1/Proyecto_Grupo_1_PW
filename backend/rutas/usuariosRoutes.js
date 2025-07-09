// backend/rutas/usuariosRoutes.js
import { Router } from 'express';
import * as ctrl from '../controladores/usuariosControlador.js';

const router = Router();

router.get('/', ctrl.listarUsuarios);
router.get('/:id', ctrl.obtenerUsuario);
router.post('/', ctrl.crearUsuario);
router.put('/:id', ctrl.actualizarUsuario);
router.delete('/:id', ctrl.eliminarUsuario);

export default router;
