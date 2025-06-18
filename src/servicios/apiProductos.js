const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";



// =========== \\
//  PRODUCTOS  \\
// =========== \\

export async function obtenerProductos() {
  const res = await fetch(`${BASE_URL}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function obtenerProductoPorId(idProducto) {
  const res = await fetch(`${BASE_URL}/productos/${idProducto}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}

export async function crearProducto(producto) {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

export async function editarProducto(idProducto, producto) {
  const res = await fetch(`${BASE_URL}/productos/${idProducto}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al editar producto");
  return res.json();
}

export async function eliminarProducto(idProducto) {
  const res = await fetch(`${BASE_URL}/productos/${idProducto}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
}



// ============ \\
//  CATEGORÍAS  \\
// ============ \\

export async function obtenerCategorias() {
  const res = await fetch(`${BASE_URL}/categorias`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
}
export async function crearCategoria(categoria) {
  const res = await fetch(`${BASE_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return res.json();
}



// =================== \\
//  FILTRO Y BÚSQUEDA  \\
// =================== \\

export async function buscarProductos(filtros = {}) {
  const query = new URLSearchParams(filtros).toString();
  const res = await fetch(`${BASE_URL}/productos/buscar?${query}`);
  if (!res.ok) throw new Error("Error al buscar productos");
  return res.json();
}



// ===================== \\
//  DATOS DE REFERENCIA  \\
// ===================== \\

export async function obtenerEquipos() {
  const res = await fetch(`${BASE_URL}/equipos`);
  if (!res.ok) throw new Error("Error al obtener equipos");
  return res.json();
}

export async function crearEquipo(equipo) {
  const res = await fetch(`${BASE_URL}/equipos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(equipo),
  });
  if (!res.ok) throw new Error("Error al crear equipo");
  return res.json();
}

export async function crearEquipoRegion(equipoRegion) {
  const res = await fetch(`${BASE_URL}/equipo-region`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(equipoRegion),
  });
  if (!res.ok) throw new Error("Error al crear equipo-region");
  return res.json();
}

export async function obtenerTemporadas() {
  const res = await fetch(`${BASE_URL}/temporadas`);
  if (!res.ok) throw new Error("Error al obtener temporadas");
  return res.json();
}

export async function crearTemporada(temporada) {
  const res = await fetch(`${BASE_URL}/temporadas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(temporada),
  });
  if (!res.ok) throw new Error("Error al crear temporada");
  return res.json();
}

export async function obtenerTallas() {
  const res = await fetch(`${BASE_URL}/tallas`);
  if (!res.ok) throw new Error("Error al obtener tallas");
  return res.json();
}

export async function obtenerGeneros() {
  const res = await fetch(`${BASE_URL}/generos`);
  if (!res.ok) throw new Error("Error al obtener géneros");
  return res.json();
}

export async function obtenerMarcas() {
  const res = await fetch(`${BASE_URL}/marcas`);
  if (!res.ok) throw new Error("Error al obtener marcas");
  return res.json();
}

export async function crearMarca(marca) {
  const res = await fetch(`${BASE_URL}/marcas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marca),
  });
  if (!res.ok) throw new Error("Error al crear marca");
  return res.json();
}

export async function obtenerTiposCamiseta() {
  const res = await fetch(`${BASE_URL}/tipos-camiseta`);
  if (!res.ok) throw new Error("Error al obtener tipos de camiseta");
  return res.json();
}

export async function obtenerPaises() {
  const res = await fetch(`${BASE_URL}/paises`);
  if (!res.ok) throw new Error("Error al obtener países");
  return res.json();
}

export async function obtenerRegiones() {
  const res = await fetch(`${BASE_URL}/regiones`);
  if (!res.ok) throw new Error("Error al obtener regiones");
  return res.json();
}

export async function obtenerTipoClubs() {
  const res = await fetch(`${BASE_URL}/tipo-club`);
  if (!res.ok) throw new Error("Error al obtener tipos de club");
  return res.json();
}



// ============= \\
//  STOCK Y SKU  \\
// ============= \\

export async function actualizarStock(idProducto, nuevoStock) {
  const res = await fetch(`${BASE_URL}/productos/${idProducto}/stock`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock: nuevoStock }),
  });
  if (!res.ok) throw new Error("Error al actualizar stock");
  return res.json();
}

export async function obtenerProductoPorSku(sku) {
  const res = await fetch(`${BASE_URL}/productos/sku/${sku}`);
  if (!res.ok) throw new Error("Producto no encontrado por SKU");
  return res.json();
}