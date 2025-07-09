// src/servicios/apiProductos.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ----- PRODUCTOS -----
export async function obtenerProductos() {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
}

export async function obtenerProductoPorId(id) {
  const res = await fetch(`${API_URL}/productos/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return await res.json();
}

export async function crearProducto(datos) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al crear producto");
  }
  return await res.json();
}

export async function editarProducto(id, datos) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al editar producto");
  }
  return await res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al eliminar producto");
  }
  return await res.json();
}

// ----- CATÁLOGOS Y DATOS RELACIONADOS -----

export async function obtenerCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return await res.json();
}

export async function obtenerEquipos() {
  const res = await fetch(`${API_URL}/equipos`);
  if (!res.ok) throw new Error("Error al obtener equipos");
  return await res.json();
}

export async function obtenerTallas() {
  const res = await fetch(`${API_URL}/tallas`);
  if (!res.ok) throw new Error("Error al obtener tallas");
  return await res.json();
}

export async function obtenerGeneros() {
  const res = await fetch(`${API_URL}/generos`);
  if (!res.ok) throw new Error("Error al obtener géneros");
  return await res.json();
}

export async function obtenerMarcas() {
  const res = await fetch(`${API_URL}/marcas`);
  if (!res.ok) throw new Error("Error al obtener marcas");
  return await res.json();
}

export async function obtenerTiposCamiseta() {
  const res = await fetch(`${API_URL}/tipos_camiseta`);
  if (!res.ok) throw new Error("Error al obtener tipos de camiseta");
  return await res.json();
}

export async function obtenerTemporadas() {
  const res = await fetch(`${API_URL}/temporadas`);
  if (!res.ok) throw new Error("Error al obtener temporadas");
  return await res.json();
}



export async function obtenerProductosDestacados() {
  const res = await fetch(`${BASE_URL}/productos`);
  if (!res.ok) throw new Error('Error al obtener productos destacados');
  return res.json();
}

export async function editarCamiseta(idCamiseta, camiseta) {
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const res = await fetch(`${BASE_URL}/camisetas/${idCamiseta}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(camiseta),
  });
  if (!res.ok) throw new Error("Error al editar camiseta");
  return res.json();
}

export async function crearProductoCompleto(producto) {
  const res = await fetch(`${BASE_URL}/productos/agregar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al crear producto");
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

export async function buscarProductos(filtros = {}) {
  const query = new URLSearchParams(filtros).toString();
  const res = await fetch(`${BASE_URL}/productos/buscar?${query}`);
  if (!res.ok) throw new Error("Error al buscar productos");
  return res.json();
}

export async function obtenerProductoPorSku(sku) {
  const res = await fetch(`${BASE_URL}/productos/sku/${sku}`);
  if (!res.ok) throw new Error("Producto no encontrado por SKU");
  return res.json();
}

export async function actualizarStock(idProducto, nuevoStock) {
  const res = await fetch(`${BASE_URL}/productos/${idProducto}/stock`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock: nuevoStock }),
  });
  if (!res.ok) throw new Error("Error al actualizar stock");
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

export async function crearTemporada(temporada) {
  const res = await fetch(`${BASE_URL}/temporadas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(temporada),
  });
  if (!res.ok) throw new Error("Error al crear temporada");
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

export async function obtenerKPIs() {
  const res = await fetch(`${BASE_URL}/metricas/kpis`);
  if (!res.ok) throw new Error("Error al obtener KPIs");
  return res.json();
}