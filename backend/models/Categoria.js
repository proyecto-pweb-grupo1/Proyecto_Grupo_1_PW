import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Categoria = sequelize.define("Categoria", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  imagen_url: DataTypes.STRING
}, {
  freezeTableName: true,
  timestamps: false
});
