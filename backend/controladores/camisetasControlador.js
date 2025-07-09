// backend/controladores/camisetasControlador.js
import {
  CAMISETA, EQUIPO, TEMPORADA, MARCA, TIPO_CAMISETA, CATEGORIA
} from '../models/index.js';

// GET /api/camisetas
export async function listarCamisetas(req, res) {
  try {
    const camisetas = await CAMISETA.findAll({
      include: [
        EQUIPO, TEMPORADA, MARCA, TIPO_CAMISETA, CATEGORIA
      ],
      order: [['id_camiseta', 'ASC']]
    });
    res.json(camisetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /api/camisetas/:id
export async function obtenerCamiseta(req, res) {
  try {
    const camiseta = await CAMISETA.findByPk(req.params.id, {
      include: [EQUIPO, TEMPORADA, MARCA, TIPO_CAMISETA, CATEGORIA]
    });
    if (!camiseta) return res.status(404).json({ error: "No existe la camiseta" });
    res.json(camiseta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/camisetas
export async function crearCamiseta(req, res) {
  try {
    const camiseta = await CAMISETA.create(req.body);
    res.status(201).json(camiseta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// PUT /api/camisetas/:id
export async function actualizarCamiseta(req, res) {
  try {
    const camiseta = await CAMISETA.findByPk(req.params.id);
    if (!camiseta) return res.status(404).json({ error: "No existe la camiseta" });
    await camiseta.update(req.body);
    res.json(camiseta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /api/camisetas/:id
export async function eliminarCamiseta(req, res) {
  try {
    const camiseta = await CAMISETA.findByPk(req.params.id);
    if (!camiseta) return res.status(404).json({ error: "No existe la camiseta" });
    await camiseta.destroy();
    res.json({ mensaje: "Camiseta eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
