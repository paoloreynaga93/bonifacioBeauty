require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/bonifaciobeauty?schema=public';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed con datos de prueba completos...');

  // ── Limpieza previa para evitar duplicados ──────────────────────
  await prisma.servicio.deleteMany();
  await prisma.promocion.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.paginaInicio.deleteMany();
  await prisma.contacto.deleteMany();
  console.log('🗑️  Registros anteriores eliminados');

  // ── Página de inicio ────────────────────────────────────────────
  await prisma.paginaInicio.create({
    data: {
      id: 1,
      tituloPrincipal: 'BonifacioBeauty',
      subtitulo: 'Tu belleza es nuestra pasión. Tratamientos profesionales que realzan tu esencia natural en el corazón de Milano.',
      fotoPortadaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80'
    }
  });
  console.log('✅ Página de inicio creada');

  // ── Categorías ───────────────────────────────────────────────────
  const cats = await Promise.all([
    prisma.categoria.create({ data: {
      id: 1,
      nombre: 'Tratamientos Faciales',
      descripcion: 'Protocolos de limpieza, hidratación y rejuvenecimiento para un rostro radiante',
      icono: '✨',
      fotoUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80'
    }}),
    prisma.categoria.create({ data: {
      id: 2,
      nombre: 'Manicure & Pedicure',
      descripcion: 'Cuidado completo de manos y pies con acabados clásicos y de larga duración',
      icono: '💅',
      fotoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80'
    }}),
    prisma.categoria.create({ data: {
      id: 3,
      nombre: 'Pestañas & Cejas',
      descripcion: 'Diseño y definición de cejas y pestañas para una mirada impactante',
      icono: '👁️',
      fotoUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80'
    }}),
    prisma.categoria.create({ data: {
      id: 4,
      nombre: 'Depilación',
      descripcion: 'Técnicas profesionales para una piel suave y libre de vello por más tiempo',
      icono: '🌸',
      fotoUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80'
    }}),
    prisma.categoria.create({ data: {
      id: 5,
      nombre: 'Tratamientos Corporales',
      descripcion: 'Protocolos reductores, tonificantes y relajantes para tu bienestar integral',
      icono: '🌿',
      fotoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'
    }}),
    prisma.categoria.create({ data: {
      id: 6,
      nombre: 'Aparatología Estética',
      descripcion: 'Tecnología de vanguardia para potenciar los resultados de tus tratamientos',
      icono: '⚡',
      fotoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80'
    }}),
    prisma.categoria.create({ data: {
      id: 7,
      nombre: 'Maquillaje',
      descripcion: 'Maquillaje profesional para eventos, novias y ocasiones especiales',
      icono: '💄',
      fotoUrl: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&q=80'
    }}),
    prisma.categoria.create({ data: {
      id: 8,
      nombre: 'Masajes Relajantes',
      descripcion: 'Masajes terapéuticos que alivian tensiones y revitalizan cuerpo y mente',
      icono: '💆',
      fotoUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80'
    }})
  ]);
  console.log(`✅ ${cats.length} categorías creadas`);

  // ── Servicios ────────────────────────────────────────────────────
  const servicios = [
    // -- Faciales (cat 1)
    { id: 1,  nombre: 'Limpieza Facial Profunda',       descripcion: 'Eliminación de impurezas, puntos negros y células muertas con vapor de ozono y extracción manual. Ideal para pieles mixtas y grasas.', precio: 55,  duracionMin: 60, categoriaId: 1, fotoUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80' },
    { id: 2,  nombre: 'Hidratación Facial Intensiva',   descripcion: 'Tratamiento con ácido hialurónico y vitamina C para restaurar la barrera cutánea y aportar luminosidad duradera.', precio: 65,  duracionMin: 50, categoriaId: 1, fotoUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&q=80' },
    { id: 3,  nombre: 'Peeling Químico',                descripcion: 'Exfoliación controlada con ácidos AHA/BHA para renovar la textura de la piel, reducir manchas y afinar los poros.', precio: 80,  duracionMin: 55, categoriaId: 1, fotoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=700&q=80' },
    { id: 4,  nombre: 'Tratamiento Antienvejecimiento', descripcion: 'Protocolo premium con péptidos bioactivos, retinol y masaje linfático facial para combatir líneas de expresión y flacidez.', precio: 95,  duracionMin: 75, categoriaId: 1, fotoUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700&q=80' },

    // -- Manicure (cat 2)
    { id: 5,  nombre: 'Manicure Clásico',               descripcion: 'Limado, cuidado de cutículas, masaje de manos con crema nutritiva y esmaltado tradicional en el color de tu elección.', precio: 25,  duracionMin: 45, categoriaId: 2, fotoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&q=80' },
    { id: 6,  nombre: 'Manicure Semipermanente',        descripcion: 'Esmaltado gel de larga duración (hasta 3 semanas) con base endurecedora y acabado de alto brillo. Incluye cuidado de cutículas.', precio: 35,  duracionMin: 60, categoriaId: 2, fotoUrl: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=700&q=80' },
    { id: 7,  nombre: 'Nail Art Design',                descripcion: 'Diseños artísticos personalizados, desde francés degradé hasta nail art con gemas y stamping. Exprésate con tus uñas.', precio: 45,  duracionMin: 75, categoriaId: 2, fotoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&q=80' },
    { id: 8,  nombre: 'Pedicure Spa Completo',          descripcion: 'Remojo con sales minerales, exfoliación de talones, masaje de pies y piernas, hidratación intensiva y esmaltado.', precio: 45,  duracionMin: 80, categoriaId: 2, fotoUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=700&q=80' },

    // -- Pestañas (cat 3)
    { id: 9,  nombre: 'Laminado de Pestañas',           descripcion: 'Curvatura y fijación de tus pestañas naturales para un efecto rizador permanente de 6 a 8 semanas. Sin extensiones.', precio: 55,  duracionMin: 50, categoriaId: 3, fotoUrl: 'https://images.unsplash.com/photo-1596704017254-9d5f67f84f4d?w=700&q=80' },
    { id: 10, nombre: 'Tinte de Pestañas y Cejas',      descripcion: 'Coloración profesional que define la mirada sin necesidad de maquillaje. Dura hasta 4 semanas. Disponible en negro y marrón.', precio: 30,  duracionMin: 30, categoriaId: 3, fotoUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&q=80' },
    { id: 11, nombre: 'Diseño y Depilación de Cejas',   descripcion: 'Perfilado con hilo y pinzas siguiendo la forma natural de tu rostro para un arco perfecto y simétrico.', precio: 20,  duracionMin: 25, categoriaId: 3, fotoUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&q=80' },
    { id: 12, nombre: 'Lifting de Pestañas Premium',    descripcion: 'Combinación de lifting, tinte y tratamiento nutritivo de queratina. Máximo volumen y curvatura con efecto 3D.', precio: 75,  duracionMin: 70, categoriaId: 3, fotoUrl: 'https://images.unsplash.com/photo-1596704017254-9d5f67f84f4d?w=700&q=80' },

    // -- Depilación (cat 4)
    { id: 13, nombre: 'Depilación con Cera - Piernas',  descripcion: 'Depilación completa de piernas con cera tibia de alta adherencia. Piel suave hasta 4 semanas.', precio: 40,  duracionMin: 45, categoriaId: 4, fotoUrl: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=700&q=80' },
    { id: 14, nombre: 'Depilación con Cera - Axilas',   descripcion: 'Depilación de axilas con cera de bandas o sin tiras. Rápida, eficaz y duradera.', precio: 15,  duracionMin: 15, categoriaId: 4, fotoUrl: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=700&q=80' },
    { id: 15, nombre: 'Depilación Cuerpo Completo',     descripcion: 'Sesión completa de depilación con cera: piernas, axilas, línea de bikini y brazos. Máximo resultado en una sola cita.', precio: 80,  duracionMin: 90, categoriaId: 4, fotoUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80' },

    // -- Corporales (cat 5)
    { id: 16, nombre: 'Envoltura Reductora',            descripcion: 'Protocolo de barro termal y vendas frías que moldean la silueta y reducen la retención de líquidos en una sola sesión.', precio: 75,  duracionMin: 70, categoriaId: 5, fotoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80' },
    { id: 17, nombre: 'Anticelulítico Intensivo',       descripcion: 'Masaje manual profundo con cremas termogénicas que atacan la celulitis en zonas de muslos, abdomen y glúteos.', precio: 85,  duracionMin: 60, categoriaId: 5, fotoUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=700&q=80' },
    { id: 18, nombre: 'Masaje Reductor con Piedras',    descripcion: 'Masaje con piedras volcánicas calientes que estimula la circulación y activa la quema de grasa localizada.', precio: 90,  duracionMin: 75, categoriaId: 5, fotoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80' },

    // -- Aparatología (cat 6)
    { id: 19, nombre: 'Dermapen Revitalizante',         descripcion: 'Microagujas de precisión que estimulan el colágeno y mejoran la textura, luminosidad y firmeza de la piel.', precio: 110, duracionMin: 60, categoriaId: 6, fotoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&q=80' },
    { id: 20, nombre: 'Radiofrecuencia Facial',         descripcion: 'Energía térmica que activa los fibroblastos para tensar y rejuvenecer la piel sin cirugía. Resultados visibles desde la 1ra sesión.', precio: 95,  duracionMin: 55, categoriaId: 6, fotoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&q=80' },
    { id: 21, nombre: 'Cavitación Ultrasónica',         descripcion: 'Ultrasonidos que destruyen las células de grasa localizada de forma no invasiva, ideal para abdomen, flancos y muslos.', precio: 80,  duracionMin: 50, categoriaId: 6, fotoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&q=80' },

    // -- Maquillaje (cat 7)
    { id: 22, nombre: 'Maquillaje Social',              descripcion: 'Maquillaje profesional para fiestas, graduaciones y eventos. Incluye preparación de la piel y fijación de larga duración.', precio: 60,  duracionMin: 60, categoriaId: 7, fotoUrl: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=700&q=80' },
    { id: 23, nombre: 'Maquillaje de Novia',            descripcion: 'Servicio premium con prueba previa incluida. Maquillaje de alta resistencia para el día más especial de tu vida.', precio: 150, duracionMin: 120, categoriaId: 7, fotoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80' },
    { id: 24, nombre: 'Maquillaje Artístico / Editorial',descripcion: 'Creaciones artísticas para sesiones fotográficas, teatro, pasarelas y proyectos creativos.', precio: 90,  duracionMin: 90, categoriaId: 7, fotoUrl: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=700&q=80' },

    // -- Masajes (cat 8)
    { id: 25, nombre: 'Masaje Relajante Corporal',      descripcion: 'Masaje de cuerpo completo con aceites esenciales de lavanda y bergamota. Libera tensiones y restaura la energía.', precio: 65,  duracionMin: 60, categoriaId: 8, fotoUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=700&q=80' },
    { id: 26, nombre: 'Masaje con Piedras Calientes',   descripcion: 'Terapia con basalto volcánico caliente que dilata los vasos sanguíneos, alivia el dolor muscular y profundiza la relajación.', precio: 85,  duracionMin: 75, categoriaId: 8, fotoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80' },
    { id: 27, nombre: 'Masaje Descontracturante',       descripcion: 'Técnica de presión profunda para liberar nódulos musculares y aliviar contracturas crónicas en espalda, cuello y hombros.', precio: 70,  duracionMin: 55, categoriaId: 8, fotoUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=700&q=80' },
  ];

  await prisma.servicio.createMany({ data: servicios });
  console.log(`✅ ${servicios.length} servicios creados`);

  // ── Promociones ──────────────────────────────────────────────────
  const promociones = [
    {
      id: 1,
      titulo: 'Paquete Relax Total',
      descripcion: '¡El combo perfecto! Limpieza facial profunda + Manicure semipermanente + Pedicure spa. Regálate una jornada de bienestar completa.',
      descuento: 25,
      fotoUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80',
      activo: true
    },
    {
      id: 2,
      titulo: 'Bienvenida Primera Visita',
      descripcion: 'Descuento especial para nuevas clientas en cualquier tratamiento facial o corporal. ¡Conócenos y enamórate del resultado!',
      descuento: 20,
      fotoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80',
      activo: true
    },
    {
      id: 3,
      titulo: 'Pack Novia',
      descripcion: 'Tratamiento facial antienvejecimiento + Lifting de pestañas + Maquillaje de novia con prueba. Luce radiante el gran día.',
      descuento: 30,
      fotoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80',
      activo: true
    },
    {
      id: 4,
      titulo: 'Transforma tu Cuerpo',
      descripcion: 'Cavitación + Envoltura reductora + Masaje anticelulítico. Protocolo de 3 sesiones con resultados visibles garantizados.',
      descuento: 30,
      fotoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80',
      activo: true
    },
    {
      id: 5,
      titulo: 'Mirada Perfecta',
      descripcion: 'Lifting de pestañas premium + Diseño de cejas + Tinte. Define tu mirada y olvídate del rimel durante semanas.',
      descuento: 15,
      fotoUrl: 'https://images.unsplash.com/photo-1596704017254-9d5f67f84f4d?w=700&q=80',
      activo: true
    },
    {
      id: 6,
      titulo: 'Verano Sin Vello',
      descripcion: 'Depilación completa de cuerpo (piernas + axilas + bikini) con nuestra cera profesional de larga duración. ¡Piel de seda todo el verano!',
      descuento: 20,
      fotoUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80',
      activo: true
    }
  ];

  await prisma.promocion.createMany({ data: promociones });
  console.log(`✅ ${promociones.length} promociones creadas`);

  // ── Contacto ─────────────────────────────────────────────────────
  await prisma.contacto.create({
    data: {
      id: 1,
      direccion: 'Via della Bellezza 47, 20121 Milano, Italia',
      telefono: '+39 02 8765 4321',
      email: 'citas@bonifaciobeauty.it',
      horario: 'Lunes - Viernes: 9:00 - 20:00\nSábado: 9:00 - 18:00\nDomingo: Cerrado'
    }
  });
  console.log('✅ Contacto creado');

  console.log('\n🎉 ¡Seed completado! Base de datos lista con:');
  console.log(`   - 1 página de inicio`);
  console.log(`   - 8 categorías`);
  console.log(`   - ${servicios.length} servicios`);
  console.log(`   - ${promociones.length} promociones`);
  console.log(`   - 1 contacto`);
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
