// Proyectos del portfolio. Los datos salen del CV (nov. 2026).
// `featured`: casos grandes con resultados. `more`: grilla chica de abajo.

export const featured = [
  {
    slug: 'conexo-patagonico',
    name: 'Conexo Patagónico',
    image: '/projects/conexo-patagonico.webp',
    imageFit: 'cover',
    link: { es: 'https://conexopatagonico.com.ar/', en: 'https://conexopatagonico.com.ar/' },
    linkType: 'site',
    stack: ['Next.js 16', 'TypeScript', 'MySQL', 'Drizzle', 'Brevo', 'Gemini'],
    es: {
      kind: 'Web + panel de gestión · Cliente · 2026',
      tagline: 'Revista técnica para instaladores y gasistas',
      summary:
        'Web nueva que reemplazó su tienda en Tiendanube, y un panel a medida que centraliza todo: subir revistas y planillas de inspección, auspiciantes con informes mes a mes, contactos y envíos de mail con Brevo. La IA pasa las fotos de las planillas a tablas que se buscan por apellido, calle o cuenta. El panel se instala en el celular y está pensado para usuarios de 40 a 80 años.',
      metrics: [
        { value: '8.700+', label: 'contactos unificados' },
        { value: '62 → 94', label: 'velocidad (Lighthouse)' },
        { value: '–48%', label: 'peso de los PDF' },
      ],
    },
    en: {
      kind: 'Website + admin panel · Client · 2026',
      tagline: 'Trade magazine for gas and HVAC installers',
      summary:
        'A new website that replaced their Tiendanube store, plus a custom admin panel that brings everything together: magazine issues, inspection schedules, sponsors with monthly reports, contacts and email campaigns through Brevo. AI turns photos of the schedules into tables searchable by name, street or account. The panel installs on a phone and is designed for users aged 40 to 80.',
      metrics: [
        { value: '8,700+', label: 'contacts unified' },
        { value: '62 → 94', label: 'performance (Lighthouse)' },
        { value: '–48%', label: 'PDF file size' },
      ],
    },
  },
  {
    slug: 'current-wildfires',
    name: 'Current Wildfires',
    image: '/projects/current-wildfires.webp',
    imageFit: 'cover',
    link: { es: 'https://currentwildfires.com/es/', en: 'https://currentwildfires.com/' },
    linkType: 'site',
    stack: ['Astro', 'PHP 8', 'MySQL', 'MapLibre', 'Gemini'],
    es: {
      kind: 'Producto propio · 2026',
      tagline: 'Mapa mundial de incendios en tiempo real',
      summary:
        'Mapa en vivo con datos de la NASA y agencias oficiales, en inglés y español. Se viralizó en temporada de incendios y hoy se sostiene con SEO programático: un motor decide qué incendio merece su propia página según la demanda real.',
      metrics: [
        { value: '800K+', label: 'usuarios en 2026' },
        { value: '1,6M', label: 'vistas de página' },
        { value: '561K', label: 'clics desde Google' },
      ],
    },
    en: {
      kind: 'Own product · 2026',
      tagline: 'Real-time global wildfire map',
      summary:
        'A live map fed by NASA and official agency data, in English and Spanish. It went viral during fire season and now grows through programmatic SEO: an engine decides which fires get their own page based on real demand.',
      metrics: [
        { value: '800K+', label: 'users in 2026' },
        { value: '1.6M', label: 'page views' },
        { value: '561K', label: 'clicks from Google' },
      ],
    },
  },
  {
    slug: 'lumisol',
    name: 'Lumisol',
    image: '/projects/lumisol.webp',
    imageFit: 'contain',
    imageBg: 'linear-gradient(160deg,#fbeadb 0%,#f3d3c7 55%,#dcc0d6 100%)',
    link: {
      es: 'https://apps.apple.com/app/id6829004031',
      en: 'https://apps.apple.com/app/id6829004031',
    },
    linkType: 'appStore',
    stack: ['SwiftUI', 'WidgetKit', 'ActivityKit', 'WeatherKit', 'StoreKit 2'],
    es: {
      kind: 'App de iOS propia · 2026',
      tagline: 'Índice UV y protección solar en tu iPhone',
      summary:
        'App con widgets, Live Activity y controles del Centro de control. Del primer commit a la App Store en 25 días, con modelo freemium, ficha en tres idiomas y aprobada por Apple sin rechazos.',
      metrics: [
        { value: '175', label: 'países en App Store' },
        { value: '12', label: 'widgets' },
        { value: '25', label: 'días hasta publicarla' },
      ],
    },
    en: {
      kind: 'Own iOS app · 2026',
      tagline: 'UV index and sun protection on your iPhone',
      summary:
        'An app with widgets, a Live Activity and Control Center controls. From first commit to the App Store in 25 days, with a freemium model, a listing in three languages and Apple approval with no rejections.',
      metrics: [
        { value: '175', label: 'App Store countries' },
        { value: '12', label: 'widgets' },
        { value: '25', label: 'days to launch' },
      ],
    },
  },
  {
    slug: 'ferreteria-chacon',
    name: 'Ferretería Chacón',
    image: '/projects/ferreteria-chacon.webp',
    imageFit: 'cover',
    link: null,
    stack: ['React (PWA)', 'Node.js', 'PostgreSQL', 'AFIP', 'Gemini'],
    es: {
      kind: 'Sistema a medida · Cliente',
      tagline: 'Sistema de gestión con facturación electrónica',
      summary:
        'Ventas, presupuestos, remitos, stock y cuentas corrientes, con Factura A y B de AFIP. Un lector con IA carga las listas de precios de los proveedores desde PDF, Excel o fotos, sin tipear nada.',
      metrics: [
        { value: '29.176', label: 'productos cargados con IA' },
        { value: '31', label: 'proveedores' },
        { value: 'A y B', label: 'facturas AFIP con QR' },
      ],
    },
    en: {
      kind: 'Custom system · Client',
      tagline: 'Business management system with e-invoicing',
      summary:
        'Sales, quotes, delivery notes, inventory and customer accounts, with official AFIP Type A and B invoices. An AI reader imports supplier price lists from PDF, Excel or photos, with no manual typing.',
      metrics: [
        { value: '29,176', label: 'products imported by AI' },
        { value: '31', label: 'suppliers' },
        { value: 'A & B', label: 'AFIP invoices with QR' },
      ],
    },
  },
  {
    slug: 'black-river',
    name: 'Black River Properties',
    image: '/projects/black-river.webp',
    imageFit: 'cover',
    link: { es: 'https://propertiesblackriver.com/', en: 'https://propertiesblackriver.com/' },
    linkType: 'site',
    stack: ['Astro', 'TypeScript', 'Tailwind', 'React', 'TeraCRM'],
    es: {
      kind: 'Sitio web · Cliente · Uruguay',
      tagline: 'Inmobiliaria para clientes internacionales',
      summary:
        'Sitio bilingüe conectado al CRM en los dos sentidos: las propiedades se actualizan solas desde el CRM y cada consulta llega como lead al instante, con aviso por mail al asesor. Publicación automática con respaldo y vuelta atrás.',
      metrics: [
        { value: 'ES / EN', label: 'sitio bilingüe' },
        { value: '2 vías', label: 'integración con el CRM' },
        { value: 'Auto', label: 'deploy con respaldo' },
      ],
    },
    en: {
      kind: 'Website · Client · Uruguay',
      tagline: 'Real estate for international clients',
      summary:
        'A bilingual site with a two-way CRM integration: listings update themselves from the CRM and every inquiry arrives as a lead instantly, with an email to the agent. Automated deployment with backups and rollback.',
      metrics: [
        { value: 'ES / EN', label: 'bilingual site' },
        { value: '2-way', label: 'CRM integration' },
        { value: 'Auto', label: 'deploys with backup' },
      ],
    },
  },
]

export const more = [
  {
    name: 'La Casa de Hunter',
    image: '/projects/la-casa-de-hunter.webp',
    link: 'https://lacasadehunter.com/',
    es: { kind: 'Sitio web · Cabañas en Villa Pehuenia' },
    en: { kind: 'Website · Cabins in Patagonia' },
  },
  {
    name: 'Patagonia Inversiones',
    image: '/projects/patagonia-inversiones.webp',
    link: null,
    es: { kind: 'Landing page' },
    en: { kind: 'Landing page' },
  },
  {
    name: 'Taller de Pintura',
    image: '/projects/taller-pintura.webp',
    link: null,
    es: { kind: 'App de gestión · Cobros y turnos' },
    en: { kind: 'Management app · Payments & classes' },
  },
]
