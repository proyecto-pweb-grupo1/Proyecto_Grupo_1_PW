import express from 'express';
import { PRODUCTO, CAMISETA, MARCA, CATEGORIA, TALLA, GENERO, TIPO_CAMISETA, EQUIPO } from '../models/index.js';

const router = express.Router();

// Obtener todos los productos con relaciones necesarias
router.get('/', async (req, res) => {
  try {
    const productos = await PRODUCTO.findAll({
      include: [
        {
          model: CAMISETA,
          include: [
            { model: CATEGORIA },
            { model: MARCA },
            { model: EQUIPO },
            { model: TIPO_CAMISETA }
          ]
        },
        { model: TALLA },
        { model: GENERO }
      ]
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await PRODUCTO.findByPk(id, {
      include: [
        {
          model: CAMISETA,
          include: [
            { model: CATEGORIA },
            { model: MARCA },
            { model: EQUIPO },
            { model: TIPO_CAMISETA }
          ]
        },
        { model: TALLA },
        { model: GENERO }
      ]
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevo = await PRODUCTO.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await PRODUCTO.update(req.body, { where: { id_producto: id } });
    res.json({ message: 'Producto actualizado', actualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await PRODUCTO.destroy({ where: { id_producto: id } });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;
