import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Categoria } from "./Categoria.js";

export const Producto = sequelize.define("Producto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  precio: DataTypes.DECIMAL,
  stock: DataTypes.INTEGER,
  imagen_url: DataTypes.STRING,
  activo: { type: DataTypes.BOOLEAN, defaultValue: true } 
}, {
  freezeTableName: true,
  timestamps: false
});


Producto.belongsTo(Categoria, { foreignKey: "categoriaId" });
Categoria.hasMany(Producto, { foreignKey: "categoriaId" });
