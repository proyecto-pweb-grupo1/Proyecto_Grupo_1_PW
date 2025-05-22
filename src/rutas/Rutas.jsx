import { Routes, Route } from "react-router-dom";
import PaginaPrincipal from "../paginas/PaginaPrincipal";
import DetalleProducto from "../paginas/DetalleProducto";
import ResultadosBusqueda from "../paginas/ResultadosBusqueda";

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/producto/:id" element={<DetalleProducto />} />
      <Route path="/buscar" element={<ResultadosBusqueda />} />
    </Routes>
  );
}

export default Rutas;
