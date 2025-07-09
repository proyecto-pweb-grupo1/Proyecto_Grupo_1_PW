import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import { CarritoProvider } from './context/CarritoContexto';
import Rutas from "./rutas/Rutas";

function App() {
  return (

      <UserProvider>
        <CarritoProvider>
          <Rutas />
        </CarritoProvider>
      </UserProvider>

  );
}

export default App;
