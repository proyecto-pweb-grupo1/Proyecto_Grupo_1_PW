import React, { useState } from 'react';
import { estaLogueado } from '../helpers/auth';

export default function CambiarPassword() {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const correo = localStorage.getItem('usuario');

  const cambiar = (e) => {
    e.preventDefault();
    const guardada = JSON.parse(localStorage.getItem(`password-${correo}`)) || '123';
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
    setActual(''); setNueva(''); setConfirmar('');
  };

  if (!estaLogueado()) return <h2 style={{ color: 'red' }}>Debes iniciar sesión.</h2>;

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={cambiar}>
        <input type="password" placeholder="Actual" value={actual} onChange={e => setActual(e.target.value)} /><br/>
        <input type="password" placeholder="Nueva" value={nueva} onChange={e => setNueva(e.target.value)} /><br/>
        <input type="password" placeholder="Confirmar" value={confirmar} onChange={e => setConfirmar(e.target.value)} /><br/>
        <button type="submit">Actualizar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}