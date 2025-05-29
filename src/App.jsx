import React from 'react'
import { UserProvider } from './context/UserContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rutas from "./rutas/Rutas";
import {CarritoProvider} from "./context/CarritoContexto";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
          <CarritoProvider>
              <Rutas />
          </CarritoProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;