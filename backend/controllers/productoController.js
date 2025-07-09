import { sequelize } from "../config/database.js";
import { PRODUCTO, CAMISETA, GENERO, TALLA, CATEGORIA, MARCA, TIPO_CAMISETA, EQUIPO, TEMPORADA, SERIE } from "../models/index.js";
import { ValidationError, UniqueConstraintError } from "sequelize";

export async function listarProductos(req, res) {
  const { nombre, serie, marca, categoria, activo } = req.query;

  const filtros = {};
  if (activo !== undefined) {
    filtros.activo = activo === 'true';
  }

  const productos = await PRODUCTO.findAll({
    where: filtros,
    include: [
      {
        model: CAMISETA,
        include: [CATEGORIA, MARCA, TIPO_CAMISETA, EQUIPO, TEMPORADA]
      },
      GENERO,
      TALLA,
      {
        model: SERIE,
        through: { attributes: [] }
      }
    ]
  });

  const filtrado = productos.filter((p) => {
    const camiseta = p.CAMISETum;
    const nombreOk = !nombre || camiseta?.descripcion_camiseta?.toLowerCase().includes(nombre.toLowerCase());
    const serieOk = !serie || p.SERIEs?.some(s => s.nombre_serie?.toLowerCase().includes(serie.toLowerCase()));
    const marcaOk = !marca || camiseta?.MARCA?.nombre_marca?.toLowerCase().includes(marca.toLowerCase());
    const catOk = !categoria || camiseta?.CATEGORIum?.nombre_categoria?.toLowerCase().includes(categoria.toLowerCase());
    return nombreOk && serieOk && marcaOk && catOk;
  });

  res.json(filtrado);
}

export async function getProductosActivos(req, res) {
  const productos = await PRODUCTO.findAll({
    where: { activo: true },
    include: [
      {
        model: CAMISETA,
        include: [CATEGORIA, MARCA, TIPO_CAMISETA, EQUIPO, TEMPORADA]
      },
      GENERO,
      TALLA
    ]
  });
  res.json(productos);
}

export async function detalleProducto(req, res) {
  const { id } = req.params;
  const producto = await PRODUCTO.findByPk(id, {
    include: [
      {
        model: CAMISETA,
        include: [CATEGORIA, MARCA, TIPO_CAMISETA, EQUIPO, TEMPORADA]
      },
      GENERO,
      TALLA,
      {
        model: SERIE,
        through: { attributes: [] }
      }
    ]
  });
  res.json(producto);
}

export async function agregarProducto(req, res) {
  try {
    const {
      sku,
      descripcion_camiseta,
      precio,
      stock,
      imagen_url,
      id_equipo,
      id_temporada,
      id_categoria,
      id_marca,
      id_tipo_camiseta,
      id_genero,
      id_talla
    } = req.body;

    if (!descripcion_camiseta || !sku || !precio || !stock || !imagen_url ||
        !id_equipo || !id_temporada || !id_categoria || !id_marca || !id_tipo_camiseta ||
        !id_genero || !id_talla) {
      return res.status(400).json({ mensaje: "Faltan campos requeridos" });
    }

    const duplicado = await PRODUCTO.findOne({ where: { sku } });
    if (duplicado) {
      return res.status(409).json({ mensaje: `El SKU "${sku}" ya está registrado.` });
    }

    let camisetaExistente = await CAMISETA.findOne({
      where: {
        descripcion_camiseta,
        imagen_url,
        id_equipo,
        id_temporada,
        id_categoria,
        id_marca,
        id_tipo_camiseta
      }
    });

    if (!camisetaExistente) {
      camisetaExistente = await CAMISETA.create({
        descripcion_camiseta,
        imagen_url,
        id_equipo,
        id_temporada,
        id_categoria,
        id_marca,
        id_tipo_camiseta
      });
    }

    const nuevoProducto = await PRODUCTO.create({
      sku,
      precio,
      stock,
      id_genero,
      id_talla,
      id_camiseta: camisetaExistente.id_camiseta
    });

    res.status(201).json(nuevoProducto);

  } catch (error) {
    console.error("Error al agregar producto:", error);

    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ mensaje: "Violación de restricción única (SKU duplicado)" });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({ mensaje: "Error de validación", detalles: error.errors });
    }

    res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
  }
}

export async function actualizarProducto(req, res) {
  const { id } = req.params;
  await PRODUCTO.update(req.body, { where: { id_producto: id } });
  const actualizado = await PRODUCTO.findByPk(id);
  res.json(actualizado);
}

export async function cambiarEstadoProducto(req, res) {
  const { id } = req.params;
  const producto = await PRODUCTO.findByPk(id);
  await producto.update({ activo: !producto.activo });
  res.json({ mensaje: `Producto ${producto.activo ? 'activado' : 'desactivado'}` });
}

export async function listarProductosDestacados(req, res) {
  try {
    const productos = await PRODUCTO.findAll({
      where: { activo: true },
      include: [
        {
          model: CAMISETA,
          include: [CATEGORIA, MARCA, TIPO_CAMISETA, EQUIPO, TEMPORADA]
        },
        GENERO,
        TALLA
      ],
      limit: 15
    });

    res.json(productos);
  } catch (error) {
    console.error("Error en listarProductosDestacados:", error.message);
    res.status(500).json({ mensaje: "Error al obtener productos destacados" });
  }
}

export async function listarProductosRecientes(req, res) {
  try {
    const productos = await PRODUCTO.findAll({
      where: { activo: true },
      include: [
        {
          model: CAMISETA,
          include: [CATEGORIA, MARCA, TIPO_CAMISETA, EQUIPO, TEMPORADA]
        },
        GENERO,
        TALLA
      ],
      order: [["id_producto", "DESC"]],
      limit: 10
    });

    res.json(productos);
  } catch (error) {
    console.error("Error en listarProductosRecientes:", error.message);
    res.status(500).json({ mensaje: "Error al obtener productos recientes" });
  }
}
