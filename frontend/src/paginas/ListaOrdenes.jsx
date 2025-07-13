import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../estilos/ListaOrdenes.css';

function ListaOrdenes() {
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!usuario?.id_usuario || usuario.id_rol === 1) {
      setMensaje('Acceso no autorizado');
      return;
    }

    const cargarOrdenes = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/ordenes/usuario/${usuario.id_usuario}`);
        if (res.ok) {
          const data = await res.json();
          if (data.length === 0) {
            setMensaje('No tienes órdenes registradas');
          } else {
            setOrdenes(data);
          }
        } else {
          setMensaje('Error al cargar órdenes');
        }
      } catch (error) {
        setMensaje('Error en el servidor');
      }
    };

    cargarOrdenes();
  }, [usuario]);

  return (
    <div className="lista-ordenes-container">
      <h2>Mis Órdenes</h2>

      {mensaje ? (
        <div className="mensaje-vacio">
          <p>{mensaje}</p>
          <button className="btn-volver" onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      ) : (
        <table className="tabla-ordenes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id_orden}>
                <td>{orden.id_orden}</td>
                <td>{new Date(orden.fecha).toLocaleString()}</td>
                <td>S/ {orden.total}</td>
                <td>{orden.ESTADO_ORDEN?.nombre_estado}</td>
                <td>
                  <button onClick={() => navigate(`/usuario/orden/${orden.id_orden}`)}>Ver Detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaOrdenes;
