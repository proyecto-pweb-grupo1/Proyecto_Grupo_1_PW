import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../estilos/Consultas.css";

export default function DetalleConsultaUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/admin/usuarios/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo obtener el usuario");
        return res.json();
      })
      .then(data => setUsuario(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!usuario) return <p>Usuario no encontrado</p>;

  return (
    <div className="AdminUsers-container">
      <h2>Detalles del Usuario</h2>
      <p><strong>ID:</strong> {usuario.id}</p>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Correo:</strong> {usuario.correo}</p>
      <p><strong>Rol:</strong> {usuario.rol}</p>
      <p><strong>Activo:</strong> {usuario.activo ? "Sí" : "No"}</p>

      <button
  className="AdminUsers-btn"
  onClick={() => navigate(`/consultas/usuario/${usuario.id}/ordenes`, { state: usuario })}
>
  Ver Órdenes
</button>
    </div>
  );
}