import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create home page content
  const paginaInicio = await prisma.paginaInicio.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      tituloPrincipal: 'BonifacioBeauty',
      subtitulo: 'Realza tu belleza natural con nuestros tratamientos exclusivos',
      fotoPortadaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920'
    }
  });
  console.log('✅ Created home page content');

  // Create categories
  const categoriaFacial = await prisma.categoria.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nombre: 'Tratamientos Faciales',
      descripcion: 'Cuidados especializados para tu rostro',
      icono: '😊'
    }
  });

  const categoriaCorte = await prisma.categoria.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      nombre: 'Corte y Estilo',
      descripcion: 'Cortes modernos y estilos únicos',
      icono: '✂️'
    }
  });

  const categoriaManicura = await prisma.categoria.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      nombre: 'Manicura y Pedicura',
      descripcion: 'Cuidado completo de manos y pies',
      icono: '💅'
    }
  });

  const categoriaMasaje = await prisma.categoria.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      nombre: 'Masajes Relajantes',
      descripcion: 'Relájate con nuestros masajes profesionales',
      icono: '💆'
    }
  });

  console.log('✅ Created categories');

  // Create services
  const servicios = [
    {
      nombre: 'Limpieza Facial Profunda',
      descripcion: 'Tratamiento completo de limpieza facial con extracción de impurezas y mascarilla hidratante. Ideal para pieles mixtas y grasas.',
      precio: 45.00,
      duracionMin: 60,
      categoriaId: 1,
      fotoUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600'
    },
    {
      nombre: 'Hidratación Facial',
      descripcion: 'Tratamiento intensivo de hidratación con ácido hialurónico y vitaminas. Deja tu piel suave y luminosa.',
      precio: 55.00,
      duracionMin: 45,
      categoriaId: 1,
      fotoUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600'
    },
    {
      nombre: 'Corte Dama',
      descripcion: 'Corte de cabello profesional con lavado y styling. Incluye consulta para encontrar el estilo perfecto para ti.',
      precio: 35.00,
      duracionMin: 45,
      categoriaId: 2,
      fotoUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600'
    },
    {
      nombre: 'Corte Caballero',
      descripcion: 'Corte de cabello masculino con lavado y arreglo de barba opcional. Estilo moderno y personalizado.',
      precio: 25.00,
      duracionMin: 30,
      categoriaId: 2,
      fotoUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600'
    },
    {
      nombre: 'Manicura Gel',
      descripcion: 'Manicura completa con esmalte semipermanente que dura hasta 3 semanas. Incluye cuidado de cutículas.',
      precio: 30.00,
      duracionMin: 60,
      categoriaId: 3,
      fotoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600'
    },
    {
      nombre: 'Pedicura Spa',
      descripcion: 'Pedicura relajante con exfoliación, masaje de pies y esmalte de tu elección. Incluye remojo con sales minerales.',
      precio: 40.00,
      duracionMin: 75,
      categoriaId: 3,
      fotoUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600'
    },
    {
      nombre: 'Masaje Relajante',
      descripcion: 'Masaje de cuerpo completo con aceites esenciales. Relaja tus músculos y reduce el estrés.',
      precio: 60.00,
      duracionMin: 60,
      categoriaId: 4,
      fotoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600'
    },
    {
      nombre: 'Masaje con Piedras Calientes',
      descripcion: 'Terapia con piedras volcánicas calientes que alivian la tensión muscular y mejoran la circulación.',
      precio: 75.00,
      duracionMin: 90,
      categoriaId: 4,
      fotoUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600'
    }
  ];

  for (const servicio of servicios) {
    await prisma.servicio.upsert({
      where: { id: servicios.indexOf(servicio) + 1 },
      update: {},
      create: servicio
    });
  }
  console.log('✅ Created services');

  // Create promotions
  const promociones = [
    {
      titulo: 'Pack Belleza Completo',
      descripcion: 'Incluye limpieza facial, manicura gel y masaje relajante. ¡Ahorra 30€!',
      descuento: 22,
      fotoUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600'
    },
    {
      titulo: 'Combo Corte + Manicura',
      descripcion: 'Corte de cabello y manicura gel por un precio especial. Perfecto para renovar tu look.',
      descuento: 23,
      fotoUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600'
    },
    {
      titulo: 'Día de Spa',
      descripcion: 'Pedicura spa, masaje con piedras y tratamiento facial. ¡Dedícate un día completo!',
      descuento: 21,
      fotoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600'
    }
  ];

  for (const promocion of promociones) {
    await prisma.promocion.upsert({
      where: { id: promociones.indexOf(promocion) + 1 },
      update: {},
      create: promocion
    });
  }
  console.log('✅ Created promotions');

  // Create contact information
  const contacto = await prisma.contacto.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      direccion: 'Via della Bellezza 123, 20121 Milano, Italia',
      telefono: '+39 02 1234 5678',
      email: 'info@bonifaciobeauty.com',
      horario: 'Lunes - Viernes: 9:00 - 19:00\nSábado: 9:00 - 18:00\nDomingo: Cerrado'
    }
  });
  console.log('✅ Created contact information');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
