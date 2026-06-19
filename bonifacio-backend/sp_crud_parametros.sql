-- Stored procedure para crear un nuevo parámetro
CREATE OR REPLACE FUNCTION crear_parametro(
    p_descripcion VARCHAR,
    p_clave VARCHAR,
    p_valor1 TEXT,
    p_valor2 TEXT,
    p_grupo VARCHAR
)
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
    INSERT INTO parametros (descripcion, clave, valor1, valor2, grupo)
    VALUES (p_descripcion, p_clave, p_valor1, p_valor2, p_grupo)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para actualizar un parámetro
CREATE OR REPLACE FUNCTION actualizar_parametro(
    p_id INTEGER,
    p_descripcion VARCHAR,
    p_clave VARCHAR,
    p_valor1 TEXT,
    p_valor2 TEXT,
    p_grupo VARCHAR
)
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
    UPDATE parametros
    SET descripcion = p_descripcion,
        clave = p_clave,
        valor1 = p_valor1,
        valor2 = p_valor2,
        grupo = p_grupo
    WHERE id = p_id
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para eliminar un parámetro
CREATE OR REPLACE FUNCTION eliminar_parametro(p_id INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
    DELETE FROM parametros WHERE id = p_id;
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;
