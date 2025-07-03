import express from "express";
import { DetalleOrden } from "../models/DetalleOrden.js";
import { Orden } from "../models/Orden.js";
import { Producto } from "../models/Producto.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const detalles = await DetalleOrden.findAll();
  res.json(detalles);
});

router.post("/", async (req, res) => {
  const { ordenId, productoId } = req.body;

  const orden = await Orden.findByPk(ordenId);
  const producto = await Producto.findByPk(productoId);

  if (!orden || !producto) {
    return res.status(400).json({ error: "Orden o producto no existe." });
  }

  const detalle = await DetalleOrden.create(req.body);
  res.json(detalle);
});

export default router;
