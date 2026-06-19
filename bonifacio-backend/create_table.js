const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/bonifacio_bd?schema=public'
});

async function createTable() {
  try {
    console.log('🔄 Creando tabla de parámetros...');
    
    // Crear tabla
    await pool.query(`
      CREATE TABLE IF NOT EXISTS parametros (
        id SERIAL PRIMARY KEY,
        descripcion VARCHAR(255) NOT NULL,
        clave VARCHAR(255) UNIQUE NOT NULL,
        valor1 TEXT,
        valor2 TEXT,
        grupo VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Tabla creada exitosamente');
    
    // Crear índices
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_parametros_grupo ON parametros(grupo)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_parametros_clave ON parametros(clave)`);
    console.log('✅ Índices creados');
    
    // Crear trigger para updated_at
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql'
    `);
    
    await pool.query(`
      DROP TRIGGER IF EXISTS update_parametros_updated_at ON parametros
    `);
    
    await pool.query(`
      CREATE TRIGGER update_parametros_updated_at BEFORE UPDATE
      ON parametros FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
    `);
    
    console.log('✅ Trigger creado');
    
    // Crear stored procedures
    await pool.query(`
      CREATE OR REPLACE FUNCTION obtener_parametros(p_grupo VARCHAR DEFAULT NULL, p_clave VARCHAR DEFAULT NULL)
      RETURNS TABLE (
        id INTEGER,
        descripcion VARCHAR,
        clave VARCHAR,
        valor1 TEXT,
        valor2 TEXT,
        grupo VARCHAR,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      ) AS $$
      BEGIN
        RETURN QUERY
        SELECT 
          p.id,
          p.descripcion,
          p.clave,
          p.valor1,
          p.valor2,
          p.grupo,
          p.created_at,
          p.updated_at
        FROM parametros p
        WHERE 
          (p_grupo IS NULL OR p.grupo = p_grupo)
          AND (p_clave IS NULL OR p.clave = p_clave)
        ORDER BY p.grupo, p.clave;
      END;
      $$ LANGUAGE plpgsql
    `);
    
    console.log('✅ Stored procedure obtener_parametros creado');
    
    await pool.query(`
      CREATE OR REPLACE FUNCTION obtener_parametro_por_id(p_id INTEGER)
      RETURNS TABLE (
        id INTEGER,
        descripcion VARCHAR,
        clave VARCHAR,
        valor1 TEXT,
        valor2 TEXT,
        grupo VARCHAR,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      ) AS $$
      BEGIN
        RETURN QUERY
        SELECT 
          p.id,
          p.descripcion,
          p.clave,
          p.valor1,
          p.valor2,
          p.grupo,
          p.created_at,
          p.updated_at
        FROM parametros p
        WHERE p.id = p_id;
      END;
      $$ LANGUAGE plpgsql
    `);
    
    console.log('✅ Stored procedure obtener_parametro_por_id creado');
    
    // Insertar datos de prueba
    await pool.query(`
      INSERT INTO parametros (descripcion, clave, valor1, valor2, grupo) VALUES
      ('Logo principal', 'logo_principal', '/assets/logo.png', '/assets/logo-large.png', 'general'),
      ('Color primario', 'color_primario', '#FF6B6B', '#FF6B6B', 'colores'),
      ('Título del sitio', 'titulo_sitio', 'Bonifacio Beauty', 'Salón de Belleza Bonifacio', 'general')
      ON CONFLICT (clave) DO NOTHING
    `);
    
    console.log('✅ Datos de prueba insertados');
    console.log('\n🎉 Proceso completado exitosamente');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

createTable();
