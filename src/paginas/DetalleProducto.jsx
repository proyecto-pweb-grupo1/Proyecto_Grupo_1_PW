import { useParams } from "react-router-dom";
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';
import camisetas from "../data/camisetas"; 
import '../estilos/DetalleProducto.css';


function DetalleProducto() {
  
  const { id } = useParams();

  const producto = camisetas.find(
    (item) => item.club.toLowerCase() === id.toLowerCase()
  );

  const similares = camisetas.filter(
    (item) => item.categoria === producto?.categoria && item.club !== producto.club
  );

  if (!producto) {
    return <h2>Producto no encontrado</h2>;
  }

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
        <img src={producto.img} alt={producto.club} className="detalle-imagen" />
        <div className="detalle-info">
          <h2>{producto.club}</h2>
          <p className="detalle-desc">Camiseta oficial temporada actual. Tallas disponibles: S, M, L, XL.</p>
          <p className="detalle-precio">${producto.precio}</p>
          <button className="btn-agregar">Agregar al carrito 🛒</button>
        </div>
      </div>

      <div className="similares">
        <h3>Productos similares</h3>
        <div className="similares-grid">
          {similares.map((item, index) => (
            <div className="similar-card" key={index}>
              <img src={item.img} alt={item.club} />
              <p>{item.club}</p>
              <p>${item.precio}</p>
              <button>Ver detalle</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

}

export default DetalleProducto;
