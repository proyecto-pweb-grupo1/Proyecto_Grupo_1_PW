import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import '../estilos/FinCompra.css'
import fondoEstadio from "../assets/imagenes/fondoprincipal.png";

function FinCompra(){
    const { state } = useLocation();
    const navigate = useNavigate();
    const carrito = state?.productos || [];

    const montoTotal = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);

    return (
        <div
            className="Contenido"
            style={{
                backgroundImage: `url(${fondoEstadio})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '2rem'
            }}>

            <h1>Compra realizada</h1>
            <h2>Resumen de tu compra</h2>
            <ul>
                {carrito.map((product) => (
                    <li key={product.club}>
                        {product.img && <img src={product.img} alt={product.club} />}
                        {product.club} - Precio unitario: S/ {product.precio} - Cantidad: {product.cantidad} - Total: S/ {(product.cantidad * product.precio).toFixed(2)}
                    </li>
                ))}
            </ul>

            <h3>Monto total de la compra: <strong>S/ {montoTotal.toFixed(2)}</strong></h3>

            <h1>Gracias por su compra</h1>
            <button onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    );
}

export default FinCompra;
