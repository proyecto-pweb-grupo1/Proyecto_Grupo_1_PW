import {useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {CarritoContexto} from "../context/CarritoContexto.jsx";
import '../estilos/Checkout.css';
import fondoEstadio from "../assets/imagenes/fondoprincipal.png";
import {UserContext} from "../context/UserContext";

function Checkout() {

    const navigate = useNavigate();

    const {carrito, setCarrito} = useContext(CarritoContexto);
    const [metodoPago, setMetodoPago] = React.useState("tarjeta");
    const [metodoEnvio, setMetodoEnvio] = React.useState("Recojo en Tienda");

    const montoTotal = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);

    const costoEnvio = 0.1 * montoTotal;

    const total = montoTotal + costoEnvio;

    const usuario = useContext(UserContext);

    const handlePago = async () => {
        const productosPrevios = [...carrito];

        const direccion = document.querySelector('#Direccion')?.value;
        if (!direccion) {
            alert("Ingrese una dirección válida");
            return;
        }

        try {
            const ordenRes = await fetch("http://localhost:3000/api/ordenes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usuarioId: 1, // reemplaza por usuario.id cuando lo tengas
                    direccion,
                    metodoPago,
                    metodoEnvio,
                    productos: carrito.map(p => ({
                        productoId: p.id,
                        cantidad: p.cantidad
                    }))
                }),
            });

            if (!ordenRes.ok) {
                throw new Error("No se pudo registrar la orden.");
            }

            const data = await ordenRes.json();
            console.log("Orden registrada:", data);

            setCarrito([]);
            navigate("/finCompra", { state: { productos: productosPrevios } });
        } catch (err) {
            console.error("Error al procesar la orden:", err);
            alert("Ocurrió un error al registrar la compra.");
        }
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
                    {carrito.map((product) => (
                        <li key={product.id}>
                            {product.img && <img src={product.img} alt={product.club} />}
                            <div className="info-producto">
                                {product.club} - Precio unitario: {product.precio} - Cantidad: {product.cantidad} - Total: {product.precio * product.cantidad}
                            </div>
                        </li>
                    ))}
                </ul>
                <p> Subtotal: {montoTotal.toFixed(2)}</p>
                <p> Costo de envio: {costoEnvio.toFixed(2)}</p>
                <hr />
                <p> Total a pagar: {total.toFixed(2)}</p>
            </div>

            <button className="BotonLimpiar" onClick={() => setCarrito([])}>Vaciar carrito</button><br/>
            <p> Datos personales: </p>
            <form className="Formulario">
                <input type="text" placeholder="Ingrese su nombre" /><br/>
                <input type="text" placeholder="Ingrese su apellido" /><br/>
                <input type="text" placeholder="Ingrese su email" /><br/>
                <input type="text" placeholder="Ingrese su teléfono" /><br/>
                <input id="Direccion" type="text" placeholder="Ingrese su dirección" /><br/>
                <h3>Seleccione el método de envío</h3>
                <select value={metodoEnvio} onChange={(e) => setMetodoEnvio(e.target.value)}>
                    <option value="Recojo en Tienda">Recojo en Tienda</option>
                    <option value="Delivery">Delivery</option>
                </select>
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
                        <button type="button" onClick={handlePago}>Pagar</button>
                    </div>
                )}

                {metodoPago === "yape" && (
                    <div>
                        <h4>Pago con Yape / Plin</h4>
                        <p>Escanea el código QR o envía el monto al número: <strong>987-654-321</strong></p>
                        <button type="button" onClick={handlePago}>Pagar</button>
                    </div>
                )}

                {metodoPago === "contraentrega" && (
                    <div>
                        <h4>Pago contra entrega</h4>
                        <p>Pagarás al recibir el producto en tu domicilio.</p>
                        <button type="button" onClick={handlePago}>Finalizar Compra</button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Checkout;