import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const ROUTES = [
  '/',
  '/a-propos',
  '/contact',
  '/devis',
  '/creation-entreprise-individuelle',
  '/creation-societe-sarl-sarlu',
  '/creation-ong-association',
  '/location-salle-reunion',
  '/conseil-assistance',
  '/service-coursier',
  '/domiciliation',
  '/mentions-legales',
  '/recrutement',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return routing.locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${siteUrl}/${locale}${getLocalizedPath(route, locale)}`,
      lastModified: new Date(),
      changeFrequency: route === '/' ? 'weekly' as const : 'monthly' as const,
      priority: route === '/' ? 1 : 0.7,
    })),
  );
}

function getLocalizedPath(route: (typeof ROUTES)[number], locale: string) {
  const pathname = routing.pathnames[route];

  if (typeof pathname === 'string') {
    return pathname === '/' ? '' : pathname;
  }

  const localizedPath = pathname[locale as keyof typeof pathname];
  return localizedPath;
}