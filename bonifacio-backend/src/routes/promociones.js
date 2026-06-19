const express = require('express');

const router = express.Router();
let prisma = null;

// Function to set prisma instance (called from main app)
router.setPrisma = (prismaInstance) => {
  prisma = prismaInstance;
};

// Get all active promotions
router.get('/', async (req, res) => {
  try {
    if (!prisma) {
      return res.json([]);
    }
    const promociones = await prisma.promocion.findMany({
      where: { activo: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching promotions' });
  }
});

// Get promotion by ID
router.get('/:id', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(404).json({ error: 'Promotion not found' });
    }
    const promocion = await prisma.promocion.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!promocion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }
    res.json(promocion);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching promotion' });
  }
});

module.exports = router;
