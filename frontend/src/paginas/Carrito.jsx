import React, { useContext, useEffect } from "react";
import { CarritoContexto } from "../context/CarritoContexto";
import "../estilos/Carrito.css";

export default function Carrito() {
  const {
    carrito,
    cambiarCantidad,
    eliminarDelCarrito,
    totalCarrito,
    recargarCarrito
  } = useContext(CarritoContexto);

  useEffect(() => {
    recargarCarrito();
  }, []);

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p className="carrito-vacio">Tu carrito está vacío.</p>
      ) : (
        <table className="carrito-tabla">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={`${item.id_carrito}-${item.id_producto}`}>
                <td>
                  <img
                    src={item.PRODUCTO?.CAMISETum?.imagen_url}
                    alt={item.PRODUCTO?.CAMISETum?.descripcion_camiseta}
                    className="producto-imagen"
                  />
                </td>
                <td>{item.PRODUCTO?.CAMISETum?.descripcion_camiseta}</td>
                <td>S/ {parseFloat(item.PRODUCTO?.precio || 0).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) =>
                      cambiarCantidad(item.id_producto, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>S/ {(item.PRODUCTO?.precio * item.cantidad).toFixed(2)}</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarDelCarrito(item.id_producto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {carrito.length > 0 && (
        <div className="carrito-total">
          <h3>Total: S/ {totalCarrito.toFixed(2)}</h3>
          <button
            className="btn-checkout"
            onClick={() => alert("Ir al checkout próximamente")}
          >
            Ir a Pagar
          </button>
        </div>
      )}
    </div>
  );
}