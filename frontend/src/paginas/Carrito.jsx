import {CarritoContexto, useCarrito} from "../context/CarritoContexto";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import '../estilos/Carrito.css';
import fondoEstadio from "../assets/imagenes/fondoprincipal.png";
import {UserContext} from "../context/UserContext";

function Carrito() {
  const navigate = useNavigate();
  const {carrito, setCarrito} = useContext(CarritoContexto);
  const {wishlist, setWishlist} = useCarrito();
  const {agregarAlCarrito, eliminarDeFavoritos} = useContext(CarritoContexto);

  function aumentarCantidad(club){
    const productoActualizado = carrito.map(producto => producto.club === club ?
        {...producto, cantidad: producto.cantidad + 1} : producto
    );
    setCarrito(productoActualizado);
  }

  function disminuirCantidad(club){
    const productoActualizado = carrito.map(producto => producto.club === club && producto.cantidad > 1 ?
        {...producto, cantidad: producto.cantidad - 1} : producto
    );
    setCarrito(productoActualizado);
  }

  function eliminarProducto(club){
    const nuevaLista = carrito.filter(producto => producto.club !== club);
    setCarrito(nuevaLista);
  }

  const {usuario} = useContext(UserContext);

  const handleCheckout = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para continuar con la compra.");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  const montoTotal = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);

  const costoEnvio = 0.1 * montoTotal;

  const total = montoTotal + costoEnvio;

  return (
      <div className="contenedor-principal"
           style={{
             backgroundImage: `url(${fondoEstadio})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             padding: '2rem'
           }}>
        <div id="listaCarrito">
          <h2>Carrito</h2>
          {carrito.length === 0 ? (<p>No hay productos en el carrito</p>)
              :(
                  <>
                    <ul>
                      {carrito.map((product) => (
                          <li key={product.club}>
                            {product.img && <img src={product.img} alt={product.club} />}
                            {product.club} - Precio unitario: {product.precio} - Cantidad:
                            <button onClick={() => disminuirCantidad(product.club)}>-</button>
                            {product.cantidad}
                            <button onClick={() => aumentarCantidad(product.club)}>+</button>
                            - Total: {product.cantidad * product.precio}
                            <button onClick={() => eliminarProducto(product.club)}>Eliminar</button>
                          </li>
                      ))}
                    </ul>
                    <p>Subtotal : {montoTotal.toFixed(2)}</p>
                    <p>Costo de envio : {costoEnvio.toFixed(2)}</p>
                    <hr />
                    <p><strong>Total: {total.toFixed(2)}</strong></p>
                    <hr />
                    <button onClick={handleCheckout}> Proceder con el pago </button>
                  </>
              )}
        </div>
        <div className="wishlist">
          <h2>Tu Wishlist</h2>
          {wishlist.length === 0 ? (
              <p>No tienes productos guardados.</p>
          ) : (
              <ul>
                {wishlist.map((item) => (
                    <li key={item.id}>
                      <img src={item.img} alt={item.club} width={80} />
                      <p>{item.club}</p>
                      <p>Precio: ${item.precio}</p>
                      <button onClick={() => {
                        agregarAlCarrito({ ...item, cantidad: 1 })
                      }}>
                        ➕ Mover al carrito
                      </button>
                      <button onClick={() => {eliminarDeFavoritos(item.id)}}>🗑 Quitar</button>
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
  );
}

export default Carrito;