import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError('');
    localStorage.setItem('usuario', email); // Guardar usuario simulado
    navigate('/'); // Redirigir a principal
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <div className="login-error">{error}</div>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
        <p className="login-register-link">¿No tienes cuenta? <a href="/register">Regístrate</a></p>
        <p className="login-recuperar-link"><a href="/recuperar">¿Olvidaste tu contraseña?</a></p>
      </form>
    </div>
  );
}
