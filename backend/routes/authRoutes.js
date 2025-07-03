import express from "express";
import { Usuario } from "../models/Usuario.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  const usuario = await Usuario.findOne({ where: { correo } });
  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }
  res.json({
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol
  });
});

export default router;

