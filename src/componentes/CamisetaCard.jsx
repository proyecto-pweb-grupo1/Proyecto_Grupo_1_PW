
import { useNavigate } from 'react-router-dom';

export default function CamisetaCard({ club, precio, img, agregar}) {
  const navigate = useNavigate();

  return (
    <div className="card-camiseta">
      
      <img src={img} alt={club} />
      <h3>{club}</h3>
      <p>${precio}</p>
      <button onClick={() => navigate(`/detalle/${club}`)}>
        Ver Detalle
      </button>
        <button onClick={()=>agregar({club, precio, img})}>Agregar al carrito</button>
    </div>
  );
}
