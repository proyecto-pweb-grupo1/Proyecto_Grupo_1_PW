import { useNavigate } from 'react-router-dom';

export default function CamisetaCard({ id, club, precio, img }) {
  return (
    <div className="card-camiseta">
      <img src={img} alt={club} className="img-camiseta" />
      <h3>{club}</h3>
      <p>S/ {Number(precio).toFixed(2)}</p>
      <a href={`/producto/${id}`} className="btn-detalle">Ver Detalle</a>
    </div>
  );
}

