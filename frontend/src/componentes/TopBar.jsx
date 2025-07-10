import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { obtenerCategorias } from '../servicios/apiCategorias';
import '../estilos/TopBar.css';
import '../estilos/index.css';

export default function TopBar() {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(UserContext);

  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const [termino, setTermino] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catError, setCatError] = useState(null);

  const nombreUsuario = usuario?.nombre || usuario?.correo || "Usuario";
  const esAdmin = usuario?.rol === 'admin' || usuario?.id_rol === 2;

  useEffect(() => {
    setCatLoading(true);
    setCatError(null);
    obtenerCategorias()
      .then(data => setCategorias(data))
      .catch(err => setCatError(err.message))
      .finally(() => setCatLoading(false));
  }, []);

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
              {catLoading && <p className="dropdown-info">Cargando...</p>}
              {catError && <p className="dropdown-error">Error: {catError}</p>}
              {!catLoading && !catError && categorias.length > 0 ? (
                categorias.map(cat => (
                  <button
                    key={cat.id_categoria}
                    className="dropdown-item"
                    onClick={() => navigate(`/categoria/${cat.id_categoria}`)}
                  >
                    {cat.icono_url &&
                      <img
                        src={cat.icono_url}
                        alt={cat.nombre_categoria}
                        className="categoria-icono"
                      />
                    }
                    <span>{cat.nombre_categoria}</span>
                  </button>
                ))
              ) : (
                <p className="dropdown-info">No hay categorías</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="topbar-center">
        <h1 className="titulo-header">Tienda de Camisetas Gepeto</h1>
      </div>

      <div className="topbar-right">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Buscar camisetas..."
            className="search-input"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            onKeyDown={handleBuscar}
            style={{ paddingRight: '38px' }}
          />
          <button
            className="search-icon-btn"
            aria-label="Buscar"
            onClick={() => {
              if (termino.trim() !== '') {
                navigate(`/buscar?q=${encodeURIComponent(termino)}`);
                setTermino('');
              }
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="7" stroke="#003366" strokeWidth="2" />
              <line x1="15.2929" y1="15.7071" x2="20" y2="20.4142" stroke="#003366" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {esAdmin && (
          <button className="dashboard-admin-btn" onClick={() => navigate('/admin/dashboard')}>
            🛠️ Dashboard Admin
          </button>
        )}

        <button className="topbar-btn" onClick={() => navigate('/carrito')}>
          🛒 Carrito <span className="monto-carrito">$0.00</span>
        </button>

        {usuario ? (
          <div
            className="dropdown-user"
            style={{ position: 'relative' }}
          >
            <button className="topbar-btn" onClick={() => setMostrarMenuUsuario(prev => !prev)}>👤 {nombreUsuario} ⏷</button>
            {mostrarMenuUsuario && (
              <div className="dropdown-user-menu">
                <button onClick={() => navigate('/usuario/ordenes')}>📦 Mi Perfil</button>
                <button onClick={() => navigate('/usuario/datos')}>📝 Editar Perfil</button>
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
            <button className="topbar-btn" onClick={() => navigate('/login')}>
              👤 Iniciar sesión
            </button>
            <button className="topbar-btn" onClick={() => navigate('/register')}>
              Registrarse
            </button>
          </>
        )}
      </div>
    </div>
  );
}
