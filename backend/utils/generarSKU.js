export function generarSKU({ equipo, temporada, tipo_camiseta, genero, talla }) {
  let equipoFormateado = equipo.trim().toUpperCase().replace(/\s+/g, "-");
  let tipoFormateado = tipo_camiseta.trim().toUpperCase().replace(/\s+/g, "_");
  let generoFormateado = genero.trim().toUpperCase();
  let tallaFormateada = talla.trim().toUpperCase();

  return `${equipoFormateado}_${temporada}_${tipoFormateado}_${generoFormateado}_${tallaFormateada}`;
}
