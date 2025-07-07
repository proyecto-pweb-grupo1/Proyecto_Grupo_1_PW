import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerProductosPorNombre } from '../servicios/apiProductos';
import '../estilos/ResultadosBusqueda.css';
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';

function ResultadosBusqueda() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const termino = params.get("q");

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!termino) return;
    setLoading(true);
    setError(null);
    obtenerProductosPorNombre(termino)
      .then(setResultados)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [termino]);

  return (
  <div
    className="fondo-estadio"
    style={{
      backgroundImage: `url(${fondoEstadio})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '2rem'
    }}
  >
    <div className="resultados-container">
      <h2>Resultados de búsqueda para: "{termino}"</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      <div className="resultados-grid">
        {!loading && !error && resultados.length > 0 ? (
          resultados.map((item) => (
            <div className="resultado-card" key={item.id}>
              <img src={item.imagen_url} alt={item.nombre} />
              <h3>{item.nombre}</h3>
              <p>${item.precio}</p>
              <button onClick={() => navigate(`/detalle/${item.id}`)}>
                    Ver Detalle
              </button>
            </div>
          ))
        ) : (!loading && !error && <p>No se encontraron resultados.</p>)}
      </div>
    </div>
  </div>
);

}

export default ResultadosBusqueda;
