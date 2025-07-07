import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Orden = sequelize.define("Orden", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Usuario", key: "id" }
  },
  fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  total: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  estado: { type: DataTypes.STRING, allowNull: false, defaultValue: "pendiente" }
}, {
  freezeTableName: true,
  timestamps: false
});