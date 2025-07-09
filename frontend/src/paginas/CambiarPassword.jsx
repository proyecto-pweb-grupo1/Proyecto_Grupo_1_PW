import '../estilos/EstilosAdmin.css';
import React, { useState } from 'react';
import { estaLogueado } from '../helpers/auth';
import '../estilos/CambiarPassword.css';

export default function CambiarPassword() {
  const { usuario } = useContext(UserContext);
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);

  // Validar que el usuario esté presente
  useEffect(() => {
    setLoading(false);
  }, []);

  const cambiar = async (e) => {
    e.preventDefault();

    if (!usuario || !usuario.id_usuario) {
      setMensaje('Usuario no autenticado');
      return;
    }

    if (!nueva || !confirmar) {
      setMensaje('Completa ambos campos');
      return;
    }

    if (nueva !== confirmar) {
      setMensaje('❌ Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id_usuario}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nuevaPassword: nueva })
      });

      if (res.ok) {
        setMensaje('✅ Contraseña actualizada exitosamente');
        setNueva('');
        setConfirmar('');
      } else {
        const data = await res.json();
        setMensaje(data?.error || '❌ Error al actualizar');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  if (loading) {
    return <div className="cambiar-container"><p className="cambiar-mensaje">Cargando usuario...</p></div>;
  }

  return (
    <div className="cambiar-container">
      <form onSubmit={cambiar} className="cambiar-form">
        <h2>Cambiar Contraseña</h2>
        {mensaje && <div className="cambiar-mensaje">{mensaje}</div>}
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
