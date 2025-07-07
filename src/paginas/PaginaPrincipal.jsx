import React, { useEffect, useState } from 'react';
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';
import '../estilos/PaginaPrincipal.css';
import CamisetaCard from '../componentes/CamisetaCard';
import CategoriaCard from '../componentes/CategoriaCard';
import BannerCarousel from '../componentes/BannerCarousel';
import { obtenerCategorias, obtenerProductos } from '../servicios/apiProductos';

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productos, setProductos] = useState([]);
  const [prodLoading, setProdLoading] = useState(false);
  const [prodError, setProdError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    obtenerCategorias()
      .then(setCategorias)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setProdLoading(true);
    setProdError(null);
    obtenerProductos()
      .then(data => {
        // Seleccionar 12 productos aleatorios
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProductos(shuffled.slice(0, 12));
      })
      .catch(err => setProdError(err.message))
      .finally(() => setProdLoading(false));
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
        <BannerCarousel />
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

        <h2 className="titulo-seccion">Algunos de nuestros productos...</h2>
        {prodLoading && <p>Cargando productos...</p>}
        {prodError && <p style={{color:'red'}}>Error: {prodError}</p>}
        <div className="grid-camisetas">
          {!prodLoading && !prodError && productos.length > 0 ? (
            productos.map((item) => (
              <CamisetaCard
                key={item.id}
                id={item.id}
                club={item.nombre}
                precio={item.precio}
                img={item.imagen_url}
              />
            ))
          ) : (!prodLoading && !prodError && <p>No hay productos disponibles.</p>)}
        </div>
      </div>
    </>
  );
}
