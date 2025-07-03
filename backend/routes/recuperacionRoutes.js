import express from "express";
import { Usuario } from "../models/Usuario.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { correo } = req.body;
  const usuario = await Usuario.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(404).json({ error: "Correo no registrado" });
  }

  res.json({ mensaje: "Se ha enviado un enlace de recuperación a su correo (simulado)." });
});

export default router;