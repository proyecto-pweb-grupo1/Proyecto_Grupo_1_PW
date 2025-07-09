import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './estilos/general.css'

if (!localStorage.getItem('usuarios')) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
