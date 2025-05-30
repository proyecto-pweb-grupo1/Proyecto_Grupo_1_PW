import React, { useState } from 'react';
import { estaLogueado } from '../helpers/auth';
import usuarios from '../data/usuarios';
import '../estilos/CambiarPassword.css';

export default function CambiarPassword() {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const correo = localStorage.getItem('usuario');

  const cambiar = (e) => {
    e.preventDefault();

    let guardada = localStorage.getItem(`password-${correo}`);
    if (guardada) {
      guardada = JSON.parse(guardada);
    } else {
      const usuario = usuarios.find(u => u.email === correo);
      guardada = usuario?.password || '';
    }

    if (actual !== guardada) {
      setMensaje('Contraseña actual incorrecta.');
      return;
    }

    if (nueva.length < 6 || nueva !== confirmar) {
      setMensaje('Nueva contraseña inválida o no coincide.');
      return;
    }

    localStorage.setItem(`password-${correo}`, JSON.stringify(nueva));
    setMensaje('Contraseña actualizada correctamente.');
    setActual('');
    setNueva('');
    setConfirmar('');
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
