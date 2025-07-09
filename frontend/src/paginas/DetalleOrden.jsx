// DetalleOrden.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DetalleOrden() {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/api/ordenes/${id}`)
      .then(res => res.json())
      .then(data => setOrden(data))
      .catch(() => setMensaje('Error al cargar orden'));
  }, [id]);

  const cancelarOrden = async () => {
    const res = await fetch(`http://localhost:3000/api/ordenes/${id}`, { method: 'DELETE' });
    if (res.ok) setMensaje('Orden cancelada correctamente');
    else setMensaje('No se pudo cancelar la orden');
  };

  if (!orden) return <p style={{ padding: '2rem' }}>Cargando orden...</p>;

  const total = orden.DETALLE_ORDENs?.reduce(
    (acc, item) => acc + item.precio_unitario * item.cantidad,
    0
  );

  return (
    <div className="order-detail">
      <h2>Detalle de Orden</h2>
      {mensaje && <p>{mensaje}</p>}
      <p><strong>Orden:</strong> {orden.id_orden}</p>
      <p><strong>Fecha:</strong> {orden.fecha}</p>
      <p><strong>Estado:</strong> {orden.ESTADO_ORDEN?.nombre_estado}</p>

      <h3>Productos</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orden.DETALLE_ORDENs?.map((item) => (
            <tr key={item.id_detalle}>
              <td>{item.PRODUCTO?.sku || 'Producto'}</td>
              <td>{item.cantidad}</td>
              <td>S/ {item.precio_unitario.toFixed(2)}</td>
              <td>S/ {(item.precio_unitario * item.cantidad).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: S/ {total?.toFixed(2)}</h3>
      <button className="btn cancelar" onClick={cancelarOrden}>Cancelar Orden</button>
    </div>
  );
}
