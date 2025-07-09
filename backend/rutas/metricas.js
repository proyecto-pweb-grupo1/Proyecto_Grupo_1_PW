// backend/rutas/metricas.js
import { Router } from 'express';
import * as ctrl from '../controladores/metricasControlador.js';

const router = Router();

router.get('/kpis', ctrl.kpis);

export default router;
