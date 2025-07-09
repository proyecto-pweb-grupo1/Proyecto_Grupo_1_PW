// backend/controladores/usuariosControlador.js
import { USUARIO, ROL, DIRECCION } from '../models/index.js';

// GET /api/usuarios
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await USUARIO.findAll({ include: [ROL], order: [['id_usuario', 'ASC']] });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /api/usuarios/:id
export async function obtenerUsuario(req, res) {
  try {
    const usuario = await USUARIO.findByPk(req.params.id, { include: [ROL, DIRECCION] });
    if (!usuario) return res.status(404).json({ error: "No existe el usuario" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/usuarios
export async function crearUsuario(req, res) {
  try {
    const usuario = await USUARIO.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// PUT /api/usuarios/:id
export async function actualizarUsuario(req, res) {
  try {
    const usuario = await USUARIO.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "No existe el usuario" });
    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /api/usuarios/:id
export async function eliminarUsuario(req, res) {
  try {
    const usuario = await USUARIO.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "No existe el usuario" });
    await usuario.destroy();
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
