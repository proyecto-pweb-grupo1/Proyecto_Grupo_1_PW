import React, { useState } from 'react';
import { esAdmin } from '../helpers/auth';
import '../estilos/AdminCategorias.css';

export default function AgregarCategoria() {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [mensaje, setMensaje] = useState('');

  const guardarCategoria = () => {
    if (!nombre || !imagen) return;
    const nuevas = JSON.parse(localStorage.getItem("categorias_agregadas")) || [];
    nuevas.push({ nombre, imagen });
    localStorage.setItem("categorias_agregadas", JSON.stringify(nuevas));
    setMensaje("Categoría registrada correctamente.");
    setNombre('');
    setImagen('');
  };

  if (!esAdmin()) {
    return <h2 style={{ color: 'red', padding: '2rem' }}>Acceso denegado. Solo para administradores.</h2>;
  }

  return (
    <div className="admin-cat-container">
      <h2>Agregar Nueva Categoría</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input type="text" placeholder="URL de imagen" value={imagen} onChange={e => setImagen(e.target.value)} />
      <button onClick={guardarCategoria}>Guardar</button>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}