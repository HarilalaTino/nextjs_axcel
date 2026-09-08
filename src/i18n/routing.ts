
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/a-propos': {
      fr: '/a-propos',
      en: '/about'
    },
    '/contact': '/contact',
    '/devis': '/devis',
    '/service': {
      fr: '/service',
      en: '/services'
    },
    '/creation': {
      fr: '/creation',
      en: '/company-creation'
    },
    '/coursier': {
      fr: '/coursier',
      en: '/courier'
    },
    '/conseil-creation-societe': {
      fr: '/conseil-creation-societe',
      en: '/business-creation-advice'
    },
    '/assistance-modification-societe': {
      fr: '/assistance-modification-societe',
      en: '/company-modification-assistance'
    },
    '/assistance-formalisation-entreprise': {
      fr: '/assistance-formalisation-entreprise',
      en: '/business-formalization-assistance'
    },
    '/consultation-strategique': {
      fr: '/consultation-strategique',
      en: '/strategic-consultation'
    },
    '/creation-entreprise-individuelle': {
      fr: '/creation-entreprise-individuelle',
      en: '/sole-proprietorship-creation'
    },
    '/creation-societe-sarl-sarlu': {
      fr: '/creation-societe-sarl-sarlu',
      en: '/sarl-sarlu-company-creation'
    },
    '/creation-domiciliation': {
      fr: '/creation-domiciliation',
      en: '/domiciliation'
    },
    '/location-salle-reunion': {
      fr: '/location-salle-reunion',
      en: '/meeting-room-rental'
    },
    '/conseil-assistance': {
      fr: '/conseil-assistance',
      en: '/advice-assistance'
    },
    '/coursier-recuperation-diplome': {
      fr: '/coursier-recuperation-diplome',
      en: '/courier-diploma-retrieval'
    },
    '/coursier-recuperation-traduction': {
      fr: '/coursier-recuperation-traduction',
      en: '/courier-birth-marriage-certificate'
    },
    '/coursier-recuperation-certificats': {
      fr: '/coursier-recuperation-certificats',
      en: '/courier-market-certificates'
    },
    '/coursier-recuperation-certificats-consommabilite': {
      fr: '/coursier-recuperation-certificats-consommabilite',
      en: '/courier-consumability-certificates'
    },
    '/coursier-toutes-enregistrement-certifications': {
      fr: '/coursier-toutes-enregistrement-certifications',
      en: '/courier-all-registrations'
    },
    '/domiciliation': {
      fr: '/domiciliation',
      en: '/domiciliation'
    },
    '/mentions-legales': {
      fr: '/mentions-legales',
      en: '/legal-notice'
    }
  }
});