// src/contextos/UserContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

// Crear el contexto
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const almacenado = localStorage.getItem("usuario");
    if (almacenado) {
      try {
        setUsuario(JSON.parse(almacenado));
      } catch (error) {
        console.error("Error al parsear usuario:", error);
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  const login = (datosUsuario) => {
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  };

  // ✅ logout ahora puede recibir una función externa
  const logout = (onLogoutCallback) => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    if (typeof onLogoutCallback === "function") {
      onLogoutCallback(); // como vaciarCarrito()
    }
  };

  const estaLogueado = () => !!usuario;

  const esAdmin = () => usuario?.rol?.toLowerCase() === "admin";

  const obtenerId = () => usuario?.id || null;

  return (
    <UserContext.Provider
      value={{ usuario, login, logout, estaLogueado, esAdmin, obtenerId }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UserContext);
}
