import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/Consultas.css";

export default function Consultas() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/usuarios")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then(data => setUsuarios(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const verDetalles = (usuario) => {
    navigate(`/Consultas/usuario/${usuario.id}`, { state: usuario });
  };

  return (
    <div className="AdminUsers-container">
      <h2>Lista de Usuarios</h2>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <table className="AdminUsers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Más info.</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>
                  <button className="AdminUsers-btn" onClick={() => verDetalles(user)}>
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}