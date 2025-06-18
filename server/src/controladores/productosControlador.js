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

async function obtenerEquipos(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM equipo');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function crearEquipo(req, res) {
  try {
    const { nombre_equipo, id_pais, id_tipo_club } = req.body;
    const existe = await pool.query('SELECT * FROM equipo WHERE nombre_equipo = $1', [nombre_equipo]);
    if (existe.rows.length) return res.status(400).json({ error: "El equipo ya existe" });

    const { rows } = await pool.query(
      `INSERT INTO equipo (nombre_equipo, id_pais, id_tipo_club)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [nombre_equipo, id_pais, id_tipo_club]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function obtenerMarcas(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM marca');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function crearMarca(req, res) {
  try {
    const { nombre_marca } = req.body;
    const existe = await pool.query('SELECT * FROM marca WHERE nombre_marca = $1', [nombre_marca]);
    if (existe.rows.length) return res.status(400).json({ error: "La marca ya existe" });

    const { rows } = await pool.query(
      `INSERT INTO marca (nombre_marca)
      VALUES ($1)
      RETURNING *`,
      [nombre_marca]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function obtenerTemporadas(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM temporada');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function crearTemporada(req, res) {
  try {
    const { descripcion_temporada, año_inicio, año_fin } = req.body;
    const existe = await pool.query('SELECT * FROM temporada WHERE descripcion_temporada = $1', [descripcion_temporada]);
    if (existe.rows.length) return res.status(400).json({ error: "La temporada ya existe" });

    const { rows } = await pool.query(
      `INSERT INTO temporada (descripcion_temporada, año_inicio, año_fin)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [descripcion_temporada, año_inicio, año_fin]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function obtenerPaises(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM pais');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function obtenerRegiones(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM region');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function obtenerTipoClubs(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM tipo_club');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function crearEquipoRegion(req, res) {
  try {
    const { id_equipo, id_region } = req.body;
    const existe = await pool.query(
      'SELECT * FROM equipo_region WHERE id_equipo = $1 AND id_region = $2',
      [id_equipo, id_region]
    );
    if (existe.rows.length) return res.status(400).json({ error: "Ya existe esa relación" });

    const { rows } = await pool.query(
      `INSERT INTO equipo_region (id_equipo, id_region)
      VALUES ($1, $2)
      RETURNING *`,
      [id_equipo, id_region]
    );
    res.status(201).json(rows[0]);
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
  obtenerEquipos, 
  crearEquipo,
  obtenerMarcas, 
  crearMarca,
  obtenerTemporadas, 
  crearTemporada,
  obtenerPaises,
  obtenerRegiones,
  obtenerTipoClubs,
  crearEquipoRegion
};
