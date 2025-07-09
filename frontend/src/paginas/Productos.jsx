import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { obtenerProductos, obtenerCategorias } from "../servicios/apiProductos";
import CamisetaCard from "../componentes/CamisetaCard";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    obtenerCategorias().then(setCategorias);
    obtenerProductos().then(setProductos).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const idCat = searchParams.get("categoria");
    if (idCat) setCategoriaSeleccionada(idCat);
  }, [searchParams]);

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((p) => String(p.categoria_id || p.id_categoria) === String(categoriaSeleccionada) || p.categoria === categoriaSeleccionada)
    : productos;

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div className="contenedor-productos" style={{padding: "2rem"}}>
      <h1>Todos los productos</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>Filtrar por categoría: </label>
        <select
          value={categoriaSeleccionada}
          onChange={e => {
            setCategoriaSeleccionada(e.target.value);
            setSearchParams(e.target.value ? { categoria: e.target.value } : {});
          }}
        >
          <option value="">Todas</option>
          {categorias.map(c => (
            <option key={c.id_categoria} value={c.id_categoria}>
              {c.nombre_categoria}
            </option>
          ))}
        </select>
      </div>
      <div className="grid-camisetas">
        {productosFiltrados.length === 0
          ? <p>No hay productos para esta categoría.</p>
          : productosFiltrados.map(item => (
              <CamisetaCard
                key={item.id_producto || item.id}
                id={item.id_producto || item.id}
                club={item.nombre || item.camiseta?.descripcion_camiseta || 'Producto'}
                precio={item.precio}
                img={item.imagen || item.camiseta?.imagen_url || "/img/default.png"}
              />
            ))}
      </div>
    </div>
  );
}
