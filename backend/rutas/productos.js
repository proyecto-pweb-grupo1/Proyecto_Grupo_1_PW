import express from 'express';
import { Op } from 'sequelize';
import {
  PRODUCTO, CAMISETA, MARCA, CATEGORIA,
  TALLA, GENERO, TIPO_CAMISETA, EQUIPO
} from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { nombre } = req.query;
    const where = nombre
      ? {
          '$CAMISETum.descripcion_camiseta$': { [Op.iLike]: `%${nombre}%` },
        }
      : {};

    const productos = await PRODUCTO.findAll({
      where,
      include: [
        {
          model: CAMISETA,
          include: [CATEGORIA, MARCA, EQUIPO, TIPO_CAMISETA]
        },
        TALLA,
        GENERO
      ]
    });

    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

router.get('/dto', async (req, res) => {
  try {
    const productos = await PRODUCTO.findAll({
      where: { activo: true },
      include: [
        {
          model: CAMISETA,
          include: [EQUIPO, MARCA, CATEGORIA, TIPO_CAMISETA]
        },
        TALLA,
        GENERO
      ]
    });

    const productosSimplificados = productos.map(p => ({
      id: p.id_producto,
      nombre: p.CAMISETum?.descripcion_camiseta || 'Sin nombre',
      precio: parseFloat(p.precio),
      imagen: p.CAMISETum?.imagen_url || '/img/default.png',
      stock: p.stock,
      sku: p.sku,
      genero: p.GENERO?.descripcion_genero || '',
      talla: p.TALLA?.descripcion_talla || '',
      categoria: p.CAMISETum?.CATEGORIUM?.nombre_categoria || '',
      equipo: p.CAMISETum?.EQUIPO?.nombre_equipo || '',
      marca: p.CAMISETum?.MARCA?.nombre_marca || '',
      tipo: p.CAMISETum?.TIPO_CAMISETum?.descripcion_tipo || ''
    }));

    res.json(productosSimplificados);
  } catch (error) {
    console.error('Error al generar DTO de productos:', error);
    res.status(500).json({ error: 'Error al generar vista simplificada de productos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const producto = await PRODUCTO.findByPk(req.params.id, {
      include: [
        {
          model: CAMISETA,
          include: [CATEGORIA, MARCA, EQUIPO, TIPO_CAMISETA]
        },
        TALLA,
        GENERO
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

router.post('/', async (req, res) => {
  try {
    const nuevo = await PRODUCTO.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizado = await PRODUCTO.update(req.body, {
      where: { id_producto: req.params.id }
    });
    res.json({ message: 'Producto actualizado', actualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await PRODUCTO.destroy({ where: { id_producto: req.params.id } });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;
