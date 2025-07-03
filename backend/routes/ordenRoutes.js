import express from "express";
import { Orden } from "../models/Orden.js";
import { Usuario } from "../models/Usuario.js";
import { validarRolHeader } from "../middlewares/validarRolHeader.js";


const router = express.Router();

router.get("/", validarRolHeader("admin"), async (req, res) => {
  const ordenes = await Orden.findAll();
  res.json(ordenes);
});

router.get("/:usuarioId", async (req, res) => {
  const ordenes = await Orden.findAll({
    where: { usuarioId: req.params.usuarioId }
  });
  res.json(ordenes);
});

router.get("/detalle/:ordenId", async (req, res) => {
  const orden = await Orden.findByPk(req.params.ordenId, {
    include: [
      { model: DetalleOrden, include: [Producto] },
      { model: Usuario }
    ]
  });
  if (!orden) return res.status(404).json({ error: "Orden no encontrada" });
  res.json(orden);
});


router.post("/", async (req, res) => {
  const { usuarioId } = req.body;
  const usuario = await Usuario.findByPk(usuarioId);

  if (!usuario) {
    return res.status(400).json({ error: "El usuario no existe." });
  }

  const orden = await Orden.create(req.body);
  res.json(orden);
});

router.put("/cancelar/:id", async (req, res) => {
  const orden = await Orden.findByPk(req.params.id);
  if (!orden) return res.status(404).json({ error: "Orden no encontrada" });

  await Orden.update({ estado: "cancelada" }, { where: { id: req.params.id } });
  res.send("Orden cancelada");
});

router.get("/admin/filtro", validarRolHeader("admin"), async (req, res) => {
  const { id, nombre, correo } = req.query;
  const where = {};
  if (id) where.id = id;
  if (nombre || correo) {
    where["$Usuario.nombre$"] = nombre || undefined;
    where["$Usuario.correo$"] = correo || undefined;
  }

  const ordenes = await Orden.findAll({
    include: { model: Usuario },
    where
  });

  res.json(ordenes);
});

export default router;
