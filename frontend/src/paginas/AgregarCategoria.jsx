import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/AgregarCategoria.css';

export default function AgregarCategoria() {
  const [nombre, setNombre] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !imagenUrl) {
      setMensaje('❌ Por favor completa todos los campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_categoria: nombre, imagen_url: imagenUrl })
      });

      if (res.ok) {
        setMensaje('✅ Categoría agregada con éxito');
        setNombre('');
        setImagenUrl('');
      } else {
        const data = await res.json();
        setMensaje(data?.error || '❌ Error al agregar categoría');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error de red al agregar');
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
