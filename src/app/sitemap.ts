import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const ROUTES = [
  '/',
  '/a-propos',
  '/assistance-formalisation-d-entreprise',
  '/assistance-modification-de-societe',
  '/assistance-procedure-licenciement',
  '/certificat-consommabilite-et-mise-en-commerce',
  '/conseil-assistance',
  '/conseil-en-creation-de-societe',
  '/conseil-juridique',
  '/consultation-strategique-pour-entrepreneurs',
  '/contact',
  '/devis',
  '/creation-agence-de-voyage',
  '/creation-association-cultuelle',
  '/creation-entreprise-individuelle',
  '/creation-grossiste',
  '/creation-societe-sarl-sarlu',
  '/creation-ong-association',
  '/creation-sa-sau-sci',
  '/domiciliation',
  '/droit-du-travail',
  '/formation-ressources-humaines',
  '/gamme-de-services',
  '/location-salle-reunion',
  '/mentions-legales',
  '/nos-packs',
  '/recuperation-diplome-releves',
  '/recuperation-traduction-document',
  '/redaction-contrat-travail-bail-prestation',
  '/recrutement',
  '/salle-de-bureau',
  '/salle-de-formation',
  '/salle-de-reunion',
  '/toutes-autres-recuperations-et-certifications',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ).origin;

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