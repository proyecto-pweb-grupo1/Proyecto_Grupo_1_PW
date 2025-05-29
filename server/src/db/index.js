const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_proyecto_grupo_1_pw',
  password: '1234',
  port: 5432,
});

module.exports = pool;