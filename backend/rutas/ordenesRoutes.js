import express from 'express';
import { ORDEN, DETALLE_ORDEN, PRODUCTO } from '../models/index.js';

const router = express.Router();

// GET /api/ordenes/:id – Ver detalle de orden
router.get('/:id', async (req, res) => {
  const idOrden = req.params.id;

  try {
    const orden = await ORDEN.findByPk(idOrden, {
      include: {
        model: DETALLE_ORDEN,
        include: [PRODUCTO]
      }
    });

    if (!orden) return res.status(404).json({ mensaje: 'Orden no encontrada' });

    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalle de orden' });
  }
});

// DELETE /api/ordenes/:id – Cancelar orden (opcional si aún no enviada)
router.delete('/:id', async (req, res) => {
  try {
    const orden = await ORDEN.findByPk(req.params.id);
    if (!orden) return res.status(404).json({ mensaje: 'Orden no existe' });

    await orden.destroy();
    res.json({ mensaje: 'Orden cancelada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar la orden' });
  }
});

export default router;
