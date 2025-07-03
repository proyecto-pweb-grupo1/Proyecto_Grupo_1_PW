import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Usuario } from "./Usuario.js";
import { Producto } from "./Producto.js";

export const ProductoGuardado = sequelize.define("ProductoGuardado", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, {
  freezeTableName: true,
  timestamps: false
});

ProductoGuardado.belongsTo(Usuario, { foreignKey: "usuarioId" });
ProductoGuardado.belongsTo(Producto, { foreignKey: "productoId" });