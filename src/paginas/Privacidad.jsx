import '../estilos/Footer.css';
import '../estilos/general.css';

export default function Privacidad() {
  return (
    <div className="fondo-global">
      <div className="footer-content-box">
        <h2>Política de Privacidad</h2>
        <p>Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos y usamos tu información:</p>
        <ul>
          <li>Solo solicitamos datos necesarios para la compra y envío de productos.</li>
          <li>No compartimos tu información personal con terceros sin tu consentimiento.</li>
          <li>Utilizamos medidas de seguridad para proteger tus datos.</li>
          <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
        </ul>
      </div>
    </div>
  );
}
