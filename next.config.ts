import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/fr', permanent: true },

      { source: '/conseil-creation-societe.html', destination: '/fr', permanent: true },
      { source: '/assistance-modification-societe.html', destination: '/fr', permanent: true },
      { source: '/assistance-formalisation-entreprise.html', destination: '/fr', permanent: true },
      { source: '/consultation-strategique-entrepreneurs.html', destination: '/fr', permanent: true },
      { source: '/creation-sa-sau.html', destination: '/fr', permanent: true },
      { source: '/creation-etablissement.html', destination: '/fr', permanent: true },
      { source: '/ouverture-succursale-filiale.html', destination: '/fr', permanent: true },
      { source: '/service.html', destination: '/fr', permanent: true },

      { source: '/creation-sarl-sarlu.html', destination: '/fr/creation-societe-sarl-sarlu', permanent: true },
      { source: '/creation-entreprise-individuelle.html', destination: '/fr/creation-entreprise-individuelle', permanent: true },
      { source: '/creation-association.html', destination: '/fr/creation-ong-association', permanent: true },
      { source: '/creation-ong.html', destination: '/fr/creation-ong-association', permanent: true },
      { source: '/a-propos.html', destination: '/fr/a-propos', permanent: true },
      { source: '/contact.html', destination: '/fr/contact', permanent: true },

      { source: '/recuperation-diplome-releve-note-equivalence.html', destination: '/fr/service-coursier', permanent: true },
      { source: '/recuperation-traduction-acte-naissance-acte-de-mariage.html', destination: '/fr/service-coursier', permanent: true },
      { source: '/recuperation-certificats-de-mise-en-commerce.html', destination: '/fr/service-coursier', permanent: true },
      { source: '/recuperation-certificats-de-consommabilite.html', destination: '/fr/service-coursier', permanent: true },
      { source: '/toutes-enregistrement-et-certification.html', destination: '/fr/service-coursier', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);