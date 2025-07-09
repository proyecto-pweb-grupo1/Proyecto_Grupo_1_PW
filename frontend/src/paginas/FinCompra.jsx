import React, {useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {CarritoContexto} from "../context/carritoContexto.jsx";
import '../estilos/FinCompra.css'
import fondoEstadio from "../assets/imagenes/fondoprincipal.png";

function FinCompra(){
    const { state } = useLocation();
    const navigate = useNavigate();
    const listaProductos = state?.productos || [];

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
                {listaProductos.map((product) => (
                    <li key={product.club}>
                        {product.img && <img src={product.img} alt={product.club} />}
                        {product.club} - Precio unitario: {product.precio} - Cantidad: {product.cantidad} - Total: {product.cantidad * product.precio}
                    </li>
                ))}
            </ul>
            <h1>Gracias por su compra</h1>
            <button onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    );
}

export default FinCompra;