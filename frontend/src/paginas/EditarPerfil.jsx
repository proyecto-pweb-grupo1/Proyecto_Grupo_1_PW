import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import '../estilos/EditarPerfil.css';

export default function DatosUsuario() {
  const { usuario } = useContext(UserContext);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (usuario?.id_usuario) {
      fetch(`http://localhost:3000/api/usuario/${usuario.id_usuario}`, {
        headers: {
          'Content-Type': 'application/json',
          'id_usuario': usuario.id_usuario
        }
      })
        .then(res => res.json())
        .then(data => {
          setNombre(data.nombre);
          setApellido(data.apellido);
          setCorreo(data.correo);
        });
    }
  }, [usuario]);

  const guardar = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/usuario/${usuario.id_usuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'id_usuario': usuario.id_usuario  
      },
      body: JSON.stringify({ nombre, apellido, correo })
    });

    if (res.ok) setMensaje('Datos actualizados correctamente');
    else setMensaje('Error al actualizar');
  };

  return (
    <div className="perfil-container">
      <form onSubmit={guardar} className="perfil-form">
        <h2>Editar Perfil</h2>
        {mensaje && <div className="perfil-mensaje">{mensaje}</div>}

        <label>Nombre:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label>Apellido:</label>
        <input value={apellido} onChange={(e) => setApellido(e.target.value)} />

        <label>Correo:</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}
