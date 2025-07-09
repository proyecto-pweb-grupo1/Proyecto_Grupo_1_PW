// AgregarCategoria.jsx
import React, { useState } from 'react';
import '../estilos/AdminCategorias.css';

export default function AgregarCategoria() {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [mensaje, setMensaje] = useState('');

  const guardarCategoria = async () => {
    if (!nombre || !imagen) {
      setMensaje('Completa todos los campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_categoria: nombre,
          imagen_url: imagen
        })
      });

      if (!res.ok) throw new Error('No se pudo guardar');

      setMensaje('Categoría registrada correctamente');
      setNombre('');
      setImagen('');
    } catch (err) {
      setMensaje('Error al guardar categoría');
    }
  };

  return (
    <div className="admin-cat-container">
      <h2>Agregar Nueva Categoría</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input type="text" placeholder="URL de imagen" value={imagen} onChange={e => setImagen(e.target.value)} />
      <button onClick={guardarCategoria}>Guardar</button>
    </div>
  );
}
