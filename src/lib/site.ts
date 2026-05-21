export const defaultLocale = 'de' as const;
export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];

export const siteUrl =
  import.meta.env.SITE_URL ||
  import.meta.env.PUBLIC_SITE_URL ||
  'https://huecki.com';

export const person = {
  name: 'Dominic Hückmann',
  displayName: 'huecki',
  jobTitle: 'Senior Software Developer & AI Architect',
  email: 'd.hueckmann@googlemail.com',
  image: '/dominic-h.png',
  sameAs: [
    'https://www.linkedin.com/in/dominic-h%C3%BCckmann-2b9499173',
    'https://github.com/DomEscobar',
  ],
};

export const seoDefaults = {
  de: {
    title: 'huecki | OpenClaw, Hermes und AI-first Workflows',
    description:
      'Blog über OpenClaw, Hermes, Softwarearchitektur, Automatisierung und praktische AI-first Workflows.',
  },
  en: {
    title: 'huecki | OpenClaw, Hermes, and AI-first Workflows',
    description:
      'Blog about OpenClaw, Hermes, software architecture, automation, and practical AI-first workflows.',
  },
} satisfies Record<Locale, { title: string; description: string }>;

export function localizedPath(locale: Locale, path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return normalized === '/' ? `/${locale}/` : `/${locale}${normalized}`;
}

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}

export function alternateUrls(path = '/') {
  return {
    de: absoluteUrl(localizedPath('de', path)),
    en: absoluteUrl(localizedPath('en', path)),
  };
}

export function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function baseJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: person.name,
      alternateName: person.displayName,
      jobTitle: person.jobTitle,
      email: `mailto:${person.email}`,
      image: absoluteUrl(person.image),
      url: siteUrl,
      sameAs: person.sameAs,
      knowsAbout: [
        'Software Architecture',
        'Fullstack Development',
        'Artificial Intelligence',
        'Generative AI',
        'Cloud Native Applications',
        'SEO Optimization',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'huecki',
      url: siteUrl,
      inLanguage: ['de-DE', 'en-US'],
      author: {
        '@type': 'Person',
        name: person.name,
      },
    },
  ];
}
