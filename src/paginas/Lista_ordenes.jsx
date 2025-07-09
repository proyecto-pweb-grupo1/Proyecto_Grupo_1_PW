import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../estilos/Consultas.css";

export default function ListaOrdenes() {
  const location = useLocation();
  const usuario = location.state;

  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/ordenes/usuario/${usuario.id}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener órdenes");
        return res.json();
      })
      .then(data => setOrdenes(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [usuario.id]);

  return (
    <div className="AdminUsers-container">
      <h2>Órdenes del Usuario: {usuario?.nombre}</h2>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <table className="AdminUsers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Dirección</th>
              <th>Método de Pago</th>
              <th>Método de Envío</th>
              <th>Estado</th>
              <th>ID Usuario</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{new Date(orden.fecha).toLocaleString()}</td>
                <td>S/ {orden.total}</td>
                <td>{orden.direccion}</td>
                <td>{orden.metodo_pago}</td>
                <td>{orden.metodo_envio}</td>
                <td>{orden.estado}</td>
                <td>{orden.usuarioId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

