import { Routes, Route } from "react-router-dom";
import Layout from "../componentes/Layout";
import Productos from "../paginas/Productos";

// Alumno 1: Sebastian Montenegro Carrillo
import PaginaPrincipal from "../paginas/PaginaPrincipal";
import ResultadosBusqueda from "../paginas/ResultadosBusqueda";
import DetalleProducto from "../paginas/DetalleProducto";

// Alumno 2: Jairo Gutierrez
import Carrito from "../paginas/Carrito";
import Checkout from "../paginas/Checkout";
import FinCompra from "../paginas/FinCompra";

// Alumno 3: Alexis Raul Chaberlin Huangal
import Login from "../paginas/Login";
import Register from "../paginas/Register";
import RecuperarContraseña from "../paginas/RecuperarContraseña";
// Página principal de usuario registrado, listado de órdenes (usualmente en DatosUsuario)
import DatosUsuario from "../paginas/DatosUsuario";

// Alumno 4: Hector Gianmarco Arrasco Juarez
import ListadoCategoriasAdmin from "../paginas/ListadoCategoriasAdmin";
import AgregarCategoria from "../paginas/AgregarCategoria";
import DetalleOrden from "../paginas/DetalleOrden";
import CambiarPassword from "../paginas/CambiarPassword";

// Alumno 5: Erick Obradovich Luna
import AdminDashboard from "../paginas/AdminDashboard";
import AdminProductos from "../paginas/AdminProductos";
import AdminAgregarProducto from "../paginas/AdminAgregarProducto";
import AdminEditarProducto from "../paginas/AdminEditarProducto";
// Detalle de producto ya importado arriba

// Alumno 6: Guido Alejandro Aquice Campos
// (Coloca los imports cuando tengas estas páginas, aquí los nombres sugeridos)
// import AdminUsuarios from "../paginas/AdminUsuarios";
// import AdminDetalleUsuario from "../paginas/AdminDetalleUsuario";
// import AdminOrdenes from "../paginas/AdminOrdenes";
// import AdminDetalleOrden from "../paginas/AdminDetalleOrden";

// Comunes/Extras
import CategoriaProductos from "../paginas/CategoriaProductos";
import Terminos from "../paginas/Terminos";
import Privacidad from "../paginas/Privacidad";
import Contacto from "../paginas/Contacto";

function Rutas() {
  return (
    <Routes>
      {/* Rutas generales (layout principal) */}
      <Route path="/" element={<Layout />}>

        {/* --------- Alumno 1: Sebastian Montenegro Carrillo --------- */}
        <Route index element={<PaginaPrincipal />} />
        <Route path="buscar" element={<ResultadosBusqueda />} />
        <Route path="detalle/:id" element={<DetalleProducto />} />

        {/* --------- Alumno 2: Jairo Gutierrez --------- */}
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="fincompra" element={<FinCompra />} />

        {/* --------- Alumno 3: Alexis Raul Chaberlin Huangal --------- */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="recuperar" element={<RecuperarContraseña />} />
        <Route path="usuario/datos" element={<DatosUsuario />} />

        {/* --------- Alumno 4: Hector Gianmarco Arrasco Juarez --------- */}
        <Route path="admin/categorias" element={<ListadoCategoriasAdmin />} />
        <Route path="admin/agregar-categoria" element={<AgregarCategoria />} />
        <Route path="usuario/password" element={<CambiarPassword />} />
        <Route path="usuario/orden" element={<DetalleOrden />} />
        {/* Opción alternativa para detalle de orden con id */}
        <Route path="orden/:id" element={<DetalleOrden />} />

        {/* --------- Alumno 5: Erick Obradovich Luna --------- */}
        <Route path="categoria/:id" element={<CategoriaProductos />} />
        <Route path="productos" element={<Productos />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/productos" element={<AdminProductos />} />
        <Route path="admin/productos/agregar" element={<AdminAgregarProducto />} />
        <Route path="admin/productos/editar/:id" element={<AdminEditarProducto />} />

        {/* --------- Alumno 6: Guido Alejandro Aquice Campos --------- */}
        {/* Añade aquí las rutas cuando implementes estas páginas
        <Route path="admin/usuarios" element={<AdminUsuarios />} />
        <Route path="admin/usuarios/:id" element={<AdminDetalleUsuario />} />
        <Route path="admin/ordenes" element={<AdminOrdenes />} />
        <Route path="admin/ordenes/:id" element={<AdminDetalleOrden />} />
        */}

        {/* --------- Extras y legales --------- */}
        <Route path="terminos" element={<Terminos />} />
        <Route path="privacidad" element={<Privacidad />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
}

export default Rutas;
