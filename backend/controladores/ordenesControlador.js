// backend/controladores/ordenesControlador.js
import { ORDEN, DETALLE_ORDEN, USUARIO, DIRECCION, METODO_PAGO, METODO_ENVIO, ESTADO_ORDEN, PRODUCTO } from '../models/index.js';

// GET /api/ordenes
export async function listarOrdenes(req, res) {
  try {
    const ordenes = await ORDEN.findAll({
      include: [USUARIO, DIRECCION, METODO_PAGO, METODO_ENVIO, ESTADO_ORDEN, {
        model: DETALLE_ORDEN,
        include: [PRODUCTO]
      }],
      order: [['fecha', 'DESC']]
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /api/ordenes/:id
export async function obtenerOrden(req, res) {
  try {
    const orden = await ORDEN.findByPk(req.params.id, {
      include: [USUARIO, DIRECCION, METODO_PAGO, METODO_ENVIO, ESTADO_ORDEN, {
        model: DETALLE_ORDEN,
        include: [PRODUCTO]
      }]
    });
    if (!orden) return res.status(404).json({ error: "No existe la orden" });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/ordenes
export async function crearOrden(req, res) {
  try {
    const { id_usuario, id_direccion, id_metodo_pago, id_metodo_envio, id_estado_orden, total, detalles } = req.body;
    const orden = await ORDEN.create({ id_usuario, id_direccion, id_metodo_pago, id_metodo_envio, id_estado_orden, total });

    for (const det of detalles) {
      await DETALLE_ORDEN.create({
        id_orden: orden.id_orden,
        id_producto: det.id_producto,
        cantidad: det.cantidad,
        precio_unitario: det.precio_unitario,
        subtotal: det.subtotal
      });
    }
    res.status(201).json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// PUT /api/ordenes/:id
export async function actualizarOrden(req, res) {
  try {
    const orden = await ORDEN.findByPk(req.params.id);
    if (!orden) return res.status(404).json({ error: "No existe la orden" });
    await orden.update(req.body);
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /api/ordenes/:id
export async function eliminarOrden(req, res) {
  try {
    const orden = await ORDEN.findByPk(req.params.id);
    if (!orden) return res.status(404).json({ error: "No existe la orden" });
    await DETALLE_ORDEN.destroy({ where: { id_orden: orden.id_orden } });
    await orden.destroy();
    res.json({ mensaje: "Orden eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
