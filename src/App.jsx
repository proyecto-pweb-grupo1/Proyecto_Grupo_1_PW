import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rutas from "./rutas/Rutas";

function App() {
  return (
    <BrowserRouter>
      <Rutas />
    </BrowserRouter>
  );
}

export default App;