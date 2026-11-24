// Textos de la web en español e inglés.
// Para cambiar un texto, editalo en los dos idiomas.

export const languages = { es: 'Español', en: 'English' }

export const paths = { es: '/', en: '/en/' }

export const cvFiles = {
  es: '/cv/Imanol-Castro-Gamero-CV-ES.pdf',
  en: '/cv/Imanol-Castro-Gamero-CV-EN.pdf',
}

export const ui = {
  es: {
    meta: {
      title: 'ICA | Desarrollo Web & Soluciones Digitales',
      description:
        'Soy Imanol Castro, desarrollador full-stack. Hago sitios web, sistemas de gestión y apps con IA, desde la primera idea hasta producción.',
      ogLocale: 'es_AR',
      keywords:
        'desarrollo web, diseño web, landing page, sistema a medida, páginas web, Argentina, programación web, sitios web, inteligencia artificial, facturación electrónica',
    },
    nav: {
      services: 'Servicios',
      portfolio: 'Proyectos',
      process: 'Proceso',
      contact: 'Contacto',
      cv: 'CV',
      cvTitle: 'Ver CV (PDF)',
      switchTo: 'English',
      menu: 'Abrir menú',
      close: 'Cerrar menú',
      home: 'ICA, inicio',
    },
    hero: {
      title: 'Sitios, sistemas y apps que se usan todos los días.',
      subtitle:
        'Soy Imanol Castro, desarrollador full-stack. Diseño y programo cada proyecto desde la primera idea hasta que está en producción, y después lo sigo cuidando.',
      cta: 'Contame tu proyecto',
      secondary: 'Ver proyectos',
    },
    services: {
      title: 'Qué hago',
      intro: 'Cada proyecto es a medida. Estos son los que más hago.',
      example: 'Por ejemplo',
      items: [
        {
          title: 'Landing pages',
          description: 'Una página enfocada en que el visitante te escriba o te compre. Rápida, clara y medible.',
          example: 'Patagonia Inversiones',
        },
        {
          title: 'Sitios web',
          description: 'El sitio completo de tu negocio, en uno o más idiomas, conectado a tu CRM o a tus herramientas.',
          example: 'Black River Properties',
        },
        {
          title: 'Sistemas de gestión',
          description: 'Ventas, stock, facturación electrónica, paneles para tu equipo. Lo que hoy hacés en planillas, en un solo lugar.',
          example: 'Ferretería Chacón, Conexo',
        },
        {
          title: 'Apps y productos con IA',
          description: 'Apps de iPhone y productos web que usan IA donde ahorra trabajo de verdad: leer documentos, resumir, ordenar datos.',
          example: 'Lumisol, Current Wildfires',
        },
        {
          title: 'Mantenimiento',
          description: 'Hosting, dominio, correo, actualizaciones y copias de seguridad. Si algo falla, me ocupo yo.',
          example: 'Todos mis clientes',
        },
      ],
    },
    portfolio: {
      title: 'Proyectos',
      intro: 'Productos propios y trabajos para clientes. Todos están en uso.',
      stack: 'Tecnologías',
      visit: 'Ver sitio',
      appStore: 'Ver en App Store',
      private: 'Sistema privado del cliente',
      wip: 'En desarrollo',
      demo: 'Capturas con datos de demostración',
      moreTitle: 'Más trabajos',
      cvTitle: '¿Querés el detalle completo?',
      cvText: 'En mi CV están mi experiencia, los proyectos y las tecnologías con las que trabajo.',
      cvPrimary: 'Ver CV en español',
      cvSecondary: 'CV in English',
    },
    process: {
      title: 'Cómo trabajo',
      intro: 'Cuatro pasos, y en cada uno ves avances reales antes de seguir.',
      steps: [
        {
          title: 'Entender',
          description: 'Me contás qué necesitás. Miro tu negocio y tu competencia, y te propongo qué hacer y cuánto cuesta.',
        },
        {
          title: 'Diseñar',
          description: 'Te muestro cómo va a quedar antes de programar, y lo ajustamos juntos.',
        },
        {
          title: 'Programar',
          description: 'Lo construyo con pruebas automáticas y te paso una versión para que la uses antes de publicar.',
        },
        {
          title: 'Publicar y cuidar',
          description: 'Lo pongo en línea con analítica y SEO, y me quedo a cargo del mantenimiento.',
        },
      ],
    },
    contact: {
      title: '¿Tenés un proyecto en mente?',
      intro: 'Contame qué necesitás y te respondo en menos de 24 horas.',
      whatsappHint: 'La forma más rápida',
      emailHint: 'Email',
      phoneHint: 'Teléfono',
      locationHint: 'Ubicación',
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Email',
      emailPlaceholder: 'tu@email.com',
      message: 'Mensaje',
      messagePlaceholder: 'Qué necesitás, para cuándo y cualquier dato que sirva',
      success: 'Mensaje enviado. Te respondo en menos de 24 horas.',
      error: 'No se pudo enviar. Escribime por WhatsApp o a contacto@icaweb.dev.',
      sending: 'Enviando…',
      send: 'Enviar mensaje',
      subject: 'Nuevo mensaje de',
    },
    footer: { rights: 'Todos los derechos reservados' },
    whatsapp: {
      aria: 'Escribime por WhatsApp',
      text: 'Hola! Vi tu web y me interesa un proyecto.',
    },
  },

  en: {
    meta: {
      title: 'ICA | Web Development & Digital Solutions',
      description:
        "I'm Imanol Castro, a full-stack developer. I build websites, business systems and AI-powered apps, from the first idea to production.",
      ogLocale: 'en_US',
      keywords:
        'web development, web design, landing page, custom software, websites, Argentina, AI, full-stack developer, iOS app',
    },
    nav: {
      services: 'Services',
      portfolio: 'Work',
      process: 'Process',
      contact: 'Contact',
      cv: 'CV',
      cvTitle: 'View CV (PDF)',
      switchTo: 'Español',
      menu: 'Open menu',
      close: 'Close menu',
      home: 'ICA, home',
    },
    hero: {
      title: 'Websites, systems and apps people use every day.',
      subtitle:
        "I'm Imanol Castro, a full-stack developer. I design and build every project from the first idea all the way to production, and I keep looking after it afterwards.",
      cta: 'Tell me about your project',
      secondary: 'See my work',
    },
    services: {
      title: 'What I do',
      intro: 'Every project is custom. These are the ones I do most.',
      example: 'For example',
      items: [
        {
          title: 'Landing pages',
          description: 'One page built to get visitors to contact you or buy. Fast, clear and measurable.',
          example: 'Patagonia Inversiones',
        },
        {
          title: 'Websites',
          description: 'Your full business website, in one or more languages, connected to your CRM or your tools.',
          example: 'Black River Properties',
        },
        {
          title: 'Business systems',
          description: 'Sales, inventory, electronic invoicing, dashboards for your team. What you now do in spreadsheets, in one place.',
          example: 'Ferretería Chacón, Conexo',
        },
        {
          title: 'Apps and AI products',
          description: 'iPhone apps and web products that use AI where it really saves work: reading documents, summarizing, organizing data.',
          example: 'Lumisol, Current Wildfires',
        },
        {
          title: 'Maintenance',
          description: 'Hosting, domain, email, updates and backups. If something breaks, I handle it.',
          example: 'All of my clients',
        },
      ],
    },
    portfolio: {
      title: 'Work',
      intro: 'My own products and client work. All of it is in use.',
      stack: 'Stack',
      visit: 'Visit site',
      appStore: 'View on the App Store',
      private: 'Private client system',
      wip: 'In development',
      demo: 'Screenshots use demo data',
      moreTitle: 'More work',
      cvTitle: 'Want the full picture?',
      cvText: 'My CV covers my experience, projects and the technologies I work with.',
      cvPrimary: 'View CV in English',
      cvSecondary: 'CV en español',
    },
    process: {
      title: 'How I work',
      intro: 'Four steps, and at each one you see real progress before we move on.',
      steps: [
        {
          title: 'Understand',
          description: 'You tell me what you need. I look at your business and competitors and propose what to build and what it costs.',
        },
        {
          title: 'Design',
          description: 'I show you how it will look before writing code, and we refine it together.',
        },
        {
          title: 'Build',
          description: 'I build it with automated tests and give you a version to try before it goes live.',
        },
        {
          title: 'Launch and look after',
          description: 'I put it online with analytics and SEO, and I take care of maintenance.',
        },
      ],
    },
    contact: {
      title: 'Got a project in mind?',
      intro: "Tell me what you need and I'll get back to you within 24 hours.",
      whatsappHint: 'Fastest way to reach me',
      emailHint: 'Email',
      phoneHint: 'Phone',
      locationHint: 'Location',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      message: 'Message',
      messagePlaceholder: 'What you need, by when, and anything else that helps',
      success: "Message sent. I'll reply within 24 hours.",
      error: "Couldn't send it. Reach me on WhatsApp or at contacto@icaweb.dev.",
      sending: 'Sending…',
      send: 'Send message',
      subject: '[EN] Nuevo mensaje de',
    },
    footer: { rights: 'All rights reserved' },
    whatsapp: {
      aria: 'Message me on WhatsApp',
      text: "Hi! I saw your website and I'm interested in a project.",
    },
  },
}
