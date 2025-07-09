import { useNavigate } from 'react-router-dom';
import '../estilos/CamisetaCard.css';

export default function CamisetaCard({ id, club, precio, img }) {
  const navigate = useNavigate();

  return (
    <div className="camiseta-card" onClick={() => navigate(`/detalle/${id}`)}>
      <img src={img} alt={club} className="camiseta-img" />
      <h4 className="camiseta-club">{club}</h4>
      <p className="camiseta-precio">${precio}</p>
    </div>
  );
}


