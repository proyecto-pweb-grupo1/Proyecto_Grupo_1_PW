import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import '../estilos/TopBar.css';

export default function TopBar() {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(UserContext);

  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const [termino, setTermino] = useState('');

  const esAdmin = usuario?.toLowerCase().includes('admin');

  const handleBuscar = (e) => {
    if (e.key === 'Enter' && termino.trim() !== '') {
      navigate(`/buscar?q=${encodeURIComponent(termino)}`);
      setTermino('');
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="logo">Grupo 1</span>
        <Link to="/" className="topbar-btn">Inicio</Link>

        <div
          className="topbar-dropdown"
          onMouseEnter={() => setMostrarDropdown(true)}
          onMouseLeave={() => setMostrarDropdown(false)}
        >
          <button className="topbar-btn">Categorías ⏷</button>
          {mostrarDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-col">
                <strong>Selecciones</strong>
                <button onClick={() => navigate('/categoria/sudamerica')}>Sudamérica</button>
                <button onClick={() => navigate('/categoria/europa')}>Europa</button>
                <button onClick={() => navigate('/categoria/resto')}>Resto del mundo</button>
              </div>
              <div className="dropdown-col">
                <strong>Internacional</strong>
                <button onClick={() => navigate('/categoria/laliga')}>La Liga</button>
                <button onClick={() => navigate('/categoria/premier')}>Premier League</button>
                <button onClick={() => navigate('/categoria/seriea')}>Serie A</button>
                <button onClick={() => navigate('/categoria/bundesliga')}>Bundesliga</button>
                <button onClick={() => navigate('/categoria/ligue1')}>Ligue 1</button>
                <button onClick={() => navigate('/categoria/primeira')}>Primeira Liga</button>
              </div>
              <div className="dropdown-col">
                <strong>Locales</strong>
                <button onClick={() => navigate('/categoria/liga1')}>Liga 1</button>
                <button onClick={() => navigate('/categoria/liga2')}>Liga 2</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="topbar-center">
        <h1 className="titulo-header">Tienda Oficial de Camisetas</h1>
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

        <button className="topbar-btn" onClick={() => navigate('/carrito')}>
          🛒 Carrito <span className="monto-carrito">$0.00</span>
        </button>

        {usuario ? (
          <div
            className="dropdown-user"
            onMouseEnter={() => setMostrarMenuUsuario(true)}
            onMouseLeave={() => setMostrarMenuUsuario(false)}
            style={{ position: 'relative' }}
          >
            <button className="topbar-btn">👤 {usuario} ⏷</button>
            {mostrarMenuUsuario && (
              <div className="dropdown-menu dropdown-user-menu" style={{ position: 'absolute', right: 0, top: '100%', zIndex: 999 }}>
                <button onClick={() => navigate('/usuario/orden')}>📦 Mis Órdenes</button>
                <button onClick={() => navigate('/usuario/datos')}>📝 Mi Perfil</button>
                <button onClick={() => navigate('/usuario/password')}>🔒 Cambiar Contraseña</button>
                {esAdmin && (
                  <>
                    <button onClick={() => navigate('/admin/categorias')}>🗂️ Ver Categorías</button>
                    <button onClick={() => navigate('/admin/agregar-categoria')}>➕ Agregar Categoría</button>
                  </>
                )}
                <button onClick={() => { logout(); navigate('/'); }}>
                  🚪 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>👤 Iniciar sesión</button>
            <button className="topbar-btn" onClick={() => navigate('/register')}>
              Registrarse
            </button>
          </>
        )}
      </div>
    </div>
  );
}
