const express = require('express');
const router = express.Router();
const pool = require('../../config/db');

// Obtener todos los parámetros o filtrar por grupo o clave usando SP
router.get('/', async (req, res) => {
  try {
    const { grupo, clave } = req.query;
    
    // Usar el stored procedure obtener_parametros
    const result = await pool.query(
      'SELECT * FROM obtener_parametros($1, $2)',
      [grupo || null, clave || null]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener parámetros:', error);
    console.error('Detalle del error:', error.message);
    res.status(500).json({ error: 'Error al obtener parámetros', detail: error.message });
  }
});

// Obtener un parámetro por ID usando SP
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Usar el stored procedure obtener_parametro_por_id
    const result = await pool.query(
      'SELECT * FROM obtener_parametro_por_id($1)',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Parámetro no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener parámetro:', error);
    res.status(500).json({ error: 'Error al obtener parámetro' });
  }
});

// Crear un nuevo parámetro usando SP
router.post('/', async (req, res) => {
  try {
    const { descripcion, clave, valor1, valor2, grupo } = req.body;
    
    // Usar el stored procedure crear_parametro
    const result = await pool.query(
      'SELECT * FROM crear_parametro($1, $2, $3, $4, $5)',
      [descripcion, clave, valor1, valor2, grupo]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear parámetro:', error);
    if (error.code === '23505') {
      res.status(400).json({ error: 'La clave ya existe' });
    } else {
      res.status(500).json({ error: 'Error al crear parámetro' });
    }
  }
});

// Actualizar un parámetro usando SP
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, clave, valor1, valor2, grupo } = req.body;
    
    // Usar el stored procedure actualizar_parametro
    const result = await pool.query(
      'SELECT * FROM actualizar_parametro($1, $2, $3, $4, $5, $6)',
      [id, descripcion, clave, valor1, valor2, grupo]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Parámetro no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar parámetro:', error);
    res.status(500).json({ error: 'Error al actualizar parámetro' });
  }
});

// Eliminar un parámetro usando SP
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Usar el stored procedure eliminar_parametro
    const result = await pool.query(
      'SELECT eliminar_parametro($1) as eliminado',
      [id]
    );
    
    if (result.rows[0].eliminado === false) {
      return res.status(404).json({ error: 'Parámetro no encontrado' });
    }
    
    res.json({ message: 'Parámetro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar parámetro:', error);
    res.status(500).json({ error: 'Error al eliminar parámetro' });
  }
});

module.exports = router;
