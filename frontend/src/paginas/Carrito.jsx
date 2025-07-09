import { useContext } from "react";
import { CarritoContexto } from "../context/CarritoContexto";
import { Link } from "react-router-dom";
import "../estilos/Carrito.css";

function Carrito() {
  const {
    carrito,
    guardados,
    cambiarCantidad,
    eliminarDelCarrito,
    moverAGuardados,
    moverAlCarrito,
    eliminarGuardado,
    vaciarCarrito,
    total
  } = useContext(CarritoContexto);

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div className="item-carrito" key={item.id_producto}>
              <img src={item.camiseta?.imagen_url} alt={item.camiseta?.descripcion_camiseta} />
              <div>
                <h3>{item.camiseta?.descripcion_camiseta}</h3>
                <p>Precio: ${item.precio}</p>
                <input
                  type="number"
                  value={item.cantidad}
                  min="1"
                  onChange={(e) => cambiarCantidad(item.id_producto, parseInt(e.target.value))}
                />
                <button onClick={() => eliminarDelCarrito(item.id_producto)}>❌ Eliminar</button>
                <button onClick={() => moverAGuardados(item)}>📦 Guardar para después</button>
              </div>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={vaciarCarrito} className="boton-cancelar">Cancelar carrito</button>
          <Link to="/checkout" className="boton-pagar">Completar Orden</Link>
        </>
      )}

      {guardados.length > 0 && (
        <div className="guardados">
          <h2>📦 Guardados para después</h2>
          {guardados.map((item) => (
            <div className="item-guardado" key={item.id_producto}>
              <img src={item.camiseta?.imagen_url} alt={item.camiseta?.descripcion_camiseta} />
              <div>
                <h3>{item.camiseta?.descripcion_camiseta}</h3>
                <p>${item.precio}</p>
                <button onClick={() => moverAlCarrito(item)}>↩️ Mover al carrito</button>
                <button onClick={() => eliminarGuardado(item.id_producto)}>🗑️ Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Carrito;
