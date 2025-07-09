import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../estilos/ResultadosBusqueda.css';
import CamisetaCard from '../componentes/CamisetaCard';
import { obtenerProductos } from '../servicios/apiProductos';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResultadosBusqueda() {
  const query = useQuery();
  const termino = query.get('q')?.toLowerCase() || '';
  const [productos, setProductos] = useState([]);
  const [orden, setOrden] = useState('nombre');

  useEffect(() => {
    const buscar = async () => {
      const data = await obtenerProductos();
      const filtrados = data.filter(p => {
        const texto = `${p.CAMISETum?.descripcion_camiseta} ${p.CAMISETum?.MARCA?.nombre_marca}`.toLowerCase();
        return texto.includes(termino) && p.activo;
      });

      const ordenados = [...filtrados].sort((a, b) => {
        if (orden === 'precio') return parseFloat(a.precio) - parseFloat(b.precio);
        return (a.CAMISETum?.descripcion_camiseta || '').localeCompare(b.CAMISETum?.descripcion_camiseta || '');
      });

      setProductos(ordenados);
    };

    buscar();
  }, [termino, orden]);

  return (
    <div className="resultados-container">
      <h2>Resultados para: "{termino}"</h2>

      <div className="filtros-busqueda">
        <label>Ordenar por:</label>
        <select value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="precio">Precio</option>
        </select>
      </div>

      {productos.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className="grid-camisetas">
          {productos.map((item) => (
            <CamisetaCard
              key={item.id_producto}
              id={item.id_producto}
              club={item.CAMISETum?.descripcion_camiseta}
              precio={item.precio}
              img={item.CAMISETum?.imagen_url}
            />
          ))}
        </div>
      )}
    </div>
  );
}
