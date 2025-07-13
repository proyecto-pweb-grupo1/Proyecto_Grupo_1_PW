import React, { useContext, useEffect, useState } from 'react';
import '../estilos/Checkout.css';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [direccion, setDireccion] = useState({ direccion: '', ciudad: '', region: '', pais: '', codigo_postal: '', telefono: '' });
  const [metodoPago, setMetodoPago] = useState('qr');
  const [metodoEnvio, setMetodoEnvio] = useState('1');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cargarCarrito = async () => {
      const res = await fetch(`http://localhost:3000/api/carrito/${usuario.id_usuario}`);
      const data = await res.json();
      setCarrito(data);

      const totalCalculado = data.reduce((sum, item) => sum + parseFloat(item.producto.precio) * item.cantidad, 0);
      setTotal(totalCalculado.toFixed(2));
    };
    if (usuario) cargarCarrito();
  }, [usuario]);

  const manejarCambioDireccion = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  const manejarOrden = async () => {
    const dirRes = await fetch('http://localhost:3000/api/direcciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...direccion, id_usuario: usuario.id_usuario })
    });
    const dirData = await dirRes.json();

    const ordenRes = await fetch('http://localhost:3000/api/ordenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario: usuario.id_usuario,
        id_direccion: dirData.id_direccion,
        id_metodo_pago: metodoPago === 'qr' ? 1 : 2,
        id_metodo_envio: parseInt(metodoEnvio),
        total,
        productos: carrito.map(item => ({
          id_producto: item.producto.id_producto,
          cantidad: item.cantidad,
          precio_unitario: parseFloat(item.producto.precio)
        }))
      })
    });

    if (ordenRes.ok) navigate('/pedido-completo');
    else alert('Error al completar la orden');
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar Pedido</h2>
      <div className="checkout-grid">
        <div className="checkout-form">
          <h3>Dirección de Envio</h3>
          <input name="direccion" placeholder="Dirección" onChange={manejarCambioDireccion} />
          <input name="ciudad" placeholder="Ciudad" onChange={manejarCambioDireccion} />
          <input name="region" placeholder="Región" onChange={manejarCambioDireccion} />
          <input name="pais" placeholder="País" onChange={manejarCambioDireccion} />
          <input name="codigo_postal" placeholder="Código Postal" onChange={manejarCambioDireccion} />
          <input name="telefono" placeholder="Teléfono" onChange={manejarCambioDireccion} />

          <h3>Método de Pago</h3>
          <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
            <option value="qr">Código QR</option>
            <option value="tarjeta">Tarjeta de Crédito</option>
          </select>

          {metodoPago === 'qr' ? (
            <img src="/img/qr.png" alt="Código QR" className="qr-img" />
          ) : (
            <>
              <input placeholder="Número de tarjeta" />
              <input placeholder="Nombre en la tarjeta" />
              <input placeholder="MM/YY" />
              <input placeholder="CVC" />
            </>
          )}

          <h3>Método de Envio</h3>
          <select value={metodoEnvio} onChange={e => setMetodoEnvio(e.target.value)}>
            <option value="1">Estándar (S/ 10.00)</option>
            <option value="2">Express (S/ 20.00)</option>
          </select>
        </div>

        <div className="checkout-resumen">
          <h3>Resumen del Pedido</h3>
          <ul>
            {carrito.map(item => (
              <li key={item.producto.id_producto}>
                {item.producto.camiseta.descripcion_camiseta} x{item.cantidad} - S/ {item.producto.precio}
              </li>
            ))}
          </ul>
          <p>Total: <strong>S/ {total}</strong></p>
          <button onClick={manejarOrden}>Completar Orden</button>
        </div>
      </div>
    </div>
  );
}