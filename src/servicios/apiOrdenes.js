const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export async function obtenerOrdenes() {
  const res = await fetch(`${BASE_URL}/ordenes`);
  if (!res.ok) throw new Error("Error al obtener órdenes");
  return res.json();
}

export async function obtenerOrdenPorId(idOrden) {
  const res = await fetch(`${BASE_URL}/ordenes/${idOrden}`);
  if (!res.ok) throw new Error("Orden no encontrada");
  return res.json();
}

export async function crearOrden(orden) {
  const res = await fetch(`${BASE_URL}/ordenes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orden),
  });
  if (!res.ok) throw new Error("Error al crear orden");
  return res.json();
}

export async function editarOrden(idOrden, orden) {
  const res = await fetch(`${BASE_URL}/ordenes/${idOrden}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orden),
  });
  if (!res.ok) throw new Error("Error al editar orden");
  return res.json();
}

export async function eliminarOrden(idOrden) {
  const res = await fetch(`${BASE_URL}/ordenes/${idOrden}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar orden");
  return res.json();
}

export async function obtenerOrdenesPorUsuario(idUsuario) {
  const res = await fetch(`${BASE_URL}/usuarios/${idUsuario}/ordenes`);
  if (!res.ok) throw new Error("Error al obtener órdenes del usuario");
  return res.json();
}