import type { Locale } from './site';

export const portfolioCopy = {
  de: {
    nav: {
      about: 'Über mich',
      projects: 'Projekte',
      blog: 'Blog',
      skills: 'Fähigkeiten',
      contact: 'Kontakt',
    },
    hero: {
      title: 'Hücki',
      subtitle: 'Fullstack Entwickler | Architekt | KI',
      cta: 'Blog lesen',
    },
    about: {
      title: 'Über mich',
      stat: 'Jahre Berufserfahrung',
      p1: 'Ich bin Softwarearchitekt und Entwickler aus Leidenschaft, immer auf der Suche nach dem elegantesten Weg von A nach B. Mein Ziel ist es, Komplexes so einfach zu machen, dass es Spaß macht, und Code zu schreiben, der auch in sechs Monaten noch verständlich ist.',
      p2: 'Ich gestalte digitale Erlebnisse, die technische Tiefe, saubere Architektur und klare Nutzerführung verbinden.',
      aiTitle: 'Mein Ansatz ist AI first.',
      aiText: 'Ich nutze KI, um schneller, besser und innovativer zu bauen: für Software, die heute schon im Morgen lebt.',
    },
    projectsTitle: 'Open Source Spaß Projekte',
    brandsTitle: 'Marken, die mir vertrauen',
    brandsSubtitle: 'Einblicke in meine Kernverantwortlichkeiten bei führenden Unternehmen.',
    funTitle: 'Fun Facts',
    funSubtitle: 'Ein paar Dinge, die Sie vielleicht noch nicht über mich wussten.',
    skillsTop: 'Top-Fähigkeiten',
    skillsAdditional: 'Zusätzliche Fähigkeiten',
    skillsIndustries: 'Branchenkenntnisse',
    contact: 'Kontakt',
    copyright: 'Hücki. Alle Rechte vorbehalten.',
    blog: {
      eyebrow: 'SEO/GEO Blog',
      title: 'AI-first Engineering Blog',
      description:
        'Praxisnahe Artikel über KI, Softwarearchitektur, Growth Engineering und suchmaschinenfreundliche Inhalte für Menschen und generative Engines.',
      readMore: 'Artikel lesen',
      latest: 'Neueste Artikel',
      summary: 'Kurzantwort',
      sources: 'Quellen und weiterführende Hinweise',
    },
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      blog: 'Blog',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      title: 'Hücki',
      subtitle: 'Senior Software Developer | Architect | AI',
      cta: 'Read the blog',
    },
    about: {
      title: 'About Me',
      stat: 'Years of professional experience',
      p1: 'I am a software architect and developer with a passion for elegant, efficient, and scalable systems. My goal is to translate complex problems into maintainable software that creates practical business value.',
      p2: 'I build digital experiences that combine technical depth, clean architecture, and clear user journeys.',
      aiTitle: 'My approach is AI first.',
      aiText: 'I use AI to automate, accelerate, and improve development workflows so software can move closer to tomorrow.',
    },
    projectsTitle: 'Public Projects',
    brandsTitle: 'Trusted by these Brands',
    brandsSubtitle: 'Insights into my core responsibilities at leading companies.',
    funTitle: 'Fun Facts',
    funSubtitle: 'A few things you might not know about me.',
    skillsTop: 'Top Skills',
    skillsAdditional: 'Additional Skills',
    skillsIndustries: 'Industry Knowledge',
    contact: 'Contact',
    copyright: 'Hücki. All rights reserved.',
    blog: {
      eyebrow: 'SEO/GEO Blog',
      title: 'AI-first Engineering Blog',
      description:
        'Practical articles about AI, software architecture, growth engineering, and content that works for humans and generative engines.',
      readMore: 'Read article',
      latest: 'Latest Articles',
      summary: 'Short Answer',
      sources: 'Sources and further reading',
    },
  },
} satisfies Record<Locale, Record<string, unknown>>;

export const projects = [
  {
    id: 'derplanner-ai',
    title: 'DerPlanner AI',
    subtitle: { de: 'Der teilbare Aufgaben-Event-Planer', en: 'The Shareable Task Event Planner' },
    description: {
      de: 'Eine KI-gestützte Planungsanwendung, die Aufgaben in natürlicher Sprache strukturiert, priorisiert und planbar macht.',
      en: 'An AI-powered planning application that structures, prioritizes, and schedules natural-language tasks.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Genkit AI', 'Firebase'],
    imageUrl: 'https://placehold.co/1600x900/111827/f9fafb/png?text=DerPlanner+AI',
    url: 'https://derplanner.space/',
    githubUrl: 'https://github.com/DomEscobar/DerPlanner',
  },
  {
    id: '1000-prototypes',
    title: '1000 Prototypes',
    subtitle: { de: 'Parallele Ausführung von KI-Agenten', en: 'Run multiple AI agents in parallel' },
    description: {
      de: 'Eine Plattform, um mehrere KI-Agenten parallel Prototypen für Websites, Bilder, Blogposts und mehr erstellen zu lassen.',
      en: 'A platform for running multiple AI agents in parallel to prototype websites, images, blog posts, and more.',
    },
    tech: ['Next.js', 'Genkit AI', 'Firebase', 'Vercel'],
    imageUrl: 'https://placehold.co/1600x900/1f2937/fbbf24/png?text=1000+Prototypes',
    url: 'https://1000prototypes.space/',
    githubUrl: 'https://github.com/DomEscobar/1000prototypes',
  },
  {
    id: 'pdf-editor',
    title: 'PDF Editor',
    subtitle: { de: 'Super einfacher PDF-Editor', en: 'Super Simple PDF Editor' },
    description: {
      de: 'Ein unkomplizierter PDF-Editor zum Kommentieren, Zeichnen und Signieren direkt im Browser.',
      en: 'A simple browser-based PDF editor for annotation, drawing, and signing.',
    },
    tech: ['React', 'TypeScript', 'PDF-lib', 'Tailwind CSS'],
    imageUrl: 'https://placehold.co/1600x900/7f1d1d/fef2f2/png?text=PDF+Editor',
    url: 'https://annotate-draw-sign.lovable.app/',
    githubUrl: 'https://github.com/DomEscobar/PDF_Simple',
  },
  {
    id: 'crm-board',
    title: 'CRM Canvas Board',
    subtitle: { de: 'Ein Werkzeug zur Workflow-Visualisierung', en: 'A workflow visualization tool' },
    description: {
      de: 'Ein intuitives CRM-Board zur Visualisierung und Verwaltung von Arbeitsabläufen per Drag-and-Drop.',
      en: 'An intuitive CRM board for visualizing and managing workflows with drag-and-drop interactions.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'dnd-kit'],
    imageUrl: 'https://placehold.co/1600x900/064e3b/ecfdf5/png?text=CRM+Canvas+Board',
    url: 'https://canvas-flow-insights.lovable.app/',
    githubUrl: 'https://github.com/DomEscobar/CRM_Canva_Board',
  },
];

export const skills = {
  de: {
    top: ['KI', 'Software Architektur', 'Fullstack', 'KI Beratung', 'Growth Hacking'],
    additional: ['Backend Service-Entwicklung', 'Externe API-Integration', 'Frontend Interface-Entwicklung', 'SEO-Optimierung', 'Testing & Qualitätssicherung', 'Artificial Intelligence', 'Softwareentwicklung', 'IT-Architektur', 'Web Scraping', 'ETL-Prozesse', 'Datenschutz', 'Serverless Computing', 'Angular', 'Vue.js', 'TypeScript', 'React.js', 'Node.js', 'n8n'],
    industries: ['Digitale & IT-Dienstleistungen', 'E-Commerce', 'Digitale Geschäftsmodelle'],
  },
  en: {
    top: ['AI', 'Software Architecture', 'Fullstack', 'AI Consulting', 'Growth Hacking'],
    additional: ['Backend Service Development', 'External API Integration', 'Frontend Interface Development', 'SEO Optimization', 'Testing & Quality Assurance', 'Artificial Intelligence', 'Software Development', 'IT Architecture', 'Web Scraping', 'ETL Processes', 'Data Privacy', 'Serverless Computing', 'Angular', 'Vue.js', 'TypeScript', 'React.js', 'Node.js', 'n8n'],
    industries: ['Digital & IT Services', 'E-Commerce', 'Digital Business Models'],
  },
} satisfies Record<Locale, { top: string[]; additional: string[]; industries: string[] }>;

export const brands = [
  {
    name: 'Lidl',
    role: { de: 'Softwarearchitekt & Full-Stack Entwickler', en: 'Software Architect & Full-Stack Developer' },
    description: {
      de: 'Betreuung und Weiterentwicklung digitaler Plattformen mit Fokus auf Skalierbarkeit, Performance und kundenorientierte Features.',
      en: 'Managed and enhanced digital platforms with a focus on scalability, performance, and customer-centric features.',
    },
  },
  {
    name: 'VEGA',
    role: { de: 'Architekt & Lead Entwickler', en: 'Architect & Lead Developer' },
    description: {
      de: 'Konzeption und Entwicklung eines komplexen internen ERP-Lagersystems zur Optimierung logistischer Prozesse.',
      en: 'Designed and developed a complex internal ERP warehouse system to optimize logistics processes.',
    },
  },
  {
    name: 'StackIT / Schwarz Digits',
    role: { de: 'Cloud & Software Architekt', en: 'Cloud & Software Architect' },
    description: {
      de: 'Architektur cloud-nativer Anwendungen auf der StackIT-Plattform mit robusten und sicheren Systemlandschaften.',
      en: 'Architected cloud-native applications on the StackIT platform with robust and secure system landscapes.',
    },
  },
  {
    name: 'Deutsches Rotes Kreuz',
    role: { de: 'Lead Entwickler & Berater', en: 'Lead Developer & Consultant' },
    description: {
      de: 'Technische Leitung bei der Modernisierung von Web-Plattformen und internen Anwendungen.',
      en: 'Provided technical leadership while modernizing web platforms and internal applications.',
    },
  },
];

export const funFacts = {
  de: [
    'Lebt im Dark Mode. Das echte Sonnenlicht ist oft zu hell.',
    'Liest Code wie andere die Zeitung, braucht dafür aber genauso viel Kaffee.',
    'Spricht mit KI-Modellen manchmal höflicher als mit echten Menschen.',
  ],
  en: [
    'Lives in Dark Mode. Real sunlight is often too bright.',
    'Reads code like others read the newspaper, but needs just as much coffee for it.',
    'Sometimes speaks to AI models more politely than to real people.',
  ],
} satisfies Record<Locale, string[]>;
