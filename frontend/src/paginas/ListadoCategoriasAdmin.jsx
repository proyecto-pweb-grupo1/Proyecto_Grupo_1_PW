import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/ListadoCategoriasAdmin.css';

export default function ListadoCategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/categorias');
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="categorias-admin-container">
      <h2>Categorías disponibles</h2>

      <div className="categorias-grid">
        {categorias.length === 0 ? (
          <p>No hay categorías registradas.</p>
        ) : (
          categorias.map((cat) => (
            <div key={cat.id_categoria} className="categoria-card">
              <img src={cat.imagen_url} alt={cat.nombre_categoria} />
              <p>{cat.nombre_categoria}</p>
            </div>
          ))
        )}
      </div>

      <button
        className="btn-agregar-categoria"
        onClick={() => navigate('/admin/agregar-categoria')}
      >
        ➕ Agregar Categoría
      </button>
    </div>
  );
}
