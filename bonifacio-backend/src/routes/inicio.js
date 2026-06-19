const express = require('express');

const router = express.Router();
let prisma = null;

// Function to set prisma instance (called from main app)
router.setPrisma = (prismaInstance) => {
  prisma = prismaInstance;
};

// Get home page content
router.get('/', async (req, res) => {
  try {
    if (!prisma) {
      return res.json({
        id: 1,
        tituloPrincipal: 'BonifacioBeauty',
        subtitulo: 'Realza tu belleza natural con nuestros tratamientos exclusivos',
        fotoPortadaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920'
      });
    }
    const inicio = await prisma.paginaInicio.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    if (!inicio) {
      return res.status(404).json({ error: 'Home page content not found' });
    }
    res.json(inicio);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching home page content' });
  }
});

module.exports = router;
