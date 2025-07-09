import { createContext, useState, useEffect } from "react";
import {
  obtenerCarrito,
  agregarProductoAlCarrito,
  actualizarCantidadCarrito,
  eliminarDelCarrito as eliminarProductoDelCarrito
} from "../servicios/apiCarrito";

export const CarritoContexto = createContext(null);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [guardados, setGuardados] = useState([]);

  useEffect(() => {
    recargarCarrito();
  }, []);

  const recargarCarrito = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || !usuario.id_usuario) return;
    try {
      const actualizado = await obtenerCarrito(usuario.id_usuario);
      setCarrito(actualizado.CARRITO_ITEM || []);
    } catch (e) {
      console.error("Error al recargar carrito:", e);
    }
  };

  const agregarAlCarrito = async (producto) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    try {
      await agregarProductoAlCarrito(usuario.id_usuario, producto.id_producto, 1);
      await recargarCarrito();
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const cambiarCantidad = async (id_producto, nuevaCantidad) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const carritoBase = await obtenerCarrito(usuario.id_usuario);
    const carritoID = carritoBase?.id_carrito;    
    try {
      await actualizarCantidadCarrito(carritoID, id_producto, nuevaCantidad, usuario.id_usuario);
      await recargarCarrito();
    } catch (e) {
      console.error("Error al actualizar cantidad:", e);
    }
  };

  const eliminarDelCarrito = async (id_producto) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const carritoID = carrito[0]?.id_carrito;
    try {
      await eliminarProductoDelCarrito(carritoID, id_producto, usuario.id_usuario);
      await recargarCarrito();
    } catch (e) {
      console.error("Error al eliminar del carrito:", e);
    }
  };

  const totalCarrito = carrito.reduce(
    (acc, prod) => acc + prod.PRODUCTO?.precio * prod.cantidad,
    0
  );

  return (
    <CarritoContexto.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
        totalCarrito,
        recargarCarrito
      }}
    >
      {children}
    </CarritoContexto.Provider>
  );
}
