export async function obtenerKPIs() {
  const res = await fetch("http://localhost:3000/api/dashboard/");
  if (!res.ok) throw new Error("Error al obtener órdenes del usuario");
  return res.json();
}