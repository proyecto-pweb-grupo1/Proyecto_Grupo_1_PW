// backend/controladores/datosReferenciaControlador.js
import {
  PAIS, REGION, TIPO_CLUB, GENERO, TALLA,
  TIPO_CAMISETA, MARCA, TEMPORADA, CATEGORIA
} from '../models/index.js';

export async function listarPaises(req, res) {
  try {
    const data = await PAIS.findAll({ order: [['nombre_pais', 'ASC']] });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listarRegiones(req, res) {
  try {
    const data = await REGION.findAll({ order: [['nombre_region', 'ASC']] });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listarTipoClubs(req, res) {
  try {
    const data = await TIPO_CLUB.findAll({ order: [['tipo_club', 'ASC']] });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listarGeneros(req, res) {
  try {
    const data = await GENERO.findAll({ order: [['descripcion_genero', 'ASC']] });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listarTallas(req, res) {
  try {
    const data = await TALLA.findAll({ order: [['descripcion_talla', 'ASC']] });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listarTiposCamiseta(req, res) {
  try {
    const data = await TIPO_CAMISETA.findAll({ order: [['descripcion_tipo', 'ASC']] });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listarMarcas(req, res) {
  try {
    const data = await MARCA.findAll({ order: [['nombre_marca', 'ASC']] });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listarTemporadas(req, res) {
  try {
    const data = await TEMPORADA.findAll({ order: [['año_fin', 'DESC']] });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listarCategorias(req, res) {
  try {
    const data = await CATEGORIA.findAll({ order: [['nombre_categoria', 'ASC']] });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}
