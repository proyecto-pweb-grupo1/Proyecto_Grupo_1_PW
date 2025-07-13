import express from "express";
import {
  verCarrito,
  agregarAlCarrito,
  actualizarCantidad,
  eliminarDelCarrito
} from "../controllers/carritoController.js";
import { validarAutenticacion } from "../middlewares/validarAutenticacion.js";

const router = express.Router();

router.get("/:id", validarAutenticacion, verCarrito);
router.post("/:id", validarAutenticacion, agregarAlCarrito);
router.put("/:id_carrito/producto/:id_producto", validarAutenticacion, actualizarCantidad);
router.delete("/:id_carrito/producto/:id_producto", validarAutenticacion, eliminarDelCarrito);

export default router;
