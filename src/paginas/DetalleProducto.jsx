import { useParams } from "react-router-dom";

function DetalleProducto() {
  const { id } = useParams();

  return (
    <div>
      <h2>Detalle del producto: {id}</h2>
      {/* Aquí mostrarás info, imagen, precio y botón "Agregar al carrito" */}
    </div>
  );
}

export default DetalleProducto;
