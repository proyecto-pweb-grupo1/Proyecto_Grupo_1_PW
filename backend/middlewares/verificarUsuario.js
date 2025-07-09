export const verificarUsuario = (req, res, next) => {
  const { rol } = req.body;
  if (rol !== "admin") return res.status(403).json({ mensaje: "Acceso denegado" });
  next();
};
