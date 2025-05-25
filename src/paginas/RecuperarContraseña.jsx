import React, { useState } from 'react';
import '../estilos/RecuperarContraseña.css';

export default function RecuperarContraseña() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      setMensaje('');
      return;
    }
    setError('');
    setMensaje('Se ha enviado un correo para recupearar tu contraseña.');
  };

  return (
    <div className="recuperar-container">
      <form className="recuperar-form" onSubmit={handleSubmit}>
        <h2>Recuperar Contraseña</h2>
        {error && <div className="recuperar-error">{error}</div>}
        {mensaje && <div className="recuperar-mensaje">{mensaje}</div>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Enviar instrucciones</button>
        <p className="recuperar-login-link">¿Ya la recordaste? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  );
}
