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


router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ["id", "nombre"]
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error" });
  }
});


router.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: ["id", "nombre", "correo", "rol", "activo"]
    });

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error" });
  }
});

router.get("/usuarios/:id/ordenes", async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const ordenes = await Orden.findAll({
      where: { usuarioId },
      attributes: ["id", "fecha", "metodo_pago", "total"],
      order: [["fecha", "DESC"]]
    });

    res.json(ordenes);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

export default router;
