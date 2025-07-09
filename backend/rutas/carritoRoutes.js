import express from 'express';
import { CARRITO, CARRITO_ITEM, PRODUCTO } from '../models/index.js';

const router = express.Router();

// Obtener el carrito de un usuario por su ID
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const carrito = await CARRITO.findOne({
      where: { id_usuario }
    });

    if (!carrito) {
      return res.status(404).json({ error: 'No se encontró el carrito del usuario' });
    }

    const items = await CARRITO_ITEM.findAll({
      where: { id_carrito: carrito.id_carrito, guardado: false },
      include: PRODUCTO
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar producto al carrito
router.post('/agregar', async (req, res) => {
  const { id_usuario, id_producto, cantidad } = req.body;
  try {
    let carrito = await CARRITO.findOne({ where: { id_usuario } });

    // Si el usuario no tiene carrito aún, lo creamos
    if (!carrito) {
      carrito = await CARRITO.create({ id_usuario });
    }

    const [item, creado] = await CARRITO_ITEM.findOrCreate({
      where: { id_carrito: carrito.id_carrito, id_producto, guardado: false },
      defaults: { cantidad }
    });

    if (!creado) {
      item.cantidad += cantidad;
      await item.save();
    }

    res.status(200).json({ message: 'Producto agregado al carrito', item });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
});

// Eliminar un producto del carrito
router.delete('/eliminar', async (req, res) => {
  const { id_usuario, id_producto } = req.body;
  try {
    const carrito = await CARRITO.findOne({ where: { id_usuario } });
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

    const eliminado = await CARRITO_ITEM.destroy({
      where: { id_carrito: carrito.id_carrito, id_producto, guardado: false }
    });

    res.json({ message: 'Producto eliminado del carrito', eliminado });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar del carrito' });
  }
});

// Guardar producto para después (no se elimina, solo se marca como guardado)
router.put('/guardar', async (req, res) => {
  const { id_usuario, id_producto } = req.body;
  try {
    const carrito = await CARRITO.findOne({ where: { id_usuario } });
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

    const actualizado = await CARRITO_ITEM.update(
      { guardado: true },
      { where: { id_carrito: carrito.id_carrito, id_producto } }
    );

    res.json({ message: 'Producto guardado para después', actualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar producto' });
  }
});

export default router;
