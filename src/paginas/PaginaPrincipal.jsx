import React from 'react'
import fondoEstadio from '../assets/imagenes/fondoprincipal.png'

export default function Home() {
  const camisetas = [
    { club: 'Universitario', precio: 80, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Logo_oficial_de_Universitario.png/500px-Logo_oficial_de_Universitario.png' },
    { club: 'Barcelona', precio: 90, img: 'https://www.shutterstock.com/image-vector/barcelona-fc-cup-icon-logo-600nw-2267672941.jpg' },
    { club: 'Alianza Lima', precio: 75, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Escudo_Alianza_Lima.svg/800px-Escudo_Alianza_Lima.svg.png' },
    { club: 'Real Madrid', precio: 95, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png' }
  ]

  return (
      <div
        style={{
          padding: '1rem',
          backgroundImage: `url(${fondoEstadio})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          color: 'white'
        }}
      >
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#121212',
        padding: '1rem 2rem',
        borderBottom: '1px solid #222'
      }}>
        <h1>⚽ proyecto_grupo_1_pw</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input placeholder="Buscar camisetas..." style={{ padding: '0.5rem' }} />
          <button>🛒</button>
          <button>👤 Iniciar sesión</button>
        </div>
      </header>

      <section style={{ textAlign: 'center', margin: '2rem 0' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>BIENVENIDO A LA TIENDA DE CAMISETAS</h2>
        <img src="https://www.entrebolas.pe/wp-content/uploads/2023/12/cu_1.jpg" alt="Camiseta destacada" style={{ maxWidth: '250px' }} />
      </section>

      <section style={{ padding: '1rem 2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Más vendidas del mes</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          {camisetas.map((cam, idx) => (
            <div key={idx} style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '8px' }}>
              <img src={cam.img} alt={cam.club} />
              <p style={{ margin: '0.5rem 0 0' }}><strong>{cam.club}</strong></p>
              <p style={{ margin: 0 }}>${cam.precio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
