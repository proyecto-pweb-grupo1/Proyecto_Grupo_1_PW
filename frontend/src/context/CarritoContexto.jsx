import {createContext, useState, useContext} from "react";
import {useEffect} from "react";

export const CarritoContexto = createContext(null);

export function CarritoProvider ({children}){
  const [carrito, setCarrito] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  useEffect(() => {
    const guardado = localStorage.getItem("wishlist");
    if (guardado) setWishlist(JSON.parse(guardado));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const agregarAFavoritos = (producto) => {
    setWishlist(prev => {
      const existe = prev.some(item => item.id === producto.id);
      return existe ? prev : [...prev, { ...producto }];
    });
  };

  const eliminarDeFavoritos = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const limpiarFavoritos = () => setWishlist([])

  return (
      <CarritoContexto.Provider value={{
        carrito, setCarrito,
        wishlist, setWishlist,
        eliminarDeFavoritos, limpiarFavoritos,
        agregarAlCarrito, agregarAFavoritos}}>
        {children}
      </CarritoContexto.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContexto);
