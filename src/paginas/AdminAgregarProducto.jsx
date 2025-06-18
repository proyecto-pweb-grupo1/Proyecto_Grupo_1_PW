import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import {
  crearProducto,
  obtenerEquipos,
  obtenerTallas,
  obtenerGeneros,
  obtenerMarcas,
  obtenerTiposCamiseta,
  obtenerTemporadas,
  crearEquipo,
  crearMarca,
  crearTemporada,
  obtenerPaises,
  obtenerRegiones,
  obtenerTipoClubs,
  crearEquipoRegion
} from "../servicios/apiProductos";
import "../estilos/AdminProductos.css";

const toSku = (texto) =>
  texto
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toUpperCase();

const defaultCategoria = 1;

export default function AdminAgregarProducto() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    precio: "",
    stock: "",
    imagen_url: "",
    id_equipo: "",
    id_temporada: "",
    id_marca: "",
    id_tipo_camiseta: "",
    id_genero: "",
    id_talla: ""
  });

  const [equipos, setEquipos] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tiposCamiseta, setTiposCamiseta] = useState([]);
  const [temporadas, setTemporadas] = useState([]);

  const [modalEquipoOpen, setModalEquipoOpen] = useState(false);
  const [modalMarcaOpen, setModalMarcaOpen] = useState(false);

  const [nuevoEquipo, setNuevoEquipo] = useState({
    nombre_equipo: "",
    id_pais: "",
    id_tipo_club: ""
  });
  const [paises, setPaises] = useState([]);
  const [tipoClubs, setTipoClubs] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [mensajeEquipo, setMensajeEquipo] = useState("");

  const [nuevaMarca, setNuevaMarca] = useState({ nombre_marca: "" });
  const [mensajeMarca, setMensajeMarca] = useState("");

  const [customTemporada, setCustomTemporada] = useState({ inicio: "", fin: "" });
  const [mensajeTemporada, setMensajeTemporada] = useState("");

  useEffect(() => {
    (async () => {
      setEquipos(await obtenerEquipos());
      setTallas(await obtenerTallas());
      setGeneros(await obtenerGeneros());
      setMarcas(await obtenerMarcas());
      setTiposCamiseta(await obtenerTiposCamiseta());
      setTemporadas(await obtenerTemporadas());
      setPaises(await obtenerPaises());
      setTipoClubs(await obtenerTipoClubs());
      setRegiones(await obtenerRegiones());
    })();
  }, []);

  const handleSelectEquipo = (option) => {
    if (option?.value === "__nuevo__") setModalEquipoOpen(true);
    else setForm((f) => ({ ...f, id_equipo: option?.value || "" }));
  };

  const handleSelectMarca = (option) => {
    if (option?.value === "__nuevo__") setModalMarcaOpen(true);
    else setForm((f) => ({ ...f, id_marca: option?.value || "" }));
  };

  const handleCrearEquipo = async (e) => {
    e.preventDefault();
    setMensajeEquipo("");
    const existe = equipos.find(eq => eq.nombre_equipo.trim().toLowerCase() === nuevoEquipo.nombre_equipo.trim().toLowerCase());
    if (existe) return setMensajeEquipo("Ese equipo ya existe.");
    if (!nuevoEquipo.nombre_equipo || !nuevoEquipo.id_pais || !nuevoEquipo.id_tipo_club)
      return setMensajeEquipo("Completa todos los campos.");
    const eq = await crearEquipo(nuevoEquipo);
    const pais = paises.find(p => p.id_pais === nuevoEquipo.id_pais);
    if (pais) {
      for (const regionId of pais.regiones) {
        await crearEquipoRegion({ id_equipo: eq.id_equipo, id_region: regionId });
      }
      if (parseInt(nuevoEquipo.id_pais) === 1 && !pais.regiones.includes(2)) {
        await crearEquipoRegion({ id_equipo: eq.id_equipo, id_region: 2 }); // Sudamérica
      }
    }
    setEquipos(await obtenerEquipos());
    setForm((f) => ({ ...f, id_equipo: eq.id_equipo }));
    setNuevoEquipo({ nombre_equipo: "", id_pais: "", id_tipo_club: "" });
    setModalEquipoOpen(false);
  };

  const handleCrearMarca = async (e) => {
    e.preventDefault();
    setMensajeMarca("");
    const existe = marcas.find(m => m.nombre_marca.trim().toLowerCase() === nuevaMarca.nombre_marca.trim().toLowerCase());
    if (existe) return setMensajeMarca("Esa marca ya existe.");
    if (!nuevaMarca.nombre_marca) return setMensajeMarca("Escribe el nombre.");
    const mk = await crearMarca(nuevaMarca);
    setMarcas(await obtenerMarcas());
    setForm((f) => ({ ...f, id_marca: mk.id_marca }));
    setNuevaMarca({ nombre_marca: "" });
    setModalMarcaOpen(false);
  };

  const handleCustomTemporada = async (e) => {
    e.preventDefault();
    setMensajeTemporada("");
    if (!customTemporada.inicio.match(/^\d{2,4}$/))
      return setMensajeTemporada("Año inicio debe ser 2 o 4 dígitos");
    const desc = customTemporada.fin
      ? `${customTemporada.inicio}/${customTemporada.fin}`
      : `${customTemporada.inicio}`;
    let temp = temporadas.find(t => t.descripcion_temporada === desc);
    if (!temp) temp = await crearTemporada({
      descripcion_temporada: desc,
      año_inicio: parseInt(customTemporada.inicio),
      año_fin: customTemporada.fin ? parseInt(customTemporada.fin) : null
    });
    setTemporadas(await obtenerTemporadas());
    setForm((f) => ({ ...f, id_temporada: temp.id_temporada }));
    setCustomTemporada({ inicio: "", fin: "" });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const equipoNombre = equipos.find(e => e.id_equipo == form.id_equipo)?.nombre_equipo || "";
  const temporadaDesc = temporadas.find(t => t.id_temporada == form.id_temporada)?.descripcion_temporada || "";
  const tipoCamisetaText = tiposCamiseta.find(t => t.id_tipo_camiseta == form.id_tipo_camiseta)?.descripcion_tipo || "";
  const tallaText = tallas.find(t => t.id_talla == form.id_talla)?.descripcion_talla || "";
  const descCamiseta = equipoNombre && temporadaDesc ? `${equipoNombre} ${temporadaDesc}` : "";
  const skuGen = toSku(`${equipoNombre}_${temporadaDesc}_${tipoCamisetaText}_${tallaText}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const camisetaBody = {
      id_equipo: form.id_equipo,
      id_temporada: form.id_temporada,
      id_categoria: defaultCategoria,
      id_marca: form.id_marca,
      id_tipo_camiseta: form.id_tipo_camiseta,
      descripcion_camiseta: descCamiseta,
      imagen_url: form.imagen_url
    };
    let camiseta = await fetch("/api/camisetas/buscar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(camisetaBody)
    }).then(res => res.json());
    if (!camiseta?.id_camiseta) {
      camiseta = await fetch("/api/camisetas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(camisetaBody)
      }).then(res => res.json());
    }
    await crearProducto({
      id_camiseta: camiseta.id_camiseta,
      id_genero: form.id_genero,
      id_talla: form.id_talla,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock, 10),
      sku: skuGen
    });
    navigate("/admin/productos");
  };

  return (
    <div className="admin-productos-bg">
      <div className="admin-productos-overlay">
        <motion.form
          className="admin-productos-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <h1>Agregar Producto</h1>
          <p>Completa todos los campos para crear una camiseta</p>
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
            <Select
              options={[
                ...equipos.map(e => ({ value: e.id_equipo, label: e.nombre_equipo })),
                { value: "__nuevo__", label: "+ Crear nuevo equipo" }
              ]}
              value={equipos.some(e => e.id_equipo == form.id_equipo)
                ? { value: form.id_equipo, label: equipos.find(e => e.id_equipo == form.id_equipo)?.nombre_equipo }
                : null}
              onChange={handleSelectEquipo}
              isSearchable
              placeholder="Buscar equipo..."
              className="select-buscador"
            />
            <label>Temporada</label>
            <div style={{ display: "flex", gap: 8 }}>
              <Select
                options={temporadas.map(t => ({
                  value: t.id_temporada, label: t.descripcion_temporada
                }))}
                value={temporadas.some(t => t.id_temporada == form.id_temporada)
                  ? { value: form.id_temporada, label: temporadas.find(t => t.id_temporada == form.id_temporada)?.descripcion_temporada }
                  : null}
                onChange={o => setForm(f => ({ ...f, id_temporada: o?.value || "" }))}
                isSearchable
                placeholder="Buscar temporada..."
                className="select-buscador"
              />
              <form onSubmit={handleCustomTemporada} style={{ display: "flex", gap: 4 }}>
                <input
                  type="text"
                  value={customTemporada.inicio}
                  maxLength={4}
                  style={{ width: 45 }}
                  onChange={e => setCustomTemporada({ ...customTemporada, inicio: e.target.value.replace(/\D/, "") })}
                  placeholder="Año inicio"
                  required
                />
                <span>/</span>
                <input
                  type="text"
                  value={customTemporada.fin}
                  maxLength={2}
                  style={{ width: 32 }}
                  onChange={e => setCustomTemporada({ ...customTemporada, fin: e.target.value.replace(/\D/, "") })}
                  placeholder="Fin"
                />
                <button type="submit" style={{ padding: "0 8px" }}>+</button>
              </form>
              {mensajeTemporada && <span className="form-error">{mensajeTemporada}</span>}
            </div>
          </div>
          <div className="form-row">
            <label>Marca</label>
            <Select
              options={[
                ...marcas.map(m => ({ value: m.id_marca, label: m.nombre_marca })),
                { value: "__nuevo__", label: "+ Crear nueva marca" }
              ]}
              value={marcas.some(m => m.id_marca == form.id_marca)
                ? { value: form.id_marca, label: marcas.find(m => m.id_marca == form.id_marca)?.nombre_marca }
                : null}
              onChange={handleSelectMarca}
              isSearchable
              placeholder="Buscar marca..."
              className="select-buscador"
            />
          </div>
          <div className="form-row tres-cols">
            <div className="input-group">
              <label>Tipo Camiseta</label>
              <select name="id_tipo_camiseta" value={form.id_tipo_camiseta} onChange={handleChange} required>
                <option value="">-- Seleccionar --</option>
                {tiposCamiseta.map(t => <option key={t.id_tipo_camiseta} value={t.id_tipo_camiseta}>{t.descripcion_tipo}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Género</label>
              <select name="id_genero" value={form.id_genero} onChange={handleChange} required>
                <option value="">-- Seleccionar --</option>
                {generos.map(g => <option key={g.id_genero} value={g.id_genero}>{g.descripcion_genero}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Talla</label>
              <select name="id_talla" value={form.id_talla} onChange={handleChange} required>
                <option value="">-- Seleccionar --</option>
                {tallas.map(t => <option key={t.id_talla} value={t.id_talla}>{t.descripcion_talla}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <label>Descripción</label>
            <input type="text" value={descCamiseta} readOnly style={{ background: "#f4f4fa" }} />
            <label>SKU</label>
            <input type="text" value={skuGen} readOnly style={{ background: "#f4f4fa" }} />
          </div>
          <div className="form-row" style={{ justifyContent: "space-between" }}>
            <button
              type="button"
              className="admin-productos-guardar-btn"
              style={{ background: "#bbb", color: "#222" }}
              onClick={() => navigate("/admin/productos")}
            >
              Cancelar
            </button>
            <button className="admin-productos-guardar-btn" type="submit">
              <img src="/src/assets/dashboard/icon-agregar.png" alt="" /> Guardar Producto
            </button>
          </div>
        </motion.form>

        <AnimatePresence>
          {modalEquipoOpen && (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="modal-centro" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}>
                <h2>Nuevo equipo</h2>
                <form onSubmit={handleCrearEquipo}>
                  <label>Nombre equipo</label>
                  <input
                    value={nuevoEquipo.nombre_equipo}
                    onChange={e => setNuevoEquipo({ ...nuevoEquipo, nombre_equipo: e.target.value })}
                    required
                  />
                  <label>País</label>
                  <Select
                    options={paises.map(p => ({ value: p.id_pais, label: p.nombre_pais }))}
                    value={paises.find(p => p.id_pais == nuevoEquipo.id_pais)
                      ? { value: nuevoEquipo.id_pais, label: paises.find(p => p.id_pais == nuevoEquipo.id_pais)?.nombre_pais }
                      : null}
                    onChange={o => setNuevoEquipo({ ...nuevoEquipo, id_pais: o.value })}
                    isSearchable
                    placeholder="Buscar país..."
                  />
                  <label>Tipo de club</label>
                  <Select
                    options={tipoClubs.map(tc => ({ value: tc.id_tipo_club, label: tc.tipo_club }))}
                    value={tipoClubs.find(tc => tc.id_tipo_club == nuevoEquipo.id_tipo_club)
                      ? { value: nuevoEquipo.id_tipo_club, label: tipoClubs.find(tc => tc.id_tipo_club == nuevoEquipo.id_tipo_club)?.tipo_club }
                      : null}
                    onChange={o => setNuevoEquipo({ ...nuevoEquipo, id_tipo_club: o.value })}
                    placeholder="Seleccionar..."
                  />
                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button className="admin-productos-guardar-btn" type="submit">Agregar</button>
                    <button
                      className="admin-productos-guardar-btn"
                      type="button"
                      style={{ background: "#bbb", color: "#222" }}
                      onClick={() => setModalEquipoOpen(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                  {mensajeEquipo && <span className="form-error">{mensajeEquipo}</span>}
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {modalMarcaOpen && (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="modal-centro" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}>
                <h2>Nueva marca</h2>
                <form onSubmit={handleCrearMarca}>
                  <label>Nombre marca</label>
                  <input
                    value={nuevaMarca.nombre_marca}
                    onChange={e => setNuevaMarca({ nombre_marca: e.target.value })}
                    required
                  />
                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button className="admin-productos-guardar-btn" type="submit">Agregar</button>
                    <button
                      className="admin-productos-guardar-btn"
                      type="button"
                      style={{ background: "#bbb", color: "#222" }}
                      onClick={() => setModalMarcaOpen(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                  {mensajeMarca && <span className="form-error">{mensajeMarca}</span>}
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}