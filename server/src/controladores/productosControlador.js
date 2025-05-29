const pool = require('../db/index');

async function obtenerProductos(req, res) {
  try {
    const query = `
      SELECT p.*, c.descripcion_camiseta, c.imagen_url, t.descripcion_talla, g.descripcion_genero,
        eq.nombre_equipo, tm.descripcion_temporada, m.nombre_marca
      FROM producto p
      JOIN camiseta c ON p.id_camiseta = c.id_camiseta
      JOIN talla t ON p.id_talla = t.id_talla
      JOIN genero g ON p.id_genero = g.id_genero
      JOIN equipo eq ON c.id_equipo = eq.id_equipo
      JOIN temporada tm ON c.id_temporada = tm.id_temporada
      JOIN marca m ON c.id_marca = m.id_marca
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function obtenerProductoPorId(req, res) {
  try {
    const { id } = req.params;
    const query = `
      SELECT p.*, c.descripcion_camiseta, c.imagen_url, t.descripcion_talla, g.descripcion_genero,
        eq.nombre_equipo, tm.descripcion_temporada, m.nombre_marca
      FROM producto p
      JOIN camiseta c ON p.id_camiseta = c.id_camiseta
      JOIN talla t ON p.id_talla = t.id_talla
      JOIN genero g ON p.id_genero = g.id_genero
      JOIN equipo eq ON c.id_equipo = eq.id_equipo
      JOIN temporada tm ON c.id_temporada = tm.id_temporada
      JOIN marca m ON c.id_marca = m.id_marca
      WHERE p.id_producto = $1
    `;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function crearProducto(req, res) {
  try {
    const { id_camiseta, id_genero, id_talla, precio, stock, sku } = req.body;
    const query = `
      INSERT INTO producto (id_camiseta, id_genero, id_talla, precio, stock, sku)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id_camiseta, id_genero, id_talla, precio, stock, sku]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function editarProducto(req, res) {
  try {
    const { id } = req.params;
    const { id_camiseta, id_genero, id_talla, precio, stock, sku } = req.body;
    const query = `
      UPDATE producto
      SET id_camiseta = $1, id_genero = $2, id_talla = $3, precio = $4, stock = $5, sku = $6
      WHERE id_producto = $7
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id_camiseta, id_genero, id_talla, precio, stock, sku, id]);
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function eliminarProducto(req, res) {
  try {
    const { id } = req.params;
    const query = `DELETE FROM producto WHERE id_producto = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ msg: 'Eliminado', producto: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  editarProducto,
  eliminarProducto,
};
