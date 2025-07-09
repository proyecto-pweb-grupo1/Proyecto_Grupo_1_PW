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

  useEffect(() => {
    obtenerCategorias().then(setCategorias).catch(console.error);
    obtenerProductos().then(setProductos).catch(console.error);
  }, []);

  const categoriasDestacadas = categorias.slice(0, 5);
  const productosTop = productos
    .sort((a, b) => b.ventas - a.ventas) // asumiendo campo ventas
    .slice(0, 12);

  const productosNuevos = productos
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

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
            club={item.camiseta?.descripcion_camiseta}
            precio={item.precio}
            img={item.camiseta?.imagen_url}
          />
        ))}
      </div>

      <h2 className="titulo-seccion">Novedades</h2>
      <div className="grid-camisetas">
        {productosNuevos.map((item) => (
          <CamisetaCard
            key={item.id_producto}
            id={item.id_producto}
            club={item.camiseta?.descripcion_camiseta}
            precio={item.precio}
            img={item.camiseta?.imagen_url}
          />
        ))}
      </div>
    </div>
  );
}
