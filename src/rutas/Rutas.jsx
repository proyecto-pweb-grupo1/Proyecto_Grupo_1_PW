import { Routes, Route } from "react-router-dom";
import Layout from "../componentes/Layout";
import PaginaPrincipal from "../paginas/PaginaPrincipal";
import DetalleProducto from "../paginas/DetalleProducto";
import ResultadosBusqueda from "../paginas/ResultadosBusqueda";
import Login from "../paginas/Login";
import Register from "../paginas/Register";
import RecuperarContraseña from "../paginas/RecuperarContraseña";
import ListadoCategoriasAdmin from "../paginas/ListadoCategoriasAdmin";
import AgregarCategoria from "../paginas/AgregarCategoria";
import DatosUsuario from "../paginas/DatosUsuario";
import CambiarPassword from "../paginas/CambiarPassword";
import DetalleOrden from "../paginas/DetalleOrden";
import Carrito from "../paginas/Carrito";
import Checkout from "../paginas/Checkout";
import FinCompra from "../paginas/FinCompra";

// Admin
import AdminDashboard from "../paginas/AdminDashboard";
import AdminProductos from "../paginas/AdminProductos";
import AdminAgregarProducto from "../paginas/AdminAgregarProducto";
import AdminEditarProducto from "../paginas/AdminEditarProducto";

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PaginaPrincipal />} />
        <Route path="detalle/:id" element={<DetalleProducto />} />
        <Route path="buscar" element={<ResultadosBusqueda />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="fincompra" element={<FinCompra />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="recuperar" element={<RecuperarContraseña />} />
        <Route path="usuario" element={<DatosUsuario />} />
        <Route path="cambiar-password" element={<CambiarPassword />} />
        <Route path="orden/:id" element={<DetalleOrden />} />
      </Route>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/productos" element={<AdminProductos />} />
      <Route path="/admin/productos/agregar" element={<AdminAgregarProducto />} />
      <Route path="/admin/productos/editar/:id" element={<AdminEditarProducto />} />
      <Route path="/admin/categorias" element={<ListadoCategoriasAdmin />} />
      <Route path="/admin/categorias/agregar" element={<AgregarCategoria />} />
    </Routes>
  );
}

export default Rutas;
