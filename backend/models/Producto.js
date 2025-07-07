import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Producto = sequelize.define("Producto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: DataTypes.STRING,
  precio: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  imagen_url: DataTypes.STRING,
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Categoria", key: "id" }
  }
}, {
  freezeTableName: true,
  timestamps: false
});
