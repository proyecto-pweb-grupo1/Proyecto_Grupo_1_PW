import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerProductos } from '../servicios/apiProductos';
import '../estilos/PaginaPrincipal.css';
import CamisetaCard from '../componentes/CamisetaCard';

export default function CategoriaProductos() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    obtenerProductos()
      .then(data => setProductos(data.filter(p => String(p.categoriaId) === String(id))))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="contenedor-principal" style={{ padding: '2rem' }}>
      <h2>Productos de la categoría</h2>
      {loading && <p>Cargando productos...</p>}
      {error && <p style={{color:'red'}}>Error: {error}</p>}
      <div className="grid-camisetas">
        {!loading && !error && productos.length > 0 ? (
          productos.map((item) => (
            <CamisetaCard
              key={item.id}
              id={item.id}
              club={item.nombre}
              precio={item.precio}
              img={item.imagen_url}
            />
          ))
        ) : (!loading && !error && <p>No hay productos en esta categoría.</p>)}
      </div>
    </div>
  );
}
