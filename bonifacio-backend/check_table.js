const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/bonifacio_bd?schema=public'
});

async function checkTable() {
  try {
    // Listar todas las tablas
    const allTables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log(`📊 Total de tablas en la base de datos: ${allTables.rows.length}`);
    console.log('\nTablas existentes:');
    console.table(allTables.rows);
    
    // Verificar si la tabla parametros existe
    const parametrosTable = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'parametros'
    `);
    
    if (parametrosTable.rows.length > 0) {
      console.log('\n✅ La tabla "parametros" existe');
      
      // Verificar estructura de la tabla
      const columns = await pool.query(`
        SELECT column_name, data_type, character_maximum_length
        FROM information_schema.columns
        WHERE table_name = 'parametros'
        ORDER BY ordinal_position
      `);
      
      console.log('\nEstructura de la tabla parametros:');
      console.table(columns.rows);
      
      // Contar registros
      const count = await pool.query('SELECT COUNT(*) as total FROM parametros');
      console.log(`\n📝 Total de registros en parametros: ${count.rows[0].total}`);
      
    } else {
      console.log('\n❌ La tabla "parametros" NO existe');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkTable();
