import express from 'express';
import * as usuarioCtrl from '../controladores/usuariosControlador.js';

const router = express.Router();

// POST /api/usuarios - Crear nuevo usuario (registro)
router.post('/', usuarioCtrl.crearUsuario);

// POST /api/usuarios/login - Login
router.post('/login', usuarioCtrl.loginUsuario);

export default router;
