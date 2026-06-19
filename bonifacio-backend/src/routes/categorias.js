const express = require('express');

const router = express.Router();
let prisma = null;

// Function to set prisma instance (called from main app)
router.setPrisma = (prismaInstance) => {
  prisma = prismaInstance;
};

// Get all categories
router.get('/', async (req, res) => {
  try {
    if (!prisma) {
      return res.json([]);
    }
    const categorias = await prisma.categoria.findMany({
      include: { 
        servicios: {
          where: { activo: true },
          select: { id: true, nombre: true, precio: true }
        }
      },
      orderBy: { nombre: 'asc' }
    });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const categoria = await prisma.categoria.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { 
        servicios: {
          where: { activo: true },
          orderBy: { nombre: 'asc' }
        }
      }
    });
    if (!categoria) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching category' });
  }
});

module.exports = router;
