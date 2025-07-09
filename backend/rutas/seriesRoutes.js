import express from "express";
import { SERIE, PRODUCTO, SERIE_PRODUCTO } from "../models/index.js";

const router = express.Router();

// Todas las series
router.get("/", async (req, res) => {
  const series = await SERIE.findAll();
  res.json(series);
});

// Series con productos
router.get("/:id/relacion", async (req, res) => {
  const serie = await SERIE.findByPk(req.params.id, {
    include: [PRODUCTO]
  });
  if (!serie) return res.status(404).json({ error: "Serie no encontrada" });
  res.json(serie);
});

// Crear serie
router.post("/", async (req, res) => {
  const serie = await SERIE.create(req.body);
  res.json(serie);
});

// Relacionar producto a serie
router.post("/:id/relacion", async (req, res) => {
  // req.body.id_producto
  await SERIE_PRODUCTO.create({ id_serie: req.params.id, id_producto: req.body.id_producto });
  res.json({ ok: true });
});

// Eliminar relación producto-serie
router.delete("/:id/relacion/:id_producto", async (req, res) => {
  await SERIE_PRODUCTO.destroy({ where: { id_serie: req.params.id, id_producto: req.params.id_producto } });
  res.json({ ok: true });
});

export default router;
