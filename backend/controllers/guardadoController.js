import { CARRITO_ITEM, PRODUCTO } from "../models/index.js";

export async function verGuardados(req, res) {
  const { id_carrito } = req.params;
  const guardados = await CARRITO_ITEM.findAll({
    where: { id_carrito, guardado: true },
    include: [PRODUCTO]
  });
  res.json(guardados);
}

export async function moverAGuardado(req, res) {
  const { id_carrito, id_producto } = req.params;

  const itemCarrito = await CARRITO_ITEM.findOne({
    where: { id_carrito, id_producto, guardado: false }
  });

  if (!itemCarrito) {
    return res.status(404).json({ mensaje: "Producto no está en el carrito" });
  }

  const itemGuardado = await CARRITO_ITEM.findOne({
    where: { id_carrito, id_producto, guardado: true }
  });

  if (itemGuardado) {
    await itemGuardado.update({ cantidad: itemGuardado.cantidad + itemCarrito.cantidad });
  } else {
    await CARRITO_ITEM.create({
      id_carrito,
      id_producto,
      cantidad: itemCarrito.cantidad,
      guardado: true
    });
  }

  await itemCarrito.destroy();
  res.json({ mensaje: "Producto movido a guardados" });
}

export async function moverAlCarrito(req, res) {
  const { id_carrito, id_producto } = req.params;

  const itemGuardado = await CARRITO_ITEM.findOne({
    where: { id_carrito, id_producto, guardado: true }
  });

  if (!itemGuardado) {
    return res.status(404).json({ mensaje: "Producto no está en guardados" });
  }

  const itemCarrito = await CARRITO_ITEM.findOne({
    where: { id_carrito, id_producto, guardado: false }
  });

  if (itemCarrito) {
    await itemCarrito.update({ cantidad: itemCarrito.cantidad + itemGuardado.cantidad });
  } else {
    await CARRITO_ITEM.create({
      id_carrito,
      id_producto,
      cantidad: itemGuardado.cantidad,
      guardado: false
    });
  }

  await itemGuardado.destroy();
  res.json({ mensaje: "Producto movido al carrito" });
}

export async function eliminarGuardado(req, res) {
  const { id_carrito, id_producto } = req.params;

  const item = await CARRITO_ITEM.findOne({
    where: { id_carrito, id_producto, guardado: true }
  });

  if (!item) {
    return res.status(404).json({ mensaje: "Producto no encontrado en guardados" });
  }

  await item.destroy();
  res.json({ mensaje: "Guardado eliminado" });
}
