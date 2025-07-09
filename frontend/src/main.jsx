import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './estilos/general.css'
import usuarios from './data/usuarios'

if (!localStorage.getItem('usuarios')) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
