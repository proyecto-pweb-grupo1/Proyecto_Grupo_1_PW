import { USUARIO, ROL } from "../models/index.js";

export const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await USUARIO.findOne({
      where: { correo },
      include: ROL
    });

    if (!usuario) return res.status(401).json({ mensaje: "Correo no registrado" });
    if (!usuario.activo) return res.status(403).json({ mensaje: "Usuario desactivado" });

    if (usuario.password !== password)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    return res.json({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      rol: usuario.ROL?.nombre_rol || "usuario"
    });

  } catch (error) {
    return res.status(500).json({ mensaje: "Error en login", error });
  }
};
