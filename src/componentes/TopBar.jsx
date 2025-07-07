import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { obtenerCategorias } from '../servicios/apiProductos';
import '../estilos/TopBar.css';

export default function TopBar() {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(UserContext);

  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const [termino, setTermino] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catError, setCatError] = useState(null);

  const esAdmin = usuario?.toLowerCase().includes('admin');

  useEffect(() => {
    setCatLoading(true);
    setCatError(null);
    obtenerCategorias()
      .then(data => setCategorias(data.slice(0, 3))) // Solo las 3 primeras
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
            <div className="dropdown-menu" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {catLoading && <p style={{padding:'1rem'}}>Cargando...</p>}
              {catError && <p style={{color:'red',padding:'1rem'}}>Error: {catError}</p>}
              {!catLoading && !catError && categorias.length > 0 ? (
                categorias.map(cat => (
                  <button key={cat.id} style={{ width: '100%', textAlign: 'left' }} onClick={() => navigate(`/categoria/${cat.id}`)}>
                    {cat.nombre}
                  </button>
                ))
              ) : (!catLoading && !catError && <p style={{padding:'1rem'}}>No hay categorías</p>)}
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
