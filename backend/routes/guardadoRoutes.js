import express from "express";
import { ProductoGuardado } from "../models/ProductoGuardado.js";
import { Producto } from "../models/Producto.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const guardado = await ProductoGuardado.create(req.body);
  res.json(guardado);
});

router.get("/:usuarioId", async (req, res) => {
  const guardados = await ProductoGuardado.findAll({
    where: { usuarioId: req.params.usuarioId },
    include: Producto
  });
  res.json(guardados);
});

router.delete("/:id", async (req, res) => {
  await ProductoGuardado.destroy({ where: { id: req.params.id } });
  res.send("Guardado eliminado");
});

export default router;