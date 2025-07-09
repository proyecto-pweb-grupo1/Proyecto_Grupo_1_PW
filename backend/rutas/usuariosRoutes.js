import express from 'express';
import * as usuarioCtrl from '../controladores/usuariosControlador.js';

const router = express.Router();

router.post('/', usuarioCtrl.crearUsuario);
router.post('/login', usuarioCtrl.loginUsuario);

// 🚨 NUEVAS RUTAS Alumno 4
router.get('/:id', usuarioCtrl.obtenerUsuario);
router.put('/:id', usuarioCtrl.actualizarUsuario);
router.put('/:id/password', usuarioCtrl.cambiarPassword);

export default router;
