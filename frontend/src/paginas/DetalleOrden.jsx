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
    if (usuario === null) return;

    if (!usuario?.id_usuario || usuario.id_rol === 1) {
      setMensaje('Acceso no autorizado');
      return;
    }

    const cargarDetalle = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/orden/detalle/${id}`, {
          headers: { id_usuario: usuario.id_usuario }
        });

        const data = await res.json();
        if (res.ok) setOrden(data);
        else setMensaje('No se encontró la orden');
      } catch {
        setMensaje('Error al cargar detalles');
      }
    };

    cargarDetalle();
  }, [id, usuario]);

  const cancelarOrden = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/orden/cancelar/${id}`, {
        method: 'PUT',
        headers: { id_usuario: usuario.id_usuario }
      });

      if (res.ok) {
        alert('Orden cancelada');
        navigate('/usuario/ordenes');
      } else {
        alert('No se pudo cancelar');
      }
    } catch {
      alert('Error en el servidor');
    }
  };

  if (mensaje) {
    return (
      <div className="detalle-orden-container">
        <div className="mensaje-error">
          <h2>{mensaje}</h2>
          <button className="btn-volver" onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  if (!orden) return null;

  const estaCancelada = orden.ESTADO_ORDEN?.nombre_estado === 'Cancelado';

  return (
    <div className="detalle-orden-container">
      <h2>🧾 Detalle de Orden #{orden.id_orden}</h2>

      <div className="info-orden">
        <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
        <p><strong>Estado:</strong> {orden.ESTADO_ORDEN?.nombre_estado}</p>
        <p><strong>Pago:</strong> {orden.METODO_PAGO?.nombre_metodo}</p>
        <p><strong>Envío:</strong> {orden.METODO_ENVIO?.nombre_envio}</p>
      </div>

      <div className="direccion-envio">
        <h4>📦 Dirección de Envío</h4>
        <p>{orden.DIRECCION?.direccion}, {orden.DIRECCION?.ciudad}, {orden.DIRECCION?.region}, {orden.DIRECCION?.pais}</p>
        <p>📞 {orden.DIRECCION?.telefono}</p>
      </div>

      {estaCancelada && (
        <div className="orden-cancelada">
          ⚠️ Esta orden ha sido cancelada. No puedes modificarla ni repetir esta compra.
        </div>
      )}

      <table className="tabla-detalle">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {orden.DETALLE_ORDENs.map((item) => (
            <tr key={item.id_detalle}>
              <td>{item.PRODUCTO?.CAMISETum?.descripcion_camiseta}</td>
              <td>{item.cantidad}</td>
              <td>S/ {item.precio_unitario}</td>
              <td>S/ {item.subtotal}</td>
              <td>
                <span className="etiqueta-cancelado">
                  {estaCancelada ? 'Cancelado' : '—'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-orden">
        <strong>Total: S/ {orden.total}</strong>
      </div>

      <div className="acciones-orden">
        {!estaCancelada && (
          <button className="btn-cancelar" onClick={cancelarOrden}>Cancelar Orden</button>
        )}
        <button className="btn-volver" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  );
}
