// backend/controladores/metricasControlador.js
import { PRODUCTO, CAMISETA, ORDEN, DETALLE_ORDEN, USUARIO } from '../models/index.js';

export async function kpis(req, res) {
  try {
    const totalProductos = await PRODUCTO.count();
    const totalCamisetas = await CAMISETA.count();
    const totalOrdenes = await ORDEN.count();
    const totalUsuarios = await USUARIO.count();

    res.json({
      totalProductos,
      totalCamisetas,
      totalOrdenes,
      totalUsuarios
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
