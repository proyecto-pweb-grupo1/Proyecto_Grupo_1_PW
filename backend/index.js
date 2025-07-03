import express from "express";
import cors from "cors";
import { sequelize } from "./config/database.js";
import adminRoutes from "./routes/adminRoutes.js";
import guardadoRoutes from "./routes/guardadoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import ordenRoutes from "./routes/ordenRoutes.js";
import detalleOrdenRoutes from "./routes/detalleOrdenRoutes.js";
import recuperacionRoutes from "./routes/recuperacionRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/guardados", guardadoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use("/api/detalle-orden", detalleOrdenRoutes);
app.use("/api/recuperar-password", recuperacionRoutes);

try {
  await sequelize.authenticate();
  console.log("Conectado a PostgreSQL");
  await sequelize.sync();
  app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
  });
} catch (error) {
  console.error("Error al conectar la base de datos:", error);
}
