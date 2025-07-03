import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING,
  correo: DataTypes.STRING,
  password: DataTypes.STRING,
  rol: DataTypes.STRING,
  activo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  freezeTableName: true,
  timestamps: false
});
