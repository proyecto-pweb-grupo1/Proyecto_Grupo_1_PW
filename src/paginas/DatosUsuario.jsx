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

  if (!estaLogueado()) return <h2 style={{ padding: '2rem', color: 'red' }}>Debes iniciar sesión para ver esto.</h2>;

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Mi Perfil</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      <form onSubmit={guardar}>
        <label>Nombre:
          <input value={nombre} onChange={e => setNombre(e.target.value)} />
        </label><br/>
        <label>Correo:
          <input value={correo} disabled />
        </label><br/>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}