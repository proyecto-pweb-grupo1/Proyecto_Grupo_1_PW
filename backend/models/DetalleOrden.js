import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Orden } from "./Orden.js";
import { Producto } from "./Producto.js";

export const DetalleOrden = sequelize.define("DetalleOrden", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cantidad: DataTypes.INTEGER,
  subtotal: DataTypes.DECIMAL
}, {
  freezeTableName: true,
  timestamps: false
});

DetalleOrden.belongsTo(Orden, { foreignKey: "ordenId" });
DetalleOrden.belongsTo(Producto, { foreignKey: "productoId" });

Orden.hasMany(DetalleOrden, { foreignKey: "ordenId" });
Producto.hasMany(DetalleOrden, { foreignKey: "productoId" });
