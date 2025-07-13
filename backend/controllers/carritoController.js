import { CARRITO, CARRITO_ITEM, PRODUCTO } from "../models/index.js";

export async function verCarrito(req, res) {
  const { id } = req.params;

  let carrito = await CARRITO.findOne({ where: { id_usuario: id } });
  if (!carrito) {
    carrito = await CARRITO.create({ id_usuario: id });
  }

  const carritoCompleto = await CARRITO.findOne({
    where: { id_usuario: id },
    include: {
      model: CARRITO_ITEM,
      where: { guardado: false },
      required: false,
      include: [PRODUCTO]
    }
  });

  res.json(carritoCompleto);
}

export async function agregarAlCarrito(req, res) {
  const { id } = req.params; 
  const { id_producto, cantidad } = req.body;

  if (!id_producto || !cantidad || cantidad < 1) {
    return res.status(400).json({ mensaje: "Datos inválidos" });
  }

  const [carrito] = await CARRITO.findOrCreate({ where: { id_usuario: id } });

  const itemGuardado = await CARRITO_ITEM.findOne({
    where: { id_carrito: carrito.id_carrito, id_producto, guardado: true }
  });

  if (itemGuardado) {
    const itemEnCarrito = await CARRITO_ITEM.findOne({
      where: { id_carrito: carrito.id_carrito, id_producto, guardado: false }
    });

    if (itemEnCarrito) {
      await itemEnCarrito.update({ cantidad: itemEnCarrito.cantidad + cantidad });
    } else {
      await CARRITO_ITEM.create({
        id_carrito: carrito.id_carrito,
        id_producto,
        cantidad,
        guardado: false
      });
    }

    await itemGuardado.destroy(); 
    return res.json({ mensaje: "Producto movido desde guardados al carrito" });
  }

  const existente = await CARRITO_ITEM.findOne({
    where: { id_carrito: carrito.id_carrito, id_producto, guardado: false }
  });

  if (existente) {
    await existente.update({
      cantidad: existente.cantidad + cantidad
    });
    return res.json({ mensaje: "Cantidad actualizada en el carrito" });
  }

  await CARRITO_ITEM.create({
    id_carrito: carrito.id_carrito,
    id_producto,
    cantidad,
    guardado: false
  });

  res.json({ mensaje: "Producto agregado al carrito" });
}

export async function actualizarCantidad(req, res) {
  const { id_carrito, id_producto } = req.params;
  const { cantidad } = req.body;

  if (!cantidad || cantidad < 1) {
    return res.status(400).json({ mensaje: "Cantidad inválida" });
  }

  const item = await CARRITO_ITEM.findOne({
    where: { id_carrito, id_producto, guardado: false }
  });

  if (!item) {
    return res.status(404).json({ mensaje: "Producto no está en el carrito" });
  }

  await item.update({ cantidad });
  res.json({ mensaje: "Cantidad actualizada" });
}

export async function eliminarDelCarrito(req, res) {
  const { id_carrito, id_producto } = req.params;

  const item = await CARRITO_ITEM.findOne({
    where: { id_carrito, id_producto, guardado: false }
  });

  if (!item) {
    return res.status(404).json({ mensaje: "Producto no encontrado en el carrito" });
  }

  await item.destroy();
  res.json({ mensaje: "Producto eliminado del carrito" });
}
