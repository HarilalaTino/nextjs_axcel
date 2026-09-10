import { coursierRecuperationCertificats, coursierRecuperationCertificatsConsommabilite, coursierRecuperationDiplome, coursierRecuperationTraduction, coursierToutesEnregistrementCertifications, Menu } from "./service-data";

export const PRIMARY_PHONE_NUMBER = "+261 38 73 066 32";
export const SECONDARY_PHONE_NUMBER = "+261 34 11 918 40";
export const EMAIL_ADDRESS = "contact@axcel.mg";
export const COMPANY_ADDRESS = "Arrêt bus pharmacie Aina Andravoahangy Ambony, Antananarivo 101";

export const services: Menu[] = [
  coursierRecuperationDiplome,
  coursierRecuperationTraduction,
  coursierRecuperationCertificats,
  coursierRecuperationCertificatsConsommabilite,
  coursierToutesEnregistrementCertifications,
];

export function getMenu(menuSlug: string): Menu | undefined {
  return services.find((m) => m.slug === menuSlug);
}

export interface ActivityOption {
  slug: string;   
  value: string; 
}


export const activityOptions: ActivityOption[] = [
  { slug: 'services', value: 'service' },
  { slug: 'company-creation', value: 'creation' },
  { slug: 'courier', value: 'coursier' },
  { slug: 'advice-company-creation', value: 'conseil-creation-societe' },
  { slug: 'company-modification-assistance', value: 'assistance-modification-societe' },
  { slug: 'business-formalization-assistance', value: 'assistance-formalisation-entreprise' },
  { slug: 'strategic-consultation', value: 'consultation-strategique' },
  { slug: 'sole-proprietorship-creation', value: 'creation-entreprise-individuelle' },
  { slug: 'sarl-creation', value: 'creation-societe-sarl' },
  { slug: 'sarlu-creation', value: 'creation-societe-sarlu' },
  { slug: 'domiciliation-creation', value: 'creation-domiciliation' },
  { slug: 'meeting-room-rental', value: 'location-salle-reunion' },
  { slug: 'advice-assistance', value: 'conseil-assistance' },
  { slug: 'courier-diploma-retrieval', value: 'coursier-recuperation-diplome' },
  { slug: 'courier-translation-retrieval', value: 'coursier-recuperation-traduction' },
  { slug: 'courier-certificates-retrieval', value: 'coursier-recuperation-certificats' },
  { slug: 'courier-automobile-procedure', value: 'coursier-demarche-automobile' },
  { slug: 'courier-consumability-certificates', value: 'coursier-recuperation-certificats-consommabilite' },
  { slug: 'courier-all-registrations', value: 'coursier-toutes-enregistrement-certifications' },
  { slug: 'domiciliation', value: 'domiciliation' }
];

export function getActivityBySlug(slug: string) {
  return activityOptions.find((a) => a.slug === slug);
}

export function getActivityByValue(value: string) {
  return activityOptions.find((a) => a.value === value);
}