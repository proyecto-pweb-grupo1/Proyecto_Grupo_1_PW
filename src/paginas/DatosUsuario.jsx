import '../estilos/EstilosAdmin.css';
import React, { useEffect, useState } from 'react';
import { estaLogueado } from '../helpers/auth';

export default function DatosUsuario() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) {
      setCorreo(user);
      const datos = JSON.parse(localStorage.getItem(`perfil-${user}`)) || {};
      setNombre(datos.nombre || '');
    }
  }, []);

  const guardar = (e) => {
    e.preventDefault();
    localStorage.setItem(`perfil-${correo}`, JSON.stringify({ nombre }));
    setMensaje('Datos actualizados correctamente.');
  };

  if (!estaLogueado()) {
    return <h2 style={{ padding: '2rem', color: 'red' }}>Debes iniciar sesión para ver esto.</h2>;
  }

  return (
    <div className="user-container">
      <h2>Mi Perfil</h2>
      {mensaje && <p className="success-message">{mensaje}</p>}
      <form onSubmit={guardar}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />

        <label htmlFor="correo">Correo:</label>
        <input
          id="correo"
          value={correo}
          disabled
        />

        <button type="submit" className="btn">Guardar Cambios</button>
      </form>
    </div>
  );
}
