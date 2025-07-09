import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import "../estilos/AdminDashboard.css";

import {obtenerProductos} from "../servicios/apiProductos";
import {obtenerUsuarios} from "../servicios/apiUsuarios";
import {obtenerOrdenes} from "../servicios/apiOrdenes";

const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value || 0;
    if (start === end) return;
    let increment = end > start ? 1 : -1;
    let current = start;
    const duration = 900; // ms
    const stepTime = Math.abs(Math.floor(duration / (end - start || 1)));
    const timer = setInterval(() => {
      current += increment;
      setDisplay(current);
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        clearInterval(timer);
      }
    }, stepTime > 15 ? stepTime : 15);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}</span>;
};

export default function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [stockTotal, setStockTotal] = useState(0);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [prod, user, ord] = await Promise.all([
          obtenerProductos(),
          obtenerUsuarios(),
          obtenerOrdenes(),
        ]);
        setProductos(prod);
        setUsuarios(user);
        setOrdenes(ord);
        setStockTotal(prod.reduce((acum, p) => acum + (p.stock || 0), 0));
      } catch (err) {
      }
    }
    fetchAll();
  }, []);

  const opciones = [
    {
      nombre: "Productos",
      ruta: "/admin/productos",
      color: "#E91E63",
      descripcion: "Administra camisetas y detalles",
      fondo: "/src/assets/dashboard/bg-productos.png"
    },
    {
      nombre: "Órdenes",
      ruta: "/admin/ordenes",
      color: "#009688",
      descripcion: "Revisa y administra pedidos",
      fondo: "/src/assets/dashboard/bg-ordenes.png"
    },
    {
      nombre: "Usuarios",
      ruta: "/admin/usuarios",
      color: "#FF9800",
      descripcion: "Edita datos y permisos de usuarios",
      fondo: "/src/assets/dashboard/bg-usuarios.png"
    }
  ];

  const metricas = [
    {
      nombre: "Stock total",
      valor: stockTotal,
      icono: "/src/assets/dashboard/icon-stock.png",
      color: "#43a047"
    },
    {
      nombre: "Productos",
      valor: productos.length,
      icono: "/src/assets/dashboard/icon-productos.png",
      color: "#E91E63"
    },
    {
      nombre: "Órdenes",
      valor: ordenes.length,
      icono: "/src/assets/dashboard/icon-ordenes.png",
      color: "#009688"
    },
    {
      nombre: "Usuarios",
      valor: usuarios.length,
      icono: "/src/assets/dashboard/icon-usuarios.png",
      color: "#FF9800"
    }
  ];

  return (
    <div className="admin-dashboard-bg">

      <div className="admin-dashboard-overlay">
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="admin-dashboard-header"
        >
          <img src="/src/assets/dashboard/logo-dashboard.png" alt="Logo" className="admin-dashboard-logo" />
          <h1>Panel de Administración</h1>
          <p className="admin-dashboard-sub">Control total sobre inventario, ventas y operaciones</p>
        </motion.header>

        <motion.div
          className="admin-dashboard-metricas"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.35
              }
            }
          }}
        >
          {metricas.map((m, idx) => (
            <motion.div
              key={m.nombre}
              className="admin-dashboard-metrica-card"
              style={{ borderColor: m.color }}
              whileHover={{ scale: 1.05, boxShadow: `0 4px 16px 0 ${m.color}33` }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
            >
              <img src={m.icono} alt={m.nombre} />
              <div>
                <span style={{ color: m.color }}>
                  <AnimatedNumber value={m.valor} />
                </span>
                <p>{m.nombre}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="admin-dashboard-cards"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.13,
                delayChildren: 0.5
              }
            }
          }}
        >
          {opciones.map((op, idx) => (
            <motion.div
                key={op.nombre}
                className="admin-dashboard-card"
                whileHover={{ scale: 1.08, boxShadow: `0 4px 24px 0 ${op.color}33` }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                style={{
                backgroundImage: `url(${op.fondo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                }}
            >
                <Link to={op.ruta} className="admin-dashboard-link">
                <div className="admin-dashboard-card-content">
                    <h2 style={{ color: op.color }}>{op.nombre}</h2>
                    <p>{op.descripcion}</p>
                </div>
                </Link>
            </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
