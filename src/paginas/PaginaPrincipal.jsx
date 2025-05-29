import React, {useContext} from 'react';
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';
import '../estilos/PaginaPrincipal.css';
import CamisetaCard from '../componentes/CamisetaCard';
import CategoriaCard from '../componentes/CategoriaCard';
import camisetas from '../data/camisetas';
import categorias from '../data/categorias';
import {CarritoContexto} from "../context/CarritoContexto";



export default function Home() {

    const { listaProductos, setLista } = useContext(CarritoContexto);

    function addCarrito(productoAdd){
        const existe = listaProductos.find(producto => producto.club === productoAdd.club);
        if(existe){
            const proToAdd = listaProductos.map(producto => producto.club === productoAdd.club ? {...producto, cantidad: producto.cantidad + 1} : producto);
            setLista(proToAdd);
        }else{
            setLista([...listaProductos, {...productoAdd, cantidad: 1}]);
        }
    }

  return (
    <>
      <div
        className="contenedor-principal"
        style={{
          backgroundImage: `url(${fondoEstadio})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem'
        }}
      >
        
        <section className="explora-categorias">
          <h2 className="titulo-explorar-categoria">Explora las categorías</h2>
          <div className="categorias-grid">
           {categorias.map((cat, index) => (
            <CategoriaCard
              key={index}
              nombre={cat.nombre}
              imagen={cat.imagen}
              ruta={cat.ruta}
            />
            ))}
          </div>
        </section>

        <h2 className="titulo-seccion">Lo más vendido</h2>
        <div className="grid-camisetas">
          {camisetas.map((item, index) => (
            <CamisetaCard
              key={index}
              club={item.club}
              precio={item.precio}
              img={item.img}
              agregar={addCarrito}
            />
          ))}
        </div>
      </div>
    </>
  );
}
