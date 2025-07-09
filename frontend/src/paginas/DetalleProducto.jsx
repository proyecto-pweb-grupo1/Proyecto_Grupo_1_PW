import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';
import '../estilos/DetalleProducto.css';
import { obtenerProductoPorId, obtenerProductos } from "../servicios/apiProductos";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        if (data && data.CAMISETum?.id_categoria) {
          obtenerProductos()
            .then((todos) => {
              const similaresFiltrados = todos.filter(
                (item) =>
                  item.CAMISETum?.id_categoria === data.CAMISETum.id_categoria &&
                  item.id_producto !== data.id_producto
              );
              setSimilares(similaresFiltrados);
            })
            .catch(() => setSimilares([]));
        } else {
          setSimilares([]);
        }
        setLoading(false);
      })
      .catch(() => {
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
          <img src={producto.CAMISETum?.imagen_url || ''} alt={producto.CAMISETum?.descripcion_camiseta} className="detalle-imagen" />
          <div className="detalle-info">
            <h2>{producto.CAMISETum?.descripcion_camiseta}</h2>
            <p className="detalle-desc">Camiseta oficial. Tallas: S, M, L, XL.</p>
            <p className="detalle-precio">${producto.precio}</p>
            <p className="detalle-stock">Stock: {producto.stock}</p>
            <button className="btn-agregar">Agregar al carrito 🛒</button>
          </div>
        </div>

        <div className="similares">
          <h3>Productos similares</h3>
          <div className="similares-grid">
            {similares.length > 0 ? similares.map((item) => (
              <div className="similar-card" key={item.id_producto}>
                <img src={item.CAMISETum?.imagen_url || ''} alt={item.CAMISETum?.descripcion_camiseta} />
                <p>{item.CAMISETum?.descripcion_camiseta}</p>
                <p>${item.precio}</p>
                <button onClick={() => navigate(`/detalle/${item.id_producto}`)}>Ver detalle</button>
              </div>
            )) : (<p style={{ padding: '1rem' }}>No hay productos similares.</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
