// backend/controladores/carritoControlador.js
import { CARRITO, CARRITO_ITEM, PRODUCTO } from '../models/index.js';

// GET /api/carrito/:id_usuario
export async function obtenerCarrito(req, res) {
  try {
    const { id_usuario } = req.params;
    let carrito = await CARRITO.findOne({
      where: { id_usuario },
      include: {
        model: CARRITO_ITEM,
        include: PRODUCTO
      }
    });
    if (!carrito) {
      carrito = await CARRITO.create({ id_usuario });
    }
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/carrito/:id_usuario/agregar
export async function agregarAlCarrito(req, res) {
  try {
    const { id_usuario } = req.params;
    const { id_producto, cantidad } = req.body;
    let carrito = await CARRITO.findOne({ where: { id_usuario } });
    if (!carrito) carrito = await CARRITO.create({ id_usuario });

    let item = await CARRITO_ITEM.findOne({ where: { id_carrito: carrito.id_carrito, id_producto } });
    if (item) {
      await item.update({ cantidad: item.cantidad + cantidad });
    } else {
      item = await CARRITO_ITEM.create({ id_carrito: carrito.id_carrito, id_producto, cantidad });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/carrito/:id_usuario/quitar
export async function quitarDelCarrito(req, res) {
  try {
    const { id_usuario } = req.params;
    const { id_producto } = req.body;
    const carrito = await CARRITO.findOne({ where: { id_usuario } });
    if (!carrito) return res.status(404).json({ error: "No existe el carrito" });
    await CARRITO_ITEM.destroy({ where: { id_carrito: carrito.id_carrito, id_producto } });
    res.json({ mensaje: "Producto quitado del carrito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
