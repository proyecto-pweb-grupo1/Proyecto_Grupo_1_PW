import React from 'react'
import { UserProvider } from './context/UserContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rutas from "./rutas/Rutas";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Rutas />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;