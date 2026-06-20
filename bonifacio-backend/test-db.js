const { Pool } = require('pg');

const dbPassword = process.env.DB_PASSWORD || 'Bonipwhb751';

console.log('⚠️ Asegúrate de tener el túnel SSH activo:');
console.log('   ssh -L 5433:localhost:5432 root@185.172.57.246 -N');
console.log('');

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 5433,
  database: process.env.DB_NAME || 'bonifacio_db',
  user: process.env.DB_USER || 'bonifacio_app',
  password: dbPassword,
  schema: process.env.DB_SCHEMA || 'bonifacio'
});

const connectionString = `postgresql://${pool.options.user}:${dbPassword}@${pool.options.host}:${pool.options.port}/${pool.options.database}`;

console.log('🔗 Cadena de conexión:', connectionString);
console.log('📋 Configuración:', {
  host: pool.options.host,
  port: pool.options.port,
  database: pool.options.database,
  user: pool.options.user,
  schema: pool.options.schema
});

pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Conexión exitosa:', res.rows[0]);
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
    console.error('📋 Detalles del error:', err);
  })
  .finally(() => {
    pool.end();
  });
