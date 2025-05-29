const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export async function obtenerUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function obtenerUsuarioPorId(idUsuario) {
  const res = await fetch(`${BASE_URL}/usuarios/${idUsuario}`);
  if (!res.ok) throw new Error("Usuario no encontrado");
  return res.json();
}

export async function crearUsuario(usuario) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
}

export async function editarUsuario(idUsuario, usuario) {
  const res = await fetch(`${BASE_URL}/usuarios/${idUsuario}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!res.ok) throw new Error("Error al editar usuario");
  return res.json();
}

export async function eliminarUsuario(idUsuario) {
  const res = await fetch(`${BASE_URL}/usuarios/${idUsuario}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar usuario");
  return res.json();
}

export async function cambiarEstadoUsuario(idUsuario, activo) {
  const res = await fetch(`${BASE_URL}/usuarios/${idUsuario}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ activo }),
  });
  if (!res.ok) throw new Error("Error al cambiar estado del usuario");
  return res.json();
}

export async function obtenerUsuarioPorCorreo(correo) {
  const res = await fetch(`${BASE_URL}/usuarios/correo/${correo}`);
  if (!res.ok) throw new Error("Usuario no encontrado por correo");
  return res.json();
}
