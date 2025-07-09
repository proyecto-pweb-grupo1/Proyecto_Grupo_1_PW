// src/paginas/AdminProductos.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  obtenerProductos,
  eliminarProducto,
} from "../servicios/apiProductos";
import "../estilos/AdminProductos.css";

export default function AdminProductos() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 50;

  useEffect(() => {
    cargarProductos();
    // eslint-disable-next-line
  }, []);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const res = await obtenerProductos();
      setProductos(Array.isArray(res) ? res : []);
    } catch (e) {
      setProductos([]);
    }
    setCargando(false);
  };

  const handleEliminar = async (idProducto) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        await eliminarProducto(idProducto);
        await cargarProductos();
      } catch (e) {
        alert(e.message || "No se pudo eliminar");
      }
    }
  };

  // Adaptación para búsqueda real usando campos de producto + camiseta relacionada
  const productosFiltrados = productos.filter((p) => {
    // p.CAMISETA puede estar como p.CAMISETA o p.camiseta, depende del backend. Usar ambos:
    const camiseta = p.CAMISETA || p.camiseta || {};
    return (
      (p.sku && p.sku.toLowerCase().includes(busqueda.toLowerCase())) ||
      (camiseta.descripcion_camiseta &&
        camiseta.descripcion_camiseta.toLowerCase().includes(busqueda.toLowerCase())) ||
      (p.id_producto + "").includes(busqueda)
    );
  });

  const totalPaginas = Math.ceil(productosFiltrados.length / itemsPorPagina);

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

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
                <Link key={op.nombre} to={op.ruta} className="sidebar-link">
                  <img src={op.icono} alt={op.nombre} />
                  <span>{op.nombre}</span>
                </Link>
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
          transition={{ duration: 0.8, type: "spring" }}
          className="admin-productos-header"
        >
          <h1>Gestión de Productos</h1>
          <p>Administra camisetas, stock, tallas y más</p>
        </motion.header>
        <div className="admin-productos-bar">
          <input
            type="text"
            className="admin-productos-buscar"
            placeholder="Buscar producto, SKU o ID..."
            value={busqueda}
            onChange={e => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
          />
          <Link to="/admin/productos/agregar" className="admin-productos-agregar-btn">
            <img src="/src/assets/dashboard/icon-agregar.png" alt="Agregar" />
            Agregar Producto
          </Link>
        </div>
        <motion.div
          className="admin-productos-lista"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: { opacity: 1, y: 0, transition: { staggerChildren: 0.10, delayChildren: 0.1 } }
          }}
        >
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>SKU</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={8}><span className="cargando">Cargando...</span></td>
                </tr>
              ) : productosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8}><span className="no-productos">No hay productos</span></td>
                </tr>
              ) : (
                productosPaginados.map((p) => {
                  const camiseta = p.CAMISETA || p.camiseta || {};
                  // Si imagen_url viene desde la camiseta relacionada:
                  const imgUrl = camiseta.imagen_url || "/src/assets/dashboard/icon-productos.png";
                  return (
                    <motion.tr key={p.id_producto} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                      <td>{p.id_producto}</td>
                      <td>
                        <img
                          src={imgUrl}
                          alt="Camiseta"
                          className="producto-imagen-mini"
                        />
                      </td>
                      <td>{p.sku}</td>
                      <td>{camiseta.descripcion_camiseta}</td>
                      <td>S/ {Number(p.precio).toFixed(2)}</td>
                      <td>{p.stock}</td>
                      <td>
                        <Link to={`/admin/productos/editar/${p.id_producto}`} className="btn-editar">
                          <img src="/src/assets/dashboard/icon-editar.png" alt="Editar" />
                          Editar
                        </Link>
                      </td>
                      <td>
                        <button className="btn-eliminar" onClick={() => handleEliminar(p.id_producto)}>
                          <img src="/src/assets/dashboard/icon-eliminar.jpg" alt="Eliminar" />
                          Eliminar
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem", gap: "10px" }}>
            <button
              onClick={() => setPaginaActual(p => Math.max(p - 1, 1))}
              disabled={paginaActual === 1}
              style={{ padding: "7px 18px", borderRadius: "7px", border: "1px solid #bbb", background: "#f3f3f3", cursor: paginaActual === 1 ? "not-allowed" : "pointer" }}
            >
              {"<"} Anterior
            </button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button
              onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              style={{ padding: "7px 18px", borderRadius: "7px", border: "1px solid #bbb", background: "#f3f3f3", cursor: paginaActual === totalPaginas ? "not-allowed" : "pointer" }}
            >
              Siguiente {">"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
