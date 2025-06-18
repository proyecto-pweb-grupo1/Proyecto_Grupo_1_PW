
import { useNavigate } from 'react-router-dom';

export default function CamisetaCard({ club, precio, img }) {
  const navigate = useNavigate();

  return (
    <div className="card-camiseta">
      
      <img src={img} alt={club} />
      <h3>{club}</h3>
      <p>${precio}</p>
      <button onClick={() => navigate(`/detalle/${club}`)}>
        Ver Detalle
      </button>
    </div>
  );
}
