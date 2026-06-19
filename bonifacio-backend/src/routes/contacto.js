const express = require('express');

const router = express.Router();
let prisma = null;

// Function to set prisma instance (called from main app)
router.setPrisma = (prismaInstance) => {
  prisma = prismaInstance;
};

// Get contact information
router.get('/', async (req, res) => {
  try {
    if (!prisma) {
      return res.json({
        direccion: 'Via della Bellezza 123, Milano, Italia',
        telefono: '+39 02 1234 5678',
        email: 'info@bonifaciobeauty.com',
        horario: 'Lunes - Viernes: 9:00 - 19:00\nSábado: 9:00 - 18:00\nDomingo: Cerrado'
      });
    }
    const contacto = await prisma.contacto.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    if (!contacto) {
      return res.status(404).json({ error: 'Contact information not found' });
    }
    res.json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contact information' });
  }
});

module.exports = router;
