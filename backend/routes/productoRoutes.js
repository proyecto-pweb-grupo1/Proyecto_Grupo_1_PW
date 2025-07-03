import express from "express";
import { Producto } from "../models/Producto.js";
import { Categoria } from "../models/Categoria.js";
import { validarRolHeader } from "../middlewares/validarRolHeader.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/", async (req, res) => {
  const { nombre, categoriaId, orden } = req.query;

  const where = { activo: true };
  if (nombre) where.nombre = { [Op.iLike]: `%${nombre}%` };
  if (categoriaId) where.categoriaId = categoriaId;

  const productos = await Producto.findAll({
    where,
    include: Categoria,
    order: orden === "precio" ? [["precio", "ASC"]] : orden === "nombre" ? [["nombre", "ASC"]] : undefined
  });

  res.json(productos);
});

router.get("/:id", async (req, res) => {
  const producto = await Producto.findByPk(req.params.id, { include: Categoria });
  res.json(producto);
});

router.post("/", validarRolHeader("admin"), async (req, res) => {
  const { categoriaId } = req.body;
  const categoria = await Categoria.findByPk(categoriaId);
  if (!categoria) {
    return res.status(400).json({ error: "La categoría especificada no existe." });
  }
  const nuevo = await Producto.create(req.body);
  res.json(nuevo);
});

router.put("/:id", validarRolHeader("admin"), async (req, res) => {
  await Producto.update(req.body, { where: { id: req.params.id } });
  res.send("Producto actualizado");
});

router.put("/desactivar/:id", validarRolHeader("admin"), async (req, res) => {
  await Producto.update({ activo: false }, { where: { id: req.params.id } });
  res.send("Producto desactivado");
});

router.delete("/:id", validarRolHeader("admin"), async (req, res) => {
  await Producto.destroy({ where: { id: req.params.id } });
  res.send("Producto eliminado");
});

export default router;
