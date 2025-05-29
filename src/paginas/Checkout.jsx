import {useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {CarritoContexto} from "../context/carritoContexto.jsx";
import '../estilos/Checkout.css';
import fondoEstadio from "../assets/imagenes/fondoprincipal.png";

function Checkout() {

    const navigate = useNavigate();

    const {listaProductos,setLista} = useContext(CarritoContexto);
    const [metodoPago, setMetodoPago] = React.useState("tarjeta");

    const montoTotal = listaProductos.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);

    const costoEnvio = 0.1 * montoTotal;

    const total = montoTotal + costoEnvio;

    const handlePago = () => {
        const productosPrevios = [...listaProductos];
        setLista([]);
        navigate("/finCompra", { state: { productos: productosPrevios } });
    };

    return (
        <div className="Contenido"
             style={{
                 backgroundImage: `url(${fondoEstadio})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 padding: '2rem'
             }}>
            <h1>Checkout</h1>
            <div className="Resumen">
            <ul>
                {listaProductos.map((product) => (
                    <li key={product.id}>
                        {product.img && <img src={product.img} alt={product.club} />}
                        <div className="info-producto">
                            {product.club} - Precio unitario: {product.precio} - Cantidad: {product.cantidad} - Total: {product.precio * product.cantidad}
                        </div>
                    </li>
                ))}
            </ul>
            <p> Subtotal: {montoTotal}</p>
            <p> Costo de envio: {costoEnvio}</p>
            <hr />
            <p> Total a pagar: {total}</p>
            </div>

            <button className="BotonLimpiar" onClick={() => setLista([])}>Vaciar carrito</button><br/>
            <p> Datos personales: </p>
            <form className="Formulario">
            <input type="text" placeholder="Ingrese su nombre" /><br/>
            <input type="text" placeholder="Ingrese su apellido" /><br/>
            <input type="text" placeholder="Ingrese su email" /><br/>
            <input type="text" placeholder="Ingrese su teléfono" /><br/>
            <input type="text" placeholder="Ingrese su dirección" /><br/>

            <h3>Seleccione el método de pago</h3>
            <div>
                <label>
                    <input
                        type="radio"
                        value="tarjeta"
                        checked={metodoPago === "tarjeta"}
                        onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    Tarjeta de crédito
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        value="yape"
                        checked={metodoPago === "yape"}
                        onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    Yape / Plin
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        value="contraentrega"
                        checked={metodoPago === "contraentrega"}
                        onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    Pago contra entrega
                </label>
            </div>

            {metodoPago === "tarjeta" && (
                <div>
                    <h4>Pago con tarjeta</h4>
                    <input type="text" placeholder="Número de tarjeta" />
                    <input type="text" placeholder="Nombre en la tarjeta" />
                    <input type="text" placeholder="Fecha de vencimiento" />
                    <input type="text" placeholder="CVV" />
                    <br/>
                    <button onClick={handlePago}>Pagar</button>
                </div>
            )}

            {metodoPago === "yape" && (
                <div>
                    <h4>Pago con Yape / Plin</h4>
                    <p>Escanea el código QR o envía el monto al número: <strong>987-654-321</strong></p>
                    <button onClick={handlePago}>Pagar</button>
                </div>
            )}

            {metodoPago === "contraentrega" && (
                <div>
                    <h4>Pago contra entrega</h4>
                    <p>Pagarás al recibir el producto en tu domicilio.</p>
                    <button onClick={handlePago}>Finalizar Compra</button>
                </div>
            )}
            </form>
        </div>
    );
}

export default Checkout;