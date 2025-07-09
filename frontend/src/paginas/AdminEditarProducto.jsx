// frontend/src/paginas/AdminEditarProducto.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  obtenerProductoPorId,
  editarProducto,
  obtenerCamisetas,
  obtenerGeneros,
  obtenerTallas,
} from "../servicios/apiProductos";
import "../estilos/AdminProductos.css";

export default function AdminEditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id_camiseta: "",
    id_genero: "",
    id_talla: "",
    precio: "",
    stock: "",
    activo: true,
  });
  const [camisetas, setCamisetas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    (async () => {
      setCamisetas(await obtenerCamisetas());
      setGeneros(await obtenerGeneros());
      setTallas(await obtenerTallas());
      const prod = await obtenerProductoPorId(id);
      if (prod && !prod.error) {
        setForm({
          id_camiseta: prod.id_camiseta,
          id_genero: prod.id_genero,
          id_talla: prod.id_talla,
          precio: prod.precio,
          stock: prod.stock,
          activo: prod.activo,
        });
      }
      setCargando(false);
    })();
  }, [id]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await editarProducto(id, form);
      if (res.error) return setError(res.error);
      navigate("/admin/productos");
    } catch (err) {
      setError("Error al actualizar el producto");
    }
  };

  return (
    <div className="admin-productos-bg">
      <div className="admin-productos-form-overlay">
        <h2>Editar Producto</h2>
        {cargando ? (
          <div>Cargando...</div>
        ) : (
          <form className="admin-productos-form" onSubmit={handleSubmit}>
            <label>
              Camiseta:
              <select name="id_camiseta" value={form.id_camiseta} onChange={handleChange} required>
                <option value="">Selecciona una camiseta</option>
                {camisetas.map(c => (
                  <option key={c.id_camiseta} value={c.id_camiseta}>
                    {c.descripcion_camiseta} (Equipo: {c.EQUIPO?.nombre_equipo}, Temporada: {c.TEMPORADA?.año_fin}, Tipo: {c.TIPO_CAMISETA?.descripcion_tipo})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Género:
              <select name="id_genero" value={form.id_genero} onChange={handleChange} required>
                <option value="">Selecciona un género</option>
                {generos.map(g => (
                  <option key={g.id_genero} value={g.id_genero}>{g.descripcion_genero}</option>
                ))}
              </select>
            </label>
            <label>
              Talla:
              <select name="id_talla" value={form.id_talla} onChange={handleChange} required>
                <option value="">Selecciona una talla</option>
                {tallas.map(t => (
                  <option key={t.id_talla} value={t.id_talla}>{t.descripcion_talla}</option>
                ))}
              </select>
            </label>
            <label>
              Precio:
              <input name="precio" type="number" step="0.01" min="0" value={form.precio} onChange={handleChange} required />
            </label>
            <label>
              Stock:
              <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
            </label>
            <label>
              Activo:
              <select name="activo" value={form.activo} onChange={handleChange}>
                <option value={true}>Sí</option>
                <option value={false}>No</option>
              </select>
            </label>
            {error && <div className="admin-productos-form-error">{error}</div>}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="submit" className="admin-productos-agregar-btn">Guardar Cambios</button>
              <button type="button" onClick={() => navigate("/admin/productos")} className="btn-cancelar">Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
