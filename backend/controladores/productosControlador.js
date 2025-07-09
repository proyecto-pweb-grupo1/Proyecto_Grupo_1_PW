// Adaptado al uso de Sequelize y tu estructura de carpetas: backend/models, backend/controladores
import {
  PRODUCTO,
  CAMISETA,
  TALLA,
  GENERO,
  EQUIPO,
  TEMPORADA,
  MARCA,
  PAIS,
  REGION,
  TIPO_CLUB,
  EQUIPO_REGION
} from '../models/index.js';

export async function obtenerProductos(req, res) {
  try {
    const productos = await PRODUCTO.findAll({
      include: [
        { model: CAMISETA, include: [EQUIPO, TEMPORADA, MARCA] },
        TALLA,
        GENERO
      ]
    });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function obtenerProductoPorId(req, res) {
  try {
    const { id } = req.params;
    const producto = await PRODUCTO.findByPk(id, {
      include: [
        { model: CAMISETA, include: [EQUIPO, TEMPORADA, MARCA] },
        TALLA,
        GENERO
      ]
    });
    if (!producto) return res.status(404).json({ error: 'No encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function crearProducto(req, res) {
  try {
    const nuevoProducto = await PRODUCTO.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function editarProducto(req, res) {
  try {
    const { id } = req.params;
    const [actualizados] = await PRODUCTO.update(req.body, {
      where: { id_producto: id },
      returning: true
    });
    if (!actualizados) return res.status(404).json({ error: 'No encontrado' });
    const producto = await PRODUCTO.findByPk(id);
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function eliminarProducto(req, res) {
  try {
    const { id } = req.params;
    const producto = await PRODUCTO.findByPk(id);
    if (!producto) return res.status(404).json({ error: 'No encontrado' });
    await producto.destroy();
    res.json({ msg: 'Eliminado', producto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function obtenerEquipos(req, res) {
  try {
    const equipos = await EQUIPO.findAll({ include: [PAIS, TIPO_CLUB] });
    res.json(equipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function crearEquipo(req, res) {
  try {
    const existe = await EQUIPO.findOne({ where: { nombre_equipo: req.body.nombre_equipo } });
    if (existe) return res.status(400).json({ error: 'El equipo ya existe' });
    const nuevo = await EQUIPO.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function obtenerMarcas(req, res) {
  try {
    const marcas = await MARCA.findAll();
    res.json(marcas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function crearMarca(req, res) {
  try {
    const existe = await MARCA.findOne({ where: { nombre_marca: req.body.nombre_marca } });
    if (existe) return res.status(400).json({ error: 'La marca ya existe' });
    const nueva = await MARCA.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function obtenerTemporadas(req, res) {
  try {
    const temporadas = await TEMPORADA.findAll();
    res.json(temporadas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function crearTemporada(req, res) {
  try {
    const existe = await TEMPORADA.findOne({ where: { descripcion_temporada: req.body.descripcion_temporada } });
    if (existe) return res.status(400).json({ error: 'Ya existe esa temporada' });
    const nueva = await TEMPORADA.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function obtenerPaises(req, res) {
  try {
    const paises = await PAIS.findAll();
    res.json(paises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function obtenerRegiones(req, res) {
  try {
    const regiones = await REGION.findAll();
    res.json(regiones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function obtenerTipoClubes(req, res) {
  try {
    const tipos = await TIPO_CLUB.findAll();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function crearEquipoRegion(req, res) {
  try {
    const { id_equipo, id_region } = req.body;
    const existe = await EQUIPO_REGION.findOne({ where: { id_equipo, id_region } });
    if (existe) return res.status(400).json({ error: 'Ya existe esa relación' });
    const nueva = await EQUIPO_REGION.create({ id_equipo, id_region });
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
