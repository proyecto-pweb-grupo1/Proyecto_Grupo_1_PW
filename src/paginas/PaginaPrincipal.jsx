import React from 'react';
import fondoEstadio from '../assets/imagenes/fondoprincipal.png';
import '../estilos/PaginaPrincipal.css';
import CamisetaCard from '../componentes/CamisetaCard';

export default function Home() {
  const camisetas = [
  {
    club: 'Universitario',
    precio: 80,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Logo_oficial_de_Universitario.png/500px-Logo_oficial_de_Universitario.png'
  },
  {
    club: 'Barcelona',
    precio: 90,
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png'
  },
  {
    club: 'Alianza Lima',
    precio: 75,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Escudo_Alianza_Lima.svg/800px-Escudo_Alianza_Lima.svg.png'
  },
  {
    club: 'Real Madrid',
    precio: 95,
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png'
  },
  {
    club: 'Liverpool',
    precio: 85,
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png'
  },
  {
    club: 'Manchester City',
    precio: 88,
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png'
  },
  {
    club: 'Manchester United',
    precio: 87,
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png'
  },
  {
    club: 'PSG',
    precio: 92,
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png'
  }
];


  return (
  <>
    
    <div
      className="contenedor-principal"
      style={{ backgroundImage: `url(${fondoEstadio})` }}
    >
      <h1 className="titulo-pagina">
        Bienvenido a la Tienda Oficial de Camisetas
      </h1>
      <div className="grid-camisetas">
        {camisetas.map((item, index) => (
          <CamisetaCard
            key={index}
            club={item.club}
            precio={item.precio}
            img={item.img}
          />
        ))}
      </div>
    </div>
  </>
);
}