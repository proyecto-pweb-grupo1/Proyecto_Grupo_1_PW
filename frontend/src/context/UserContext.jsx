<<<<<<< HEAD:src/context/UserContext.jsx
// src/contextos/UserContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
=======
// context/UserContext.jsx
import { createContext, useState, useEffect } from 'react';
>>>>>>> e9f4664d83e787ac51129de6237decc951ca1ad7:frontend/src/context/UserContext.jsx

// Crear el contexto
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
<<<<<<< HEAD:src/context/UserContext.jsx
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
=======
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado));
  }, []);

  const login = (usuarioData) => {
    setUsuario(usuarioData);
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
>>>>>>> e9f4664d83e787ac51129de6237decc951ca1ad7:frontend/src/context/UserContext.jsx
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
