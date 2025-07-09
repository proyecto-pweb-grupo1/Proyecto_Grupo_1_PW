import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { buscarProductos } from '../servicios/apiProductos';
import '../estilos/ResultadosBusqueda.css';
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';

const opcionesOrden = [
  { value: '', label: 'Sin orden' },
  { value: 'precio_desc', label: 'Precio: mayor a menor' },
  { value: 'precio_asc', label: 'Precio: menor a mayor' },
  { value: 'nombre_asc', label: 'Nombre: A-Z' },
  { value: 'nombre_desc', label: 'Nombre: Z-A' },
];

function ResultadosBusqueda() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const termino = params.get("q");

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState('');

  useEffect(() => {
    if (!termino) return;
    setLoading(true);
    setError(null);
    buscarProductos(termino)
      .then(setResultados)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [termino]);

  function ordenarResultados(lista, orden) {
    if (orden === 'precio_desc') return [...lista].sort((a, b) => b.precio - a.precio);
    if (orden === 'precio_asc') return [...lista].sort((a, b) => a.precio - b.precio);
    if (orden === 'nombre_asc') return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (orden === 'nombre_desc') return [...lista].sort((a, b) => b.nombre.localeCompare(a.nombre));
    return lista;
  }

  const resultadosOrdenados = ordenarResultados(resultados, orden);

  return (
  <div
    className="fondo-estadio"
    style={{
      backgroundImage: `url(${fondoEstadio})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      gap: '2rem'
    }}
  >
    <div style={{ minWidth: 220 }}>
      <h3>Ordenar por</h3>
      <select value={orden} onChange={e => setOrden(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 8 }}>
        {opcionesOrden.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
    <div className="resultados-container" style={{ flex: 1 }}>
      <h2>Resultados de búsqueda para: "{termino}"</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      <div className="resultados-grid">
        {!loading && !error && resultadosOrdenados.length > 0 ? (
          resultadosOrdenados.map((item) => (
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
