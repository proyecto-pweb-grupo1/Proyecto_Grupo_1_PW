import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  obtenerProductoPorId,
  editarProducto,
  obtenerCategorias,
  obtenerEquipos,
  obtenerTallas,
  obtenerGeneros,
  obtenerMarcas,
  obtenerTiposCamiseta,
  obtenerTemporadas
} from "../servicios/apiProductos";
import "../estilos/AdminProductos.css";

export default function AdminEditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [form, setForm] = useState({
    sku: "",
    descripcion_camiseta: "",
    precio: "",
    stock: "",
    imagen_url: "",
    id_equipo: "",
    id_temporada: "",
    id_categoria: "",
    id_marca: "",
    id_tipo_camiseta: "",
    id_genero: "",
    id_talla: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tiposCamiseta, setTiposCamiseta] = useState([]);
  const [temporadas, setTemporadas] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      setCategorias(await obtenerCategorias());
      setEquipos(await obtenerEquipos());
      setTallas(await obtenerTallas());
      setGeneros(await obtenerGeneros());
      setMarcas(await obtenerMarcas());
      setTiposCamiseta(await obtenerTiposCamiseta());
      setTemporadas(await obtenerTemporadas());
    }
    cargarDatos();

    async function cargarProducto() {
      const prod = await obtenerProductoPorId(id);
      setForm({ ...prod });
    }
    cargarProducto();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prod = { ...form, precio: parseFloat(form.precio), stock: parseInt(form.stock, 10) };
    await editarProducto(id, prod);
    navigate("/admin/productos");
  };

  const opcionesSidebar = [
    { nombre: "Dashboard", ruta: "/admin/dashboard", icono: "/src/assets/dashboard/icon-dashboard.png" },
    { nombre: "Productos", ruta: "/admin/productos", icono: "/src/assets/dashboard/icon-productos.png" },
    { nombre: "Órdenes", ruta: "/admin/ordenes", icono: "/src/assets/dashboard/icon-ordenes.png" },
    { nombre: "Usuarios", ruta: "/admin/usuarios", icono: "/src/assets/dashboard/icon-usuarios.png" },
  ];

  return (
    <div className="admin-productos-bg">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="admin-dashboard-sidebar"
            initial={{ x: -220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -220, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <img src="/src/assets/dashboard/logo-dashboard.png" alt="Logo" className="sidebar-logo" />
            <nav>
              {opcionesSidebar.map((op) => (
                <a key={op.nombre} href={op.ruta} className="sidebar-link">
                  <img src={op.icono} alt={op.nombre} />
                  <span>{op.nombre}</span>
                </a>
              ))}
            </nav>
            <img src="/src/assets/dashboard/sidebar-futbol.png" className="sidebar-bg" alt="" />
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>×</button>
          </motion.aside>
        )}
      </AnimatePresence>
      {!sidebarOpen && (
        <button className="sidebar-open-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
      )}
      <div className="admin-productos-overlay">
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="admin-productos-header"
        >
          <img src="/src/assets/dashboard/logo-dashboard.png" alt="Logo" className="admin-dashboard-logo" />
          <h1>Editar Producto</h1>
          <p>Modifica los campos del producto</p>
        </motion.header>
        <motion.form
          className="admin-productos-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <div className="form-row">
            <label>SKU</label>
            <input type="text" name="sku" value={form.sku} onChange={handleChange} required />
            <label>Descripción</label>
            <input type="text" name="descripcion_camiseta" value={form.descripcion_camiseta} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Precio</label>
            <input type="number" min="0" step="0.01" name="precio" value={form.precio} onChange={handleChange} required />
            <label>Stock</label>
            <input type="number" min="0" name="stock" value={form.stock} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Imagen URL</label>
            <input type="text" name="imagen_url" value={form.imagen_url} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className="form-row">
            <label>Equipo</label>
            <select name="id_equipo" value={form.id_equipo} onChange={handleChange} required>
              <option value="">-- Seleccionar --</option>
              {equipos.map(e => <option key={e.id_equipo} value={e.id_equipo}>{e.nombre_equipo}</option>)}
            </select>
            <label>Temporada</label>
            <select name="id_temporada" value={form.id_temporada} onChange={handleChange} required>
              <option value="">-- Seleccionar --</option>
              {temporadas.map(t => <option key={t.id_temporada} value={t.id_temporada}>{t.descripcion_temporada}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>Categoría</label>
            <select name="id_categoria" value={form.id_categoria} onChange={handleChange} required>
              <option value="">-- Seleccionar --</option>
              {categorias.map(c => <option key={c.id_categoria} value={c.id_categoria}>{c.nombre_categoria}</option>)}
            </select>
            <label>Marca</label>
            <select name="id_marca" value={form.id_marca} onChange={handleChange} required>
              <option value="">-- Seleccionar --</option>
              {marcas.map(m => <option key={m.id_marca} value={m.id_marca}>{m.nombre_marca}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>Tipo Camiseta</label>
            <select name="id_tipo_camiseta" value={form.id_tipo_camiseta} onChange={handleChange} required>
              <option value="">-- Seleccionar --</option>
              {tiposCamiseta.map(t => <option key={t.id_tipo_camiseta} value={t.id_tipo_camiseta}>{t.descripcion_tipo}</option>)}
            </select>
            <label>Género</label>
            <select name="id_genero" value={form.id_genero} onChange={handleChange} required>
              <option value="">-- Seleccionar --</option>
              {generos.map(g => <option key={g.id_genero} value={g.id_genero}>{g.descripcion_genero}</option>)}
            </select>
            <label>Talla</label>
            <select name="id_talla" value={form.id_talla} onChange={handleChange} required>
              <option value="">-- Seleccionar --</option>
              {tallas.map(t => <option key={t.id_talla} value={t.id_talla}>{t.descripcion_talla}</option>)}
            </select>
          </div>
          <button className="admin-productos-guardar-btn" type="submit">
            <img src="/src/assets/dashboard/icon-editar.png" alt="" /> Guardar Cambios
          </button>
        </motion.form>
      </div>
    </div>
  );
}
