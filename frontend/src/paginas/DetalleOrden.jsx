import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../estilos/DetalleOrden.css';

export default function DetalleOrden() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useContext(UserContext);
  const [orden, setOrden] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarDetalle = async () => {
      if (!usuario?.id_usuario) {
        setMensaje('Usuario no autenticado');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/api/ordenes/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrden(data);
        } else {
          setMensaje('No hay orden encontrada');
        }
      } catch (error) {
        setMensaje('Error al cargar detalles de la orden');
      }
    };

    cargarDetalle();
  }, [id, usuario]);

  const cancelarOrden = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/ordenes/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setMensaje('✅ Orden cancelada exitosamente');
        navigate('/usuario/ordenes');
      } else {
        setMensaje('❌ No se pudo cancelar la orden');
      }
    } catch {
      setMensaje('❌ Error en el servidor al cancelar');
    }
  };

  if (mensaje) {
    return (
      <div className="detalle-orden-container">
        <div className="mensaje-vacio">
          <h2>{mensaje}</h2>
          <button className="btn-volver" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (!orden) return null;

  return (
    <div className="detalle-orden-container">
      <h2>Detalle de Orden</h2>

      <div className="info-orden">
        <p><strong>ID:</strong> {orden.id_orden}</p>
        <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
        <p><strong>Estado:</strong> {orden.ESTADO_ORDEN?.nombre_estado}</p>
      </div>

      {orden.detalles.length === 0 ? (
        <div className="mensaje-vacio">
          <p>No hay productos en esta orden.</p>
        </div>
      ) : (
        <>
          <table className="tabla-detalle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.detalles.map((item) => (
                <tr key={item.id_detalle}>
                  <td>{item.PRODUCTO?.CAMISETA?.descripcion_camiseta}</td>
                  <td>{item.cantidad}</td>
                  <td>S/ {item.precio_unitario}</td>
                  <td>S/ {item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total-orden">
            <strong>Total: S/ {orden.total}</strong>
          </div>
        </>
      )}

      <div className="acciones-orden">
        <button className="btn-cancelar" onClick={cancelarOrden}>Cancelar Orden</button>
        <button className="btn-volver" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  );
}
