import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProductoGuardado = sequelize.define("ProductoGuardado", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Usuario", key: "id" }
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Producto", key: "id" }
  }
}, {
  freezeTableName: true,
  timestamps: false
});