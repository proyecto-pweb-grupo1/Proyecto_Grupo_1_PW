import React, { useEffect, useState } from 'react';
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';
import '../estilos/PaginaPrincipal.css';
import CamisetaCard from '../componentes/CamisetaCard';
import CategoriaCard from '../componentes/CategoriaCard';
import BannerCarousel from '../componentes/BannerCarousel';
import { obtenerCategorias, obtenerProductos } from '../servicios/apiProductos';

export default function PaginaPrincipal() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([obtenerCategorias(), obtenerProductos()])
      .then(([cats, prods]) => {
        setCategorias(cats);
        setProductos(prods);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categoriasDestacadas = [...categorias].slice(0, 5);
  const productosTop = [...productos]
    .filter(p => p.activo !== false)
    .sort((a, b) => b.ventas - a.ventas)
    .slice(0, 12);

  const productosNuevos = [...productos]
    .filter(p => p.activo !== false)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  if (loading) return <p style={{ padding: '2rem' }}>Cargando tienda...</p>;
  if (error) return <p style={{ color: 'red', padding: '2rem' }}>Error: {error}</p>;

  return (
    <div
      className="contenedor-principal"
      style={{
        backgroundImage: `url(${fondoEstadio})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
      }}
    >
      <BannerCarousel />

      <section className="explora-categorias">
        <h2 className="titulo-explorar-categoria">Categorías destacadas</h2>
        <div className="categorias-grid">
          {categoriasDestacadas.map((cat) => (
            <CategoriaCard
              key={cat.id_categoria}
              nombre={cat.nombre_categoria}
              imagen={cat.imagen_url}
              ruta={`/categoria/${cat.id_categoria}`}
            />
          ))}
        </div>
      </section>

      <h2 className="titulo-seccion">Top 12 camisetas más vendidas</h2>
      <div className="grid-camisetas">
        {productosTop.map((item) => (
          <CamisetaCard
            key={item.id_producto}
            id={item.id_producto}
            club={item.camiseta?.descripcion_camiseta || item.nombre || 'Producto'}
            precio={item.precio}
            img={item.camiseta?.imagen_url || item.imagen_url || '/img/default.png'}
          />
        ))}
      </div>

      <h2 className="titulo-seccion">Novedades</h2>
      <div className="grid-camisetas">
        {productosNuevos.map((item) => (
          <CamisetaCard
            key={item.id_producto}
            id={item.id_producto}
            club={item.camiseta?.descripcion_camiseta || item.nombre || 'Producto'}
            precio={item.precio}
            img={item.camiseta?.imagen_url || item.imagen_url || '/img/default.png'}
          />
        ))}
      </div>
    </div>
  );
}
