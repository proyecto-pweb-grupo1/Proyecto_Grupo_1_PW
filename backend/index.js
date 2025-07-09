import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js';
import catalogoRoutes from './rutas/datosReferencia.js';
import authRutas from "./rutas/authRutas.js"; 
import usuariosRoutes from './rutas/usuariosRoutes.js';
import productosRutas from './rutas/productos.js';
import carritoRutas from "./rutas/carritoRoutes.js";
import categoriasRutas from './rutas/categorias.js';
import ordenesRoutes from './rutas/ordenesRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', catalogoRoutes);
app.use("/api/auth", authRutas);
app.use("/api/usuarios", usuariosRoutes);
app.use('/api/categorias', categoriasRutas);
app.use("/api/productos", productosRutas);
app.use("/api/carrito", carritoRutas);
app.use('/api/ordenes', ordenesRoutes);

const PORT = process.env.PORT || 3000;

try {
  await sequelize.authenticate();
  console.log('✅ Conectado a la base de datos PostgreSQL');

  await sequelize.sync();
  console.log('✅ Modelos sincronizados');

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('❌ Error al iniciar el servidor:', error);
}
