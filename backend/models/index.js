import { Categoria } from "./Categoria.js";
import { Producto } from "./Producto.js";
import { Usuario } from "./Usuario.js";
import { Orden } from "./Orden.js";
import { DetalleOrden } from "./DetalleOrden.js";
import { ProductoGuardado } from "./ProductoGuardado.js";

Categoria.hasMany(Producto, { foreignKey: "categoriaId" });
Producto.belongsTo(Categoria, { foreignKey: "categoriaId" });

Usuario.hasMany(Orden, { foreignKey: "usuarioId" });
Orden.belongsTo(Usuario, { foreignKey: "usuarioId" });

Orden.hasMany(DetalleOrden, { foreignKey: "ordenId" });
DetalleOrden.belongsTo(Orden, { foreignKey: "ordenId" });

Producto.hasMany(DetalleOrden, { foreignKey: "productoId" });
DetalleOrden.belongsTo(Producto, { foreignKey: "productoId" });

Usuario.hasMany(ProductoGuardado, { foreignKey: "usuarioId" });
ProductoGuardado.belongsTo(Usuario, { foreignKey: "usuarioId" });

Producto.hasMany(ProductoGuardado, { foreignKey: "productoId" });
ProductoGuardado.belongsTo(Producto, { foreignKey: "productoId" });

export {
  Categoria,
  Producto,
  Usuario,
  Orden,
  DetalleOrden,
  ProductoGuardado
};
