import { USUARIO } from '../models/index.js';

export async function crearUsuario(req, res) {
  try {
    const { nombre, apellido, correo, password } = req.body;
    const usuarioExistente = await USUARIO.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    const hashedPassword = password; // O usa bcrypt.hash(password, 10);
    const nuevoUsuario = await USUARIO.create({
      nombre,
      apellido,
      correo,
      password: hashedPassword,
      id_rol: 2 // usuario regular
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
}

export async function loginUsuario(req, res) {
  try {
    const { correo, password } = req.body;
    const usuario = await USUARIO.findOne({ where: { correo } });
    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({ id: usuario.id_usuario, rol: usuario.id_rol === 1 ? 'admin' : 'usuario', nombre: usuario.nombre, correo: usuario.correo });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
}
