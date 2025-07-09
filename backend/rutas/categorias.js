// backend/rutas/categorias.js
import { Router } from 'express';
import * as ctrl from '../controladores/categoriasControlador.js';

const router = Router();

router.get('/', ctrl.listarCategorias);
router.post('/', ctrl.crearCategoria);
router.put('/:id', ctrl.actualizarCategoria);
router.delete('/:id', ctrl.eliminarCategoria);

export default router;
