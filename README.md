# BonifacioBeauty - Full-Stack Web Application

Proyecto full-stack para el salón de belleza BonifacioBeauty en Milano, Italia.

## Stack Tecnológico

### Backend
- **Node.js** con Express
- **Prisma ORM** para gestión de base de datos
- **PostgreSQL** como base de datos
- **CORS** para habilitar peticiones cross-origin

### Frontend
- **Angular 18** (Standalone components)
- **TypeScript**
- **HttpClient** para comunicación con la API
- **CSS** con variables CSS para theming

## Estructura del Proyecto

```
PageBonifacioBeauty_1/
├── bonifacio-backend/          # Backend API
│   ├── src/
│   │   ├── index.js           # Servidor Express principal
│   │   └── routes/            # Rutas API
│   │       ├── servicios.js   # Endpoint de servicios
│   │       ├── categorias.js  # Endpoint de categorías
│   │       ├── promociones.js # Endpoint de promociones
│   │       ├── contacto.js    # Endpoint de contacto
│   │       └── inicio.js      # Endpoint de página inicio
│   ├── prisma/
│   │   └── schema.prisma      # Esquema de base de datos
│   ├── package.json
│   └── .env                   # Variables de entorno
│
└── bonifacio-frontend/         # Frontend Angular
    ├── src/
    │   ├── app/
    │   │   ├── core/          # Servicios centrales
    │   │   │   └── services/
    │   │   │       └── api.service.ts
    │   │   ├── shared/        # Componentes reutilizables
    │   │   │   ├── components/
    │   │   │   │   ├── servicio-card/
    │   │   │   │   ├── promocion-card/
    │   │   │   │   └── whatsapp-button/
    │   │   ├── layout/        # Componentes de layout
    │   │   │   ├── header/
    │   │   │   └── footer/
    │   │   └── features/      # Módulos de características
    │   │       ├── inicio/
    │   │       ├── promociones/
    │   │       ├── servicios/
    │   │       ├── nosotros/
    │   │       ├── ubicacion/
    │   │       └── servicio-detalle/
    │   ├── main.ts
    │   ├── index.html
    │   └── styles.css
    ├── package.json
    └── angular.json
```

## Modelo de Base de Datos

### Tablas Principales

- **PaginaInicio**: Contenido de la página principal
- **Categoria**: Categorías de servicios (facial, corte, manicura, etc.)
- **Servicio**: Servicios individuales con precio, duración y categoría
- **Promocion**: Promociones especiales con descuento
- **Contacto**: Información de contacto del salón

## Configuración del Backend

### 1. Instalar dependencias

```bash
cd bonifacio-backend
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en `bonifacio-backend/`:

```
DATABASE_URL="postgresql://usuario:password@localhost:5432/bonifaciobeauty?schema=public"
PORT=3000
```

### 3. Generar cliente Prisma y migraciones

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Iniciar servidor

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Configuración del Frontend

### 1. Instalar dependencias

```bash
cd bonifacio-frontend
npm install
```

### 2. Iniciar servidor de desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Endpoints de la API

### Servicios
- `GET /api/servicios` - Obtener todos los servicios activos
- `GET /api/servicios/:id` - Obtener servicio por ID
- `GET /api/servicios/categoria/:categoriaId` - Obtener servicios por categoría

### Categorías
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/:id` - Obtener categoría por ID

### Promociones
- `GET /api/promociones` - Obtener todas las promociones activas
- `GET /api/promociones/:id` - Obtener promoción por ID

### Contacto
- `GET /api/contacto` - Obtener información de contacto

### Inicio
- `GET /api/inicio` - Obtener contenido de página inicio

## Componentes del Frontend

### Layout
- **Header**: Navegación transparente con logo y enlaces
- **Footer**: Footer oscuro con información de contacto y redes sociales

### Shared
- **ServicioCard**: Tarjeta reutilizable para mostrar servicios
- **PromocionCard**: Tarjeta para mostrar promociones con badge de descuento
- **WhatsappButton**: Botón flotante de WhatsApp global

### Features
- **Inicio**: Hero section y promociones destacadas
- **Promociones**: Página completa de promociones
- **Servicios**: Catálogo de servicios por categorías
- **Nosotros**: Historia del salón con características
- **Ubicación**: Información de contacto y mapa
- **ServicioDetalle**: Página de detalle de servicio individual

## Estilos y Tema

### Variables CSS
- `--primary-pink`: Color principal rosa (#E91E63)
- `--primary-pink-dark`: Rosa oscuro (#C2185B)
- `--primary-pink-light`: Rosa claro (#F8BBD0)
- `--dark-bg`: Fondo oscuro (#1a1a1a)
- `--light-bg`: Fondo claro (#f5f5f5)
- `--whatsapp-green`: Verde de WhatsApp (#25D366)

### Responsive Design
El diseño es completamente responsive con breakpoints en 768px para dispositivos móviles.

## Scripts Disponibles

### Backend
- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo
- `npm run prisma:generate` - Generar cliente Prisma
- `npm run prisma:migrate` - Ejecutar migraciones
- `npm run prisma:studio` - Abrir Prisma Studio

### Frontend
- `npm start` - Iniciar servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm run watch` - Modo watch para desarrollo

## Notas Importantes

1. **Base de Datos**: Asegúrate de tener PostgreSQL instalado y configurado antes de ejecutar las migraciones.

2. **CORS**: El backend está configurado para aceptar peticiones desde cualquier origen. En producción, configura los orígenes permitidos.

3. **Imágenes**: Las URLs de imágenes en la base de datos deben ser URLs públicas o configurar un servidor de archivos.

4. **WhatsApp**: El número de WhatsApp está configurado como placeholder. Actualízalo con el número real del salón.

## Próximos Pasos

1. Configurar base de datos PostgreSQL
2. Ejecutar migraciones de Prisma
3. Poblar la base de datos con datos iniciales
4. Configurar número de WhatsApp real
5. Actualizar URLs de imágenes
6. Desplegar en producción

## Licencia

ISC
