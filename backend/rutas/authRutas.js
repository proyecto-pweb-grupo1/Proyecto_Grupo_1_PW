import express from "express";
import { login } from "../controladores/authControlador.js";

const router = express.Router();

router.post("/login", login);

export default router;
