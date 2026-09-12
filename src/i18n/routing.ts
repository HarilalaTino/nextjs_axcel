
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
    '/location-salle-reunion': {
      fr: '/location-salle-reunion',
      en: '/meeting-room-rental'
    },
    '/conseil-assistance': {
      fr: '/conseil-assistance',
      en: '/advice-assistance'
    },
    '/service-coursier': {
      fr: '/service-coursier',
      en: '/courier-services'
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