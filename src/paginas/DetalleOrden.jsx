import React from 'react';
import { estaLogueado } from '../helpers/auth';

export default function DetalleOrden() {
  if (!estaLogueado()) return <h2 style={{ padding: '2rem', color: 'red' }}>Debes iniciar sesión para ver tus órdenes.</h2>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Detalle de Orden</h2>
      <p>Esta es una simulación del detalle de una orden del usuario actual.</p>
      <ul>
        <li>Producto: Camiseta de ejemplo</li>
        <li>Precio: $85</li>
        <li>Estado: Procesando</li>
        <li>Fecha: 29/05/2025</li>
      </ul>
    </div>
  );
}