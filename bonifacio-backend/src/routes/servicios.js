const express = require('express');

const router = express.Router();
let prisma = null;

// Function to set prisma instance (called from main app)
router.setPrisma = (prismaInstance) => {
  prisma = prismaInstance;
};

// Get all active services
router.get('/', async (req, res) => {
  try {
    if (!prisma) {
      return res.json([]);
    }
    const servicios = await prisma.servicio.findMany({
      where: { activo: true },
      include: { categoria: true },
      orderBy: { nombre: 'asc' }
    });
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching services' });
  }
});

// Get services by category
router.get('/categoria/:categoriaId', async (req, res) => {
  try {
    if (!prisma) {
      return res.json([]);
    }
    const servicios = await prisma.servicio.findMany({
      where: {
        categoriaId: parseInt(req.params.categoriaId),
        activo: true
      },
      include: { categoria: true },
      orderBy: { nombre: 'asc' }
    });
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching services by category' });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const servicio = await prisma.servicio.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { categoria: true }
    });
    if (!servicio) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching service' });
  }
});

module.exports = router;
