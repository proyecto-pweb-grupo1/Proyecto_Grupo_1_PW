// DatosUsuario.jsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function DatosUsuario() {
  const { usuario } = useContext(UserContext);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (usuario?.id_usuario) {
      fetch(`http://localhost:3000/api/usuarios/${usuario.id_usuario}`)
        .then(res => res.json())
        .then(data => {
          setNombre(data.nombre);
          setCorreo(data.correo);
        });
    }
  }, [usuario]);

  const guardar = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id_usuario}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo })
    });
    if (res.ok) setMensaje('Datos actualizados');
    else setMensaje('Error al actualizar');
  };

  return (
    <div className="user-container">
      <h2>Mi Perfil</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={guardar}>
        <label>Nombre:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <label>Correo:</label>
        <input value={correo} disabled />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
