import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerProductos } from '../servicios/apiProductos';
import '../estilos/PaginaPrincipal.css';
import CamisetaCard from '../componentes/CamisetaCard';

const opcionesOrden = [
  { value: '', label: 'Sin orden' },
  { value: 'precio_desc', label: 'Precio: mayor a menor' },
  { value: 'precio_asc', label: 'Precio: menor a mayor' },
  { value: 'nombre_asc', label: 'Nombre: A-Z' },
  { value: 'nombre_desc', label: 'Nombre: Z-A' },
];

export default function CategoriaProductos() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    obtenerProductos()
      .then(data => setProductos(data.filter(p => String(p.categoriaId) === String(id))))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function ordenarProductos(lista, orden) {
    if (orden === 'precio_desc') return [...lista].sort((a, b) => b.precio - a.precio);
    if (orden === 'precio_asc') return [...lista].sort((a, b) => a.precio - b.precio);
    if (orden === 'nombre_asc') return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (orden === 'nombre_desc') return [...lista].sort((a, b) => b.nombre.localeCompare(a.nombre));
    return lista;
  }

  const productosOrdenados = ordenarProductos(productos, orden);

  return (
    <div className="contenedor-principal" style={{ padding: '2rem', display: 'flex', gap: '2rem' }}>
      <div style={{ minWidth: 220 }}>
        <h3>Ordenar por</h3>
        <select value={orden} onChange={e => setOrden(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 8 }}>
          {opcionesOrden.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Productos de la categoría</h2>
        {loading && <p>Cargando productos...</p>}
        {error && <p style={{color:'red'}}>Error: {error}</p>}
        <div className="grid-camisetas">
          {!loading && !error && productosOrdenados.length > 0 ? (
            productosOrdenados.map((item) => (
              <CamisetaCard
                key={item.id}
                id={item.id}
                club={item.nombre}
                precio={item.precio}
                img={item.imagen_url}
              />
            ))
          ) : (!loading && !error && <p>No hay productos en esta categoría.</p>)}
        </div>
      </div>
    </div>
  );
}
