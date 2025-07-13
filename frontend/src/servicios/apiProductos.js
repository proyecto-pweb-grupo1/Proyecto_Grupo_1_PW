const API_URL = 'http://localhost:3000/api/producto';

export async function obtenerProductos(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}?${query}`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
}

export async function obtenerProductosActivos() {
  const res = await fetch(`${API_URL}/activos`);
  if (!res.ok) throw new Error("Error al obtener productos activos");
  return await res.json();
}

export async function obtenerDetalleProducto(id) {
  const res = await fetch(`${API_URL}/detalle/${id}`);
  if (!res.ok) throw new Error("Error al obtener detalle de producto");
  return await res.json();
}

export async function agregarProducto(data, token) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      id_usuario: token?.id_usuario || '',
      rol: token?.rol || ''
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al agregar producto");
  return await res.json();
}

export async function actualizarProducto(id, data, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      id_usuario: token?.id_usuario || '',
      rol: token?.rol || ''
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return await res.json();
}

export async function cambiarEstadoProducto(id, usuario) {
  const res = await fetch(`${API_URL}/estado/${id}`, {
    method: 'PATCH',
    headers: {
      id_usuario: usuario?.id_usuario || '',
      rol: usuario?.rol || ''
    }
  });
  if (!res.ok) throw new Error("Error al cambiar estado del producto");
  return await res.json();
}

export async function obtenerProductosDestacados() {
  const res = await fetch(`${API_URL}/destacado`);
  if (!res.ok) throw new Error("Error al obtener productos destacados");
  return await res.json();
}

export async function obtenerProductosNuevos() {
  const res = await fetch(`${API_URL}/reciente`);
  if (!res.ok) throw new Error("Error al obtener productos recientes");
  return await res.json();
}

