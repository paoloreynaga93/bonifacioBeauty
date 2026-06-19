const pool = require('./config/db');

pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Conexión exitosa:', res.rows[0]);
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
  })
  .finally(() => {
    pool.end();
  });
