-- Crear tabla de parámetros
CREATE TABLE IF NOT EXISTS parametros (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    clave VARCHAR(255) UNIQUE NOT NULL,
    valor1 TEXT,
    valor2 TEXT,
    grupo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para búsquedas por grupo
CREATE INDEX IF NOT EXISTS idx_parametros_grupo ON parametros(grupo);

-- Crear índice para búsquedas por clave
CREATE INDEX IF NOT EXISTS idx_parametros_clave ON parametros(clave);

-- Crear trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_parametros_updated_at BEFORE UPDATE
ON parametros FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
