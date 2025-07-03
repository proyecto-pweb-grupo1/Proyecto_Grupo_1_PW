import express from "express";
import { Categoria } from "../models/Categoria.js";
import { validarRolHeader } from "../middlewares/validarRolHeader.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
});

router.post("/", validarRolHeader("admin"), async (req, res) => {
  const categoria = await Categoria.create(req.body);
  res.json(categoria);
});

export default router;

