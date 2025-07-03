import express from "express";
import { Usuario } from "../models/Usuario.js";
import { validarRolHeader } from "../middlewares/validarRolHeader.js";
import { Orden } from "../models/Orden.js";


const router = express.Router();

router.get("/", validarRolHeader("admin"), async (req, res) => {
  const usuarios = await Usuario.findAll({ where: { activo: true } });
  res.json(usuarios);
});

router.get("/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(usuario);
});

router.get(":id/ordenes", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  const ordenes = await Orden.findAll({ where: { usuarioId: usuario.id } });
  res.json(ordenes);
});

router.put("/:id", async (req, res) => {
  const { nombre, correo } = req.body;
  await Usuario.update({ nombre, correo }, { where: { id: req.params.id } });
  res.send("Datos actualizados");
});

router.put("/cambiar-password/:id", async (req, res) => {
  const { passwordActual, nuevaPassword } = req.body;
  const usuario = await Usuario.findByPk(req.params.id);

  if (!usuario || usuario.password !== passwordActual) {
    return res.status(400).json({ error: "Contraseña actual incorrecta" });
  }

  usuario.password = nuevaPassword;
  await usuario.save();
  res.send("Contraseña actualizada");
});

router.put("/desactivar/:id", async (req, res) => {
  await Usuario.update({ activo: false }, { where: { id: req.params.id } });
  res.send("Usuario desactivado");
});

router.post("/", async (req, res) => {
  const usuario = await Usuario.create(req.body);
  res.json(usuario);
});

export default router;

