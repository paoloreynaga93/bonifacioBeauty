require('dotenv').config({ path: '.env' });

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const app = express();
let prisma;

// Only initialize Prisma if DATABASE_URL is available
if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} else {
  console.log('⚠️  DATABASE_URL not set - running without database connection');
  prisma = null;
}
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BonifacioBeauty API is running' });
});

// API Routes
const serviciosRouter = require('./routes/servicios');
const categoriasRouter = require('./routes/categorias');
const promocionesRouter = require('./routes/promociones');
const contactoRouter = require('./routes/contacto');
const inicioRouter = require('./routes/inicio');
const parametrosRouter = require('./routes/parametros');

// Pass prisma instance to routes
if (prisma) {
  serviciosRouter.setPrisma(prisma);
  categoriasRouter.setPrisma(prisma);
  promocionesRouter.setPrisma(prisma);
  contactoRouter.setPrisma(prisma);
  inicioRouter.setPrisma(prisma);
}

app.use('/api/servicios', serviciosRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/promociones', promocionesRouter);
app.use('/api/contacto', contactoRouter);
app.use('/api/inicio', inicioRouter);
app.use('/api/parametros', parametrosRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('beforeExit', async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
});
