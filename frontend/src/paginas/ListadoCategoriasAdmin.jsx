// ListadoCategoriasAdmin.jsx
import React, { useEffect, useState } from 'react';
import '../estilos/AdminCategorias.css';

export default function ListadoCategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);

  return (
    <div className="admin-cat-container">
      <h2>Listado de Categorías</h2>
      {categorias.length === 0 ? (
        <p style={{ color: '#555' }}>No hay categorías aún.</p>
      ) : (
        <div className="admin-cat-grid">
          {categorias.map((cat) => (
            <div className="admin-cat-card" key={cat.id_categoria}>
              <img src={cat.imagen_url} alt={cat.nombre_categoria} />
              <p>{cat.nombre_categoria}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
