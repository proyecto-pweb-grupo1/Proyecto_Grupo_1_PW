// backend/controladores/productosControlador.js
import {
  PRODUCTO, CAMISETA, GENERO, TALLA, 
  EQUIPO, TEMPORADA, TIPO_CAMISETA, MARCA, CATEGORIA
} from '../models/index.js';
import { Op } from 'sequelize';

// Genera el SKU según la lógica acordada
async function generarSKU({ id_camiseta, id_genero, id_talla }) {
  const camiseta = await CAMISETA.findByPk(id_camiseta, {
    include: [
      { model: EQUIPO },
      { model: TEMPORADA },
      { model: TIPO_CAMISETA }
    ]
  });
  const genero = await GENERO.findByPk(id_genero);
  const talla = await TALLA.findByPk(id_talla);

  if (!camiseta || !camiseta.EQUIPO || !camiseta.TEMPORADA || !camiseta.TIPO_CAMISETA || !genero || !talla)
    throw new Error('No se puede construir SKU, datos faltantes.');

  // SKU: nombre_equipo_añoFin_tipoCamiseta_genero_talla (con guiones)
  const nombreEquipo = camiseta.EQUIPO.nombre_equipo.replace(/\s+/g, '-').toUpperCase();
  const anioFin = camiseta.TEMPORADA.año_fin;
  const tipoCamiseta = camiseta.TIPO_CAMISETA.descripcion_tipo.toUpperCase();
  const generoTxt = genero.descripcion_genero.toUpperCase();
  const tallaTxt = talla.descripcion_talla.toUpperCase();

  return `${nombreEquipo}_${anioFin}_${tipoCamiseta}_${generoTxt}_${tallaTxt}`;
}

// GET /api/productos
export async function listarProductos(req, res) {
  try {
    const productos = await PRODUCTO.findAll({
      include: [
        {
          model: CAMISETA,
          include: [
            { model: EQUIPO },
            { model: TEMPORADA },
            { model: MARCA },
            { model: TIPO_CAMISETA },
            { model: CATEGORIA }
          ]
        },
        GENERO, TALLA
      ],
      order: [['id_producto', 'ASC']]
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /api/productos/:id
export async function obtenerProducto(req, res) {
  try {
    const producto = await PRODUCTO.findByPk(req.params.id, {
      include: [
        {
          model: CAMISETA,
          include: [
            { model: EQUIPO },
            { model: TEMPORADA },
            { model: MARCA },
            { model: TIPO_CAMISETA },
            { model: CATEGORIA }
          ]
        },
        GENERO, TALLA
      ]
    });
    if (!producto) return res.status(404).json({ error: "No existe el producto" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/productos
export async function crearProducto(req, res) {
  try {
    const { id_camiseta, id_genero, id_talla, precio, stock, activo } = req.body;
    // SKU único
    const sku = await generarSKU({ id_camiseta, id_genero, id_talla });

    // Verifica que no exista ese SKU
    const existe = await PRODUCTO.findOne({ where: { sku } });
    if (existe) return res.status(400).json({ error: "Ya existe un producto con ese SKU." });

    const producto = await PRODUCTO.create({ id_camiseta, id_genero, id_talla, precio, stock, sku, activo });
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// PUT /api/productos/:id
export async function actualizarProducto(req, res) {
  try {
    const producto = await PRODUCTO.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: "No existe el producto" });

    const { id_camiseta, id_genero, id_talla, precio, stock, activo } = req.body;
    // Si cambiaron los datos de SKU, se recalcula
    let sku = producto.sku;
    if (
      id_camiseta !== undefined || id_genero !== undefined || id_talla !== undefined
    ) {
      sku = await generarSKU({
        id_camiseta: id_camiseta || producto.id_camiseta,
        id_genero: id_genero || producto.id_genero,
        id_talla: id_talla || producto.id_talla,
      });
      // Verifica duplicados
      const otro = await PRODUCTO.findOne({ where: { sku, id_producto: { [Op.ne]: producto.id_producto } } });
      if (otro) return res.status(400).json({ error: "SKU duplicado" });
    }

    await producto.update({ id_camiseta, id_genero, id_talla, precio, stock, activo, sku });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /api/productos/:id
export async function eliminarProducto(req, res) {
  try {
    const producto = await PRODUCTO.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: "No existe el producto" });
    await producto.destroy();
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
