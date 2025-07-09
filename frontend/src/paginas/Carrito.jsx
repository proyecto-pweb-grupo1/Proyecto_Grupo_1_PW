import {CarritoContexto} from "../context/CarritoContexto";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import '../estilos/Carrito.css';
import fondoEstadio from "../assets/imagenes/fondoprincipal.png";

function Carrito() {
    const navigate = useNavigate();
    const {listaProductos, setLista} = useContext(CarritoContexto);

    function aumentarCantidad(club){
        const productoActualizado = listaProductos.map(producto => producto.club === club ?
            {...producto, cantidad: producto.cantidad + 1} : producto
        );
        setLista(productoActualizado);
    }

    function disminuirCantidad(club){
        const productoActualizado = listaProductos.map(producto => producto.club === club && producto.cantidad > 1 ?
            {...producto, cantidad: producto.cantidad - 1} : producto
        );
        setLista(productoActualizado);
    }

    function eliminarProducto(club){
        const nuevaLista = listaProductos.filter(producto => producto.club !== club);
        setLista(nuevaLista);
    }

    const montoTotal = listaProductos.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);

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
                {listaProductos.length === 0 ? (<p>No hay productos en el carrito</p>)
                    :(
                        <>
                            <ul>
                                {listaProductos.map((product) => (
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
                            <p>Subtotal : {montoTotal}</p>
                            <p>Costo de envio : {costoEnvio}</p>
                            <hr />
                            <p><strong>Total: {total}</strong></p>
                            <hr />
                            <button onClick = {() => navigate("/checkout")}> Proceder con el pago </button>
                        </>
                    )}
            </div>
        </div>
    );
}

export default Carrito;