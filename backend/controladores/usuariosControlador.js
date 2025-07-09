import { USUARIO } from '../models/index.js';

// POST /api/usuarios
export const crearUsuario = async (req, res) => {
  try {
    const usuario = await USUARIO.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// POST /api/usuarios/login
export const loginUsuario = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await USUARIO.findOne({ where: { correo } });

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Devuelve solo los datos necesarios para frontend
    res.json({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      id_rol: usuario.id_rol
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};


// GET /api/usuarios/:id
export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await USUARIO.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos del usuario' });
  }
};

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
    res.status(500).json({ error: 'Error al cambiar la contraseña' });
  }
};
