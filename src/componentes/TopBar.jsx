import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../estilos/TopBar.css';

export default function TopBar() {
  const navigate = useNavigate();
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [termino, setTermino] = useState('');

  const handleCategoriaClick = (categoria) => {
    setMostrarDropdown(false);
    navigate(`/categoria/${categoria}`);
  };

  const handleBuscar = (e) => {
    if (e.key === 'Enter' && termino.trim() !== '') {
      navigate(`/buscar?q=${encodeURIComponent(termino)}`);
      setTermino('');
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <Link to="/" className="topbar-button">Inicio</Link>

        <div
          className="topbar-dropdown"
          onMouseEnter={() => setMostrarDropdown(true)}
          onMouseLeave={() => setMostrarDropdown(false)}
        >
          <button className="topbar-button">Categorías ⏷</button>
          {mostrarDropdown && (
            <div className="dropdown-content">
              <button onClick={() => handleCategoriaClick('nacionales')}>Nacionales</button>
              <button onClick={() => handleCategoriaClick('internacionales')}>Internacionales</button>
            </div>
          )}
        </div>
      </div>

      <div className="topbar-right">
        <input
          type="text"
          placeholder="Buscar camisetas..."
          className="search-input"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          onKeyDown={handleBuscar}
        />
        <button className="cart-button" onClick={() => navigate('/carrito')}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
            alt="Carrito"
          />
        </button>
        <button className="topbar-button" onClick={() => navigate('/login')}>
          Iniciar sesión
        </button>
        <button className="topbar-button" onClick={() => navigate('/register')}>
          Registrarse
        </button>
      </div>
    </div>
  );
}
