import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../estilos/Carrito.css";
import { useNavigate } from "react-router-dom";

function Carrito() {
  const { usuario } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [guardados, setGuardados] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const cargarCarrito = async () => {
    if (!usuario) return;
    const res = await fetch(`http://localhost:3000/api/carrito/${usuario.id_usuario}`);
    const data = await res.json();
    const activos = data.filter(i => !i.guardado);
    const inactivos = data.filter(i => i.guardado);
    setItems(activos);
    setGuardados(inactivos);
    calcularTotal(activos);
  };

  const calcularTotal = (lista) => {
    const total = lista.reduce((acc, item) => acc + item.cantidad * parseFloat(item.PRODUCTO.precio), 0);
    setTotal(total.toFixed(2));
  };

  const eliminar = async (id_producto) => {
    await fetch("http://localhost:3000/api/carrito/eliminar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: usuario.id_usuario, id_producto })
    });
    cargarCarrito();
  };

  const guardar = async (id_producto) => {
    await fetch("http://localhost:3000/api/carrito/guardar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: usuario.id_usuario, id_producto })
    });
    cargarCarrito();
  };

  useEffect(() => {
    cargarCarrito();
  }, [usuario]);

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de compras</h2>
      {items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="carrito-lista">
            {items.map((item) => (
              <li key={item.id_producto}>
                <img src={item.PRODUCTO.CAMISETum?.imagen_url || ''} alt="" />
                <div>
                  <h4>{item.PRODUCTO.CAMISETum?.descripcion_camiseta}</h4>
                  <p>S/ {parseFloat(item.PRODUCTO.precio || 0).toFixed(2)} x {item.cantidad}</p>
                </div>
                <button onClick={() => guardar(item.id_producto)}>Guardar para después</button>
                <button onClick={() => eliminar(item.id_producto)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3>Total: S/ {parseFloat(total || 0).toFixed(2)}</h3>
          <button onClick={() => navigate("/checkout")}>Completar Orden</button>
        </>
      )}

      {guardados.length > 0 && (
        <>
          <h3>Guardados para después</h3>
          <ul className="carrito-guardado">
            {guardados.map((item) => (
              <li key={item.id_producto}>
                <img src={item.PRODUCTO.CAMISETum?.imagen_url || ''} alt="" />
                <div>
                  <h4>{item.PRODUCTO.CAMISETum?.descripcion_camiseta}</h4>
                  <p>S/ {parseFloat(item.PRODUCTO.precio || 0).toFixed(2)}</p>
                </div>
                <button onClick={() => eliminar(item.id_producto)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Carrito;
