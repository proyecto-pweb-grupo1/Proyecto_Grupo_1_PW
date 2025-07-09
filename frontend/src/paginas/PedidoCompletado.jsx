import "../estilos/PedidoCompleto.css";
import { useNavigate } from "react-router-dom";

function PedidoCompleto() {
  const navigate = useNavigate();

  return (
    <div className="pedido-completo-container">
      <div className="pedido-completo-card">
        <h2>🎉 ¡Gracias por tu compra!</h2>
        <p>Tu pedido ha sido procesado exitosamente.</p>
        <img src="/gracias.png" alt="Gracias" />
        <button onClick={() => navigate("/")}>Volver a Inicio</button>
      </div>
    </div>
  );
}

export default PedidoCompleto;
