const { Pool } = require('pg');

// Configuración de conexión a PostgreSQL desde variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'bonifacio_db',
  user: process.env.DB_USER || 'bonifacio_app',
  password: process.env.DB_PASSWORD || 'Bonifacio2026@',
  schema: process.env.DB_SCHEMA || 'bonifacio'
});

module.exports = pool;
