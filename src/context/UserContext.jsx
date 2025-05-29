import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));

  useEffect(() => {
    const almacenado = localStorage.getItem('usuario');
    setUsuario(almacenado);
  }, []);

  const login = (email) => {
    localStorage.setItem('usuario', email);
    setUsuario(email);
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
