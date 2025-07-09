import express from "express";
import { LOG_ACTIVIDAD, USUARIO } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const logs = await LOG_ACTIVIDAD.findAll({ include: [USUARIO] });
  res.json(logs);
});

router.post("/", async (req, res) => {
  const log = await LOG_ACTIVIDAD.create(req.body);
  res.json(log);
});

export default router;
