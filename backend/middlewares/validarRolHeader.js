export function validarRolHeader(rolRequerido) {
  return (req, res, next) => {
    const rol = req.headers["x-rol-usuario"];

    if (!rol || rol !== rolRequerido) {
      return res.status(403).json({ error: "Acceso denegado. Se requiere rol: " + rolRequerido });
    }

    next();
  };
}
