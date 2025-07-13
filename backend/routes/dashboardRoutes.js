import express from "express";
import { resumenDashboard } from "../controllers/dashboardController.js";
import { validarAutenticacion } from "../middlewares/validarAutenticacion.js";
import { validarRolAdmin } from "../middlewares/validarRolAdmin.js";

const router = express.Router();

router.get("/", validarAutenticacion, validarRolAdmin, resumenDashboard);

export default router;
