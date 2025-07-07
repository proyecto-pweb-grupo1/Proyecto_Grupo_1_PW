import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const DetalleOrden = sequelize.define("DetalleOrden", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ordenId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Orden", key: "id" }
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Producto", key: "id" }
  },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio_unitario: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, {
  freezeTableName: true,
  timestamps: false
});
