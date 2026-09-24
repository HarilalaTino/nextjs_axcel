
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
    '/contact': {
      fr: '/contact',
      en: '/contact'
    },
    '/devis': {
      fr: '/devis',
      en: '/quote'
    },
    '/creation': {
      fr: '/creation',
      en: '/creation'
    },
    '/creation-entreprise-individuelle': {
      fr: '/creation-entreprise-individuelle',
      en: '/sole-proprietorship-creation'
    },
    '/creation-societe-sarl-sarlu': {
      fr: '/creation-societe-sarl-sarlu',
      en: '/sarl-sarlu-company-creation'
    },
    '/creation-ong-association': {
      fr: '/creation-ong-association',
      en: '/ngo-association-creation'
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
    },
    '/recrutement': {
      fr: '/recrutement',
      en: '/recruitment'
    },
    '/redaction-documents-administratifs': {
      fr: '/redaction-documents-administratifs',
      en: '/drafting-administrative document'
    },
    '/recuperation-diplome-releves': {
      fr: '/recuperation-diplome-releves',
      en: '/diploma-and-transcript-collection'
    },
    '/recuperation-traduction-document': {
      fr: '/recuperation-traduction-document',
      en: '/recovery-translation-retrieval'
    },
    '/certificat-mise-en-commerce': {
      fr: '/certificat-mise-en-commerce',
      en: '/certificate-of-market-authorization'
    },
    '/creation-sa-sau-sci': {
      fr: '/creation-sa-sau-sci',
      en: '/creation-sa-sau-sci'
    }
  }
});