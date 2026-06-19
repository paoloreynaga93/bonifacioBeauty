const { Pool } = require('pg');

console.log('⚠️ Asegúrate de tener el túnel SSH activo:');
console.log('   ssh -L 5433:localhost:5432 root@185.172.57.246 -N');
console.log('');

// Configuración de conexión a PostgreSQL desde variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 5433,
  database: process.env.DB_NAME || 'bonifacio_db',
  user: process.env.DB_USER || 'bonifacio_app',
  password: process.env.DB_PASSWORD || 'Bonipwhb751',
  schema: process.env.DB_SCHEMA || 'bonifacio'
});

module.exports = pool;
