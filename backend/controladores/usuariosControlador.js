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

export const actualizarUsuario = async (req, res) => {
  try {
    await USUARIO.update(req.body, {
      where: { id_usuario: req.params.id }
    });
    res.json({ mensaje: 'Datos actualizados correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar datos' });
  }
};

export const cambiarPassword = async (req, res) => {
  const { nuevaPassword } = req.body;
  try {
    await USUARIO.update(
      { password: nuevaPassword },
      { where: { id_usuario: req.params.id } }
    );
    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
