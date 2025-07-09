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

// Ruta optimizada para frontend: /api/productos/dto
router.get('/dto', async (req, res) => {
  try {
    const productos = await PRODUCTO.findAll({
      where: { activo: true },
      include: [
        {
          model: CAMISETA,
          include: [EQUIPO, MARCA, CATEGORIA, TIPO_CAMISETA]
        },
        { model: TALLA },
        { model: GENERO }
      ]
    });

    const productosSimplificados = productos.map(p => ({
      id: p.id_producto,
      nombre: p.camiseta?.descripcion_camiseta || 'Sin nombre',
      precio: parseFloat(p.precio),
      imagen: p.camiseta?.imagen_url || '/img/default.png',
      stock: p.stock,
      sku: p.sku,
      genero: p.genero?.descripcion_genero || '',
      talla: p.talla?.descripcion_talla || '',
      categoria: p.camiseta?.categoria?.nombre_categoria || '',
      equipo: p.camiseta?.equipo?.nombre_equipo || '',
      marca: p.camiseta?.marca?.nombre_marca || '',
      tipo: p.camiseta?.tipo_camiseta?.descripcion_tipo || ''
    }));

    res.json(productosSimplificados);
  } catch (error) {
    console.error('Error al generar DTO de productos:', error);
    res.status(500).json({ error: 'Error al generar vista simplificada de productos' });
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

// En routes/productos.js
router.get('/', async (req, res) => {
  try {
    const { nombre } = req.query;
    const where = nombre
      ? {
          '$CAMISETA.descripcion_camiseta$': { [Op.iLike]: `%${nombre}%` },
        }
      : {};

    const productos = await PRODUCTO.findAll({
      include: [
        {
          model: CAMISETA,
          as: 'CAMISETA',
          include: [MARCA, EQUIPO, TIPO_CAMISETA, CATEGORIA, TEMPORADA],
        },
        TALLA,
        GENERO
      ],
      where,
    });

    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener todos los productos con TODAS las relaciones profundas
router.get('/detallado', async (req, res) => {
  try {
    const productos = await PRODUCTO.findAll({
      include: [
        {
          model: CAMISETA,
          include: [
            {
              model: EQUIPO,
              include: [
                { model: PAIS },
                { model: TIPO_CLUB },
                { 
                  model: REGION, 
                  through: { attributes: [] } // para que traiga regions relacionadas al equipo
                }
              ]
            },
            { model: TEMPORADA },
            { model: CATEGORIA },
            { model: MARCA },
            { model: TIPO_CAMISETA }
          ]
        },
        { model: TALLA },
        { model: GENERO },
        // Si tienes SERIES relacionadas al PRODUCTO, puedes traerlas así:
        {
          model: SERIE,
          through: { attributes: [] } // para traer las series del producto
        }
      ]
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos detallados' });
  }
});



export default router;
