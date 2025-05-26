import { Routes, Route } from "react-router-dom";
import Layout from "../componentes/Layout";
import PaginaPrincipal from "../paginas/PaginaPrincipal";
import DetalleProducto from "../paginas/DetalleProducto";
import ResultadosBusqueda from "../paginas/ResultadosBusqueda";
import Login from "../paginas/Login";
import Register from "../paginas/Register";
import RecuperarContraseña from "../paginas/RecuperarContraseña";

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PaginaPrincipal />} />
        <Route path="producto/:id" element={<DetalleProducto />} />
        <Route path="buscar" element={<ResultadosBusqueda />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="recuperar" element={<RecuperarContraseña />} />
      </Route>
    </Routes>
  );
}

export default Rutas;
