const API = "http://localhost:3000/api/carrito";

export async function obtenerCarrito(id_usuario) {
  const res = await fetch(`${API}/${id_usuario}`, {
    headers: { "id_usuario": id_usuario }
  });
  if (!res.ok) throw new Error("Error al obtener el carrito");
  return await res.json();
}

export async function agregarProductoAlCarrito(id_usuario, id_producto, cantidad) {
  const res = await fetch(`${API}/${id_usuario}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "id_usuario": id_usuario },
    body: JSON.stringify({ id_producto, cantidad })
  });
  return await res.json();
}

export async function actualizarCantidadCarrito(id_carrito, id_producto, cantidad, id_usuario) {
  const res = await fetch(`${API}/cantidad/${id_carrito}/${id_producto}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "id_usuario": id_usuario },
    body: JSON.stringify({ cantidad })
  });
  return await res.json();
}

export async function eliminarDelCarrito(id_carrito, id_producto, id_usuario) {
  const res = await fetch(`${API}/${id_carrito}/${id_producto}`, {
    method: "DELETE",
    headers: { "id_usuario": id_usuario }
  });
  return await res.json();
}
