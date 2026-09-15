import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const isProductionSite = siteUrl === 'https://axcel.mg';

  return {
    rules: {
      userAgent: '*',
      allow: isProductionSite ? '/' : undefined,
      disallow: isProductionSite ? ['/api/'] : ['/'],
    },
    sitemap: isProductionSite ? `${siteUrl}/sitemap.xml` : undefined,
  };
}