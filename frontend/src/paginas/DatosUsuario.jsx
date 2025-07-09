import '../estilos/EstilosAdmin.css';
import React, { useEffect, useState } from 'react';
import { estaLogueado } from '../helpers/auth';

export default function DatosUsuario() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  // Obtener el id del usuario antes de cargar los datos y para actualizar
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) {
      setCorreo(user);
      // Buscar el usuario en el backend
      fetch("http://localhost:3000/api/usuarios/buscar-por-correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: user })
      })
        .then(res => res.json())
        .then(usuario => {
          if (usuario && usuario.id) {
            setIdUsuario(usuario.id);
            setNombre(usuario.nombre || '');
          }
        });
    }
  }, []);

  const guardar = async (e) => {
    e.preventDefault();
    if (!idUsuario) {
      setMensaje('No se pudo identificar al usuario.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo })
      });
      if (!response.ok) {
        const data = await response.json();
        setMensaje(data.error || 'Error al actualizar datos.');
        return;
      }
      setMensaje('Datos actualizados correctamente.');
    } catch (err) {
      setMensaje('Error de conexión con el servidor');
    }
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
