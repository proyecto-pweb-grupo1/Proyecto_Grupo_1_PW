import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Usuario } from "./Usuario.js";

export const Orden = sequelize.define("Orden", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fecha: DataTypes.DATE,
  total: DataTypes.DECIMAL,
  direccion: DataTypes.STRING,
  metodo_pago: DataTypes.STRING,
  metodo_envio: DataTypes.STRING,
  estado: { type: DataTypes.STRING, defaultValue: "activa" }

}, {
  freezeTableName: true,
  timestamps: false
});

Orden.belongsTo(Usuario, { foreignKey: "usuarioId" });
Usuario.hasMany(Orden, { foreignKey: "usuarioId" });