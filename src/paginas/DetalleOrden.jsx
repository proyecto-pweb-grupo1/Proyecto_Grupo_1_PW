import '../estilos/EstilosAdmin.css';
import React from 'react';
import { estaLogueado } from '../helpers/auth';

export default function DetalleOrden() {
  if (!estaLogueado()) {
    return <h2 style={{ padding: '2rem', color: 'red' }}>Debes iniciar sesión para ver tus órdenes.</h2>;
  }

  const orden = {
    id: 'ORD-2025-0008',
    fecha: '29/05/2025',
    estado: 'Procesado',
    productos: [
      {
        id: 1,
        nombre: 'Camiseta FC Barcelona Local 2024',
        imagen: 'https://th.bing.com/th/id/OIP.0c-Bi9Q_81qLW_NzFDMRhgHaI4?rs=1&pid=ImgDetMain',
        cantidad: 1,
        precio: 199.90
      },
      {
        id: 2,
        nombre: 'Camiseta Argentina Campeón 2022',
        imagen: 'https://th.bing.com/th/id/OIP.jdXFXD2SN5JzX0y3ExYz6gHaHa?rs=1&pid=ImgDetMain',
        cantidad: 2,
        precio: 179.50
      }
    ]
  };

  const total = orden.productos.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  return (
    <div className="order-detail">
      <h2>Detalle de Orden</h2>

      <div className="detalle-info">
        <p><strong>Número de Orden:</strong> {orden.id}</p>
        <p><strong>Fecha de Compra:</strong> {orden.fecha}</p>
        <p><strong>Estado:</strong> {orden.estado}</p>
      </div>

      <h3>Productos</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orden.productos.map((prod) => (
            <tr key={prod.id}>
              <td><img src={prod.imagen} alt={prod.nombre} style={{ width: '60px', borderRadius: '8px' }} /></td>
              <td>{prod.nombre}</td>
              <td>{prod.cantidad}</td>
              <td>S/ {prod.precio.toFixed(2)}</td>
              <td>S/ {(prod.precio * prod.cantidad).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <h3>Total: S/ {total.toFixed(2)}</h3>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button
          className="btn cancelar"
          onClick={() => alert('La orden ha sido cancelada.')}
        >
          Cancelar Orden
        </button>

      </div>
    </div>
  );
}
