import React, { useEffect, useState } from 'react';
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';
import '../estilos/PaginaPrincipal.css';
import CamisetaCard from '../componentes/CamisetaCard';
import CategoriaCard from '../componentes/CategoriaCard';
import BannerCarousel from '../componentes/BannerCarousel';
import { obtenerCategorias, obtenerProductosDestacados } from '../servicios/apiProductos';



export default function PaginaPrincipal() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([obtenerCategorias(), obtenerProductosDestacados()])
      .then(([cats, prodsDest]) => {
        console.log("categorias:", cats);
        console.log("productosDestacados:", prodsDest);
        setCategorias(cats);
        setProductos(prodsDest); // solo productos destacados
      })
      .catch(err => {
        setError(err.message);
        console.error("ERROR EN useEffect:", err);
      })
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
              id={cat.id_categoria}
              nombre={cat.nombre_categoria}
              imagen={cat.imagen_url}
            />
          ))}


        </div>
      </section>

      <h2 className="titulo-seccion">
        Productos destacados
        <button
          style={{ marginLeft: '1rem', fontSize: '1rem', cursor: 'pointer', border: 'none', background: 'none', color: '#1976d2', textDecoration: 'underline' }}
          onClick={() => window.location.href = "/productos"}
        >
          Ver todos
        </button>
      </h2>



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
