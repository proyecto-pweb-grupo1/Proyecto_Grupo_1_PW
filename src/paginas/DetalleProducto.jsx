import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';
import '../estilos/DetalleProducto.css';
import { obtenerProductoPorId, obtenerProductos } from "../servicios/apiProductos";

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [similares, setSimilares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    obtenerProductoPorId(id)
      .then((data) => {
        setProducto(data);
        
        if (data && data.categoriaId) {
          obtenerProductos()
            .then((todos) => {
              const similaresFiltrados = todos.filter(
                (item) => item.categoriaId === data.categoriaId && item.id !== data.id
              );
              setSimilares(similaresFiltrados);
            })
            .catch(() => setSimilares([]));
        } else {
          setSimilares([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Producto no encontrado");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!producto) return <h2>Producto no encontrado</h2>;

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
    <div className="detalle-container">
      <div className="detalle-card">
        <img src={producto.img || producto.imagen || producto.imagen_url || ''} alt={producto.nombre || producto.club} className="detalle-imagen" />
        <div className="detalle-info">
          <h2>{producto.nombre || producto.club}</h2>
          <p className="detalle-desc">{producto.descripcion || 'Camiseta oficial temporada actual. Tallas disponibles: S, M, L, XL.'}</p>
          <p className="detalle-precio">${producto.precio}</p>
          <p className="detalle-stock">Stock: {producto.stock}</p>
          <button className="btn-agregar">Agregar al carrito 🛒</button>
        </div>
      </div>
      {/* Sección de productos similares */}
      <div className="similares">
        <h3>Productos similares</h3>
        <div className="similares-grid">
          {similares.length > 0 ? similares.map((item) => (
            <div className="similar-card" key={item.id}>
              <img src={item.img || item.imagen || item.imagen_url || ''} alt={item.nombre || item.club} />
              <p>{item.nombre || item.club}</p>
              <p>${item.precio}</p>
              <button onClick={() => window.location.href = `/detalle/${item.id}`}>Ver detalle</button>
            </div>
          )) : (<p style={{padding:'1rem'}}>No hay productos similares.</p>)}
        </div>
      </div>
    </div>
  </div>
);

}

export default DetalleProducto;
