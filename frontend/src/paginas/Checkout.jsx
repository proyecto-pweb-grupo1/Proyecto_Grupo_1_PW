import { useState, useContext } from "react";
import { CarritoContexto } from "../context/CarritoContexto";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../estilos/Checkout.css";

function Checkout() {
  const { carrito, total, vaciarCarrito } = useContext(CarritoContexto);
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const [qrGenerado, setQrGenerado] = useState(false);
  const [tarjeta, setTarjeta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarOrden = async (e) => {
    e.preventDefault();
    if (!direccion || (metodoPago === "tarjeta" && !tarjeta)) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/ordenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: usuario.id_usuario,
          direccion_envio: direccion,
          metodo_pago: metodoPago,
          productos: carrito.map(p => ({
            id_producto: p.id_producto,
            cantidad: p.cantidad,
            precio_unitario: p.precio
          }))
        })
      });

      if (res.ok) {
        setMensaje("Orden completada correctamente");
        vaciarCarrito();
        navigate("/pedido-completo");
      } else {
        setMensaje("Error al procesar la orden.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>🧾 Finalizar Compra</h2>
      <form onSubmit={enviarOrden}>
        <label>Dirección de envío:
          <input value={direccion} onChange={e => setDireccion(e.target.value)} required />
        </label>

        <label>Método de pago:
          <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
            <option value="tarjeta">Tarjeta</option>
            <option value="qr">Código QR</option>
          </select>
        </label>

        {metodoPago === "tarjeta" && (
          <label>Número de tarjeta:
            <input value={tarjeta} onChange={e => setTarjeta(e.target.value)} required />
          </label>
        )}

        {metodoPago === "qr" && (
          <div className="qr">
            {!qrGenerado ? (
              <button type="button" onClick={() => setQrGenerado(true)}>Generar QR</button>
            ) : (
              <img src="/qr_ejemplo.png" alt="QR" width={200} />
            )}
          </div>
        )}

        <h3>Total: ${total.toFixed(2)}</h3>
        <button type="submit">Completar Orden</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Checkout;
