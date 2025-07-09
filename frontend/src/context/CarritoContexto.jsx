import { createContext, useState, useEffect } from "react";

export const CarritoContexto = createContext(null);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [guardados, setGuardados] = useState([]);

  useEffect(() => {
    const carritoLocal = localStorage.getItem("carrito");
    const guardadosLocal = localStorage.getItem("guardados");
    if (carritoLocal) setCarrito(JSON.parse(carritoLocal));
    if (guardadosLocal) setGuardados(JSON.parse(guardadosLocal));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("guardados", JSON.stringify(guardados));
  }, [carrito, guardados]);

  const agregarAlCarrito = (producto) => {
    const existente = carrito.find((p) => p.id_producto === producto.id_producto);
    if (existente) {
      setCarrito(
        carrito.map((p) =>
          p.id_producto === producto.id_producto
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const cambiarCantidad = (id_producto, nuevaCantidad) => {
    setCarrito(
      carrito.map((p) =>
        p.id_producto === id_producto
          ? { ...p, cantidad: nuevaCantidad }
          : p
      )
    );
  };

  const eliminarDelCarrito = (id_producto) => {
    setCarrito(carrito.filter((p) => p.id_producto !== id_producto));
  };

  const moverAGuardados = (producto) => {
    eliminarDelCarrito(producto.id_producto);
    if (!guardados.some((p) => p.id_producto === producto.id_producto)) {
      setGuardados([...guardados, producto]);
    }
  };

  const moverAlCarrito = (producto) => {
    setGuardados(guardados.filter((p) => p.id_producto !== producto.id_producto));
    agregarAlCarrito(producto);
  };

  const eliminarGuardado = (id_producto) => {
    setGuardados(guardados.filter((p) => p.id_producto !== id_producto));
  };

  const totalCarrito = carrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  return (
    <CarritoContexto.Provider
      value={{
        carrito,
        guardados,
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
        moverAGuardados,
        moverAlCarrito,
        eliminarGuardado,
        totalCarrito,
      }}
    >
      {children}
    </CarritoContexto.Provider>
  );
}
