import '../estilos/EstilosAdmin.css';
import React, { useState } from 'react';
import { estaLogueado } from '../helpers/auth';
import '../estilos/CambiarPassword.css';

export default function CambiarPassword() {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const correo = localStorage.getItem('usuario');
  // Obtener el id del usuario antes de cambiar la contraseña
  const [idUsuario, setIdUsuario] = useState(null);

  React.useEffect(() => {
    // Buscar el id del usuario por correo al montar el componente usando POST
    if (correo) {
      fetch("http://localhost:3000/api/usuarios/buscar-por-correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo })
      })
        .then(async res => {
          const data = await res.json();
          console.log('Respuesta buscar-por-correo:', data);
          if (data && data.id) setIdUsuario(data.id);
        })
        .catch(err => {
          console.error('Error en fetch buscar-por-correo:', err);
        });
    }
  }, [correo]);

  const cambiar = async (e) => {
    e.preventDefault();
    setMensaje('');
    if (nueva.length < 6 || nueva !== confirmar) {
      setMensaje('Nueva contraseña inválida o no coincide.');
      return;
    }
    if (!idUsuario) {
      setMensaje('No se pudo identificar al usuario.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/cambiar-password/${idUsuario}` , {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passwordActual: actual, nuevaPassword: nueva })
      });
      if (!response.ok) {
        const data = await response.json();
        setMensaje(data.error || 'Error al cambiar la contraseña.');
        return;
      }
      setMensaje('Contraseña actualizada correctamente.');
      setActual('');
      setNueva('');
      setConfirmar('');
    } catch (err) {
      setMensaje('Error de conexión con el servidor');
    }
  };

  if (!estaLogueado()) {
    return (
      <h2 style={{ padding: '2rem', color: 'red' }}>
        Debes iniciar sesión para ver esto.
      </h2>
    );
  }

  return (
    <div className="cambiar-container">
      <form className="cambiar-form" onSubmit={cambiar}>
        <h2>Cambiar Contraseña</h2>
        {mensaje && <p className="cambiar-mensaje">{mensaje}</p>}
        <input
          type="password"
          placeholder="Contraseña actual"
          value={actual}
          onChange={(e) => setActual(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
