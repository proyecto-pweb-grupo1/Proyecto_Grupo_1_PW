import { useLocation, useNavigate } from 'react-router-dom';
import '../estilos/ResultadosBusqueda.css';
import camisetas from '../data/camisetas';
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';



function ResultadosBusqueda() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const termino = params.get("q");

  const resultados = camisetas.filter(item =>
    item.club.toLowerCase().includes(termino?.toLowerCase())
  );

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
      <div className="resultados-grid">
        {resultados.length > 0 ? (
          resultados.map((item, idx) => (
            <div className="resultado-card" key={idx}>
              <img src={item.img} alt={item.club} />
              <h3>{item.club}</h3>
              <p>${item.precio}</p>
              <button onClick={() => navigate(`/detalle/${item.club}`)}>
                    Ver Detalle
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  </div>
);

}

export default ResultadosBusqueda;
