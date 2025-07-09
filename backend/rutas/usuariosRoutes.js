// backend/rutas/usuariosRoutes.js
import { Router } from 'express';
import * as ctrl from '../controladores/usuariosControlador.js';

const router = Router();

router.post('/', usuarioCtrl.crearUsuario);
router.post('/login', usuarioCtrl.loginUsuario);

router.get('/:id', usuarioCtrl.obtenerUsuario);
router.put('/:id', usuarioCtrl.actualizarUsuario);
router.put('/:id/password', usuarioCtrl.cambiarPassword);

export default router;
