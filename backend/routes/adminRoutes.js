import express from "express";
import { Usuario } from "../models/Usuario.js";
import { Orden } from "../models/Orden.js";
import { Producto } from "../models/Producto.js";
import { validarRolHeader } from "../middlewares/validarRolHeader.js";

const router = express.Router();

router.get("/dashboard", validarRolHeader("admin"), async (req, res) => {
  const totalUsuarios = await Usuario.count();
  const totalOrdenes = await Orden.count();
  const totalProductos = await Producto.count();
  const totalVentas = await Orden.sum("total");

  res.json({
    totalUsuarios,
    totalOrdenes,
    totalProductos,
    totalVentas
  });
});

export default router;
