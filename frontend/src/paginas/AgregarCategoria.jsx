import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../estilos/AgregarCategoria.css';

export default function AgregarCategoria() {
  const [nombre, setNombre] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { usuario } = useContext(UserContext);
  console.log("Usuario desde contexto:", usuario);

  if (!usuario) {
    return <p>Cargando usuario...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !imagenUrl.trim()) {
      setMensaje('Por favor completa todos los campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'id_usuario': usuario.id_usuario,
          'rol': usuario.rol  
        },
        body: JSON.stringify({
          nombre_categoria: nombre.trim(),
          imagen_url: imagenUrl.trim()
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Categoría agregada con éxito');
        setNombre('');
        setImagenUrl('');
      } else {
        setMensaje(data.mensaje || 'Error al agregar categoría');
      }

    } catch (error) {
      console.error(error);
      setMensaje('Error de red al agregar');
    }
  };

  return (
    <div className="agregar-categoria-container">
      <form className="agregar-categoria-form" onSubmit={handleSubmit}>
        <h2>Agregar Nueva Categoría</h2>
        {mensaje && <div className="mensaje-categoria">{mensaje}</div>}

        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL de la imagen"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
        />

        <button type="submit">Guardar Categoría</button>
      </form>

      <button
        className="btn-volver-inicio"
        onClick={() => navigate('/admin/categorias')}
      >
        ⬅ Volver al Listado
      </button>
    </div>
  );
}
