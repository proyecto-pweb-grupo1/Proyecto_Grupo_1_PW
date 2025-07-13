export async function obtenerCategorias() {
  const res = await fetch("http://localhost:3000/api/categoria");
  if (!res.ok) throw new Error("Error al obtener categorías");
  return await res.json();
}