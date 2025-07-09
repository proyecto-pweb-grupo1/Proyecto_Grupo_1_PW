// backend/controladores/equiposControlador.js
import { EQUIPO, PAIS, TIPO_CLUB, REGION } from '../models/index.js';

// GET /api/equipos
export async function listarEquipos(req, res) {
  try {
    const equipos = await EQUIPO.findAll({
      include: [PAIS, TIPO_CLUB, REGION],
      order: [['id_equipo', 'ASC']]
    });
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /api/equipos/:id
export async function obtenerEquipo(req, res) {
  try {
    const equipo = await EQUIPO.findByPk(req.params.id, { include: [PAIS, TIPO_CLUB, REGION] });
    if (!equipo) return res.status(404).json({ error: "No existe el equipo" });
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/equipos
export async function crearEquipo(req, res) {
  try {
    const equipo = await EQUIPO.create(req.body);
    res.status(201).json(equipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// PUT /api/equipos/:id
export async function actualizarEquipo(req, res) {
  try {
    const equipo = await EQUIPO.findByPk(req.params.id);
    if (!equipo) return res.status(404).json({ error: "No existe el equipo" });
    await equipo.update(req.body);
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /api/equipos/:id
export async function eliminarEquipo(req, res) {
  try {
    const equipo = await EQUIPO.findByPk(req.params.id);
    if (!equipo) return res.status(404).json({ error: "No existe el equipo" });
    await equipo.destroy();
    res.json({ mensaje: "Equipo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
