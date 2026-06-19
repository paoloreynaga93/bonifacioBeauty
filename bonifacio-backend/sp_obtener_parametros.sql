-- Stored procedure para obtener parámetros
-- Puede filtrar por grupo o clave, o obtener todos

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
$$ LANGUAGE plpgsql;

-- Stored procedure para obtener un parámetro por ID
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
$$ LANGUAGE plpgsql;
