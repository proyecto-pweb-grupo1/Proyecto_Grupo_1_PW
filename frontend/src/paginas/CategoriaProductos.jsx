import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerProductosPorCategoria } from '../servicios/apiProductos';
import { obtenerCategorias } from '../servicios/apiCategorias';
import '../estilos/CategoriaProductos.css';
import '../estilos/PaginaPrincipal.css';
import CamisetaCard from '../componentes/CamisetaCard';

const opcionesOrden = [
  { value: 'nombre_asc', label: 'Nombre: A-Z' },
  { value: 'nombre_desc', label: 'Nombre: Z-A' },
  { value: 'precio_asc', label: 'Precio: menor a mayor' },
  { value: 'precio_desc', label: 'Precio: mayor a menor' },
];

export default function CategoriaProductos() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState('nombre_asc'); // valor por defecto válido

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      setError(null);
      try {
        // Cargar productos y categorías en paralelo
        const [productosData, categoriasData] = await Promise.all([
          obtenerProductosPorCategoria(id, { orden, agrupado: 'true' }),
          obtenerCategorias()
        ]);
        setProductos(productosData);

        // Encontrar la categoría actual
        const categoriaActual = categoriasData.find(cat => String(cat.id_categoria) === String(id));
        setCategoria(categoriaActual);

      } catch (err) {
        setError(err.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id, orden]);

  return (
    <div className="contenedor-principal" style={{ padding: '2rem', display: 'flex', gap: '2rem' }}>
      <div style={{ minWidth: 220 }}>
        <h3>Ordenar por</h3>
        <select
          value={orden}
          onChange={e => setOrden(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', borderRadius: 8 }}
        >
          {opcionesOrden.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <h2>
          {categoria ? `${categoria.nombre_categoria}` : `Productos de la categoría`}
          {productos.length > 0 && <span style={{ color: '#666', fontSize: '0.9em' }}> ({productos.length} productos)</span>}
        </h2>

        {loading && <p>Cargando productos...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <div className="grid-camisetas">
          {!loading && !error && productos.length > 0 ? (
            productos.map(item => (
              <CamisetaCard
                key={item.esGrupo ? `grupo-${item.id_camiseta}` : item.id_producto}
                id={item.id_producto}
                club={item.esGrupo ? item.descripcion_camiseta : item.CAMISETum?.descripcion_camiseta}
                precio={item.precio}
                img={item.esGrupo ? item.imagen_url : item.CAMISETum?.imagen_url}
              />
            ))
          ) : (
            !loading && !error && <p>No hay productos disponibles en esta categoría.</p>
          )}
        </div>
      </div>
    </div>
  );
}
