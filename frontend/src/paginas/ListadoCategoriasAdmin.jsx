import '../estilos/EstilosAdmin.css';
import React, { useEffect, useState } from 'react';
import categoriasBase from '../data/categorias';
import '../estilos/AdminCategorias.css';

export default function ListadoCategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('categorias_agregadas')) || [];
    const combinadas = [...categoriasBase, ...guardadas];
    setCategorias(combinadas);
  }, []);

  return (
    <div className="admin-cat-container">
      <h2>Listado de Categorías</h2>
      {categorias.length === 0 ? (
        <p style={{ color: '#555' }}>No hay categorías aún.</p>
      ) : (
        <div className="admin-cat-grid">
          {categorias.map((cat, index) => (
            <div className="admin-cat-card" key={index}>
              <img src={cat.imagen} alt={cat.nombre} />
              <p>{cat.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
