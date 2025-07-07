import React, { useEffect, useState } from 'react';
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';
import '../estilos/PaginaPrincipal.css';
import CamisetaCard from '../componentes/CamisetaCard';
import CategoriaCard from '../componentes/CategoriaCard';
import camisetas from '../data/camisetas';
import { obtenerCategorias } from '../servicios/apiProductos';

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    obtenerCategorias()
      .then(setCategorias)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div
        className="contenedor-principal"
        style={{
          backgroundImage: `url(${fondoEstadio})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem'
        }}
      >
        <section className="explora-categorias">
          <h2 className="titulo-explorar-categoria">Explora las categorías</h2>
          {loading && <p>Cargando categorías...</p>}
          {error && <p style={{color: 'red'}}>Error: {error}</p>}
          <div className="categorias-grid">
            {!loading && !error && categorias.length > 0 ? (
              categorias.map((cat) => (
                <CategoriaCard
                  key={cat.id}
                  nombre={cat.nombre}
                  imagen={cat.imagen_url}
                  ruta={cat.ruta || `/categoria/${cat.id}`}
                />
              ))
            ) : (!loading && !error && <p>No hay categorías.</p>)}
          </div>
        </section>

        <h2 className="titulo-seccion">Lo más vendido</h2>
        <div className="grid-camisetas">
          {camisetas.map((item, index) => (
            <CamisetaCard
              key={index}
              club={item.club}
              precio={item.precio}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </>
  );
}
