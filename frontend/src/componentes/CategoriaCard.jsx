import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/CategoriaCard.css';

export default function CategoriaCard({ nombre, imagen, ruta }) {
  const navigate = useNavigate();

  return (
    <div className="categoria-card" onClick={() => navigate(ruta)}>
      <div className="categoria-img-container">
        <img src={imagen} alt={nombre} className="categoria-img" />
      </div>
      <p className="categoria-nombre">{nombre}</p>
    </div>
  );
}
