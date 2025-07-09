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
import CategoriaProductos from "../paginas/CategoriaProductos";
import Terminos from "../paginas/Terminos";
import Privacidad from "../paginas/Privacidad";
import Contacto from "../paginas/Contacto";
import Consultas from "../paginas/Consultas";
import DetalleConsultaUser from "../paginas/Detalle_consulta_User";
import ListaOrdenes from "../paginas/Lista_ordenes";


function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PaginaPrincipal />} />
        <Route path="detalle/:id" element={<DetalleProducto />} />
        <Route path="buscar" element={<ResultadosBusqueda />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="recuperar" element={<RecuperarContraseña />} />

        <Route path="admin/categorias" element={<ListadoCategoriasAdmin />} />
        <Route path="admin/agregar-categoria" element={<AgregarCategoria />} />
        <Route path="usuario/datos" element={<DatosUsuario />} />
        <Route path="usuario/password" element={<CambiarPassword />} />
        <Route path="usuario/orden" element={<DetalleOrden />} />
        <Route path="categoria/:id" element={<CategoriaProductos />} />
        <Route path="terminos" element={<Terminos />} />
        <Route path="privacidad" element={<Privacidad />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="consultas" element={<Consultas />} />
        <Route path="consultas/usuario/:id" element={<DetalleConsultaUser />} />
        <Route path="admin/usuario/:id/ordenes" element={<ListaOrdenes />} />
        <Route path="consultas/usuario/:id/ordenes" element={<ListaOrdenes />} />

      </Route>
    </Routes>
  );
}

export default Rutas;
