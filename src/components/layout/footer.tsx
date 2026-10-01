import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { COMPANY_ADDRESS, EMAIL_ADDRESS, PRIMARY_PHONE_NUMBER, SECONDARY_PHONE_NUMBER } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import { AppPathname, Link } from '@/i18n/navigation';

type AppRoute = Extract<AppPathname, string>;

const FOOTER_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'home', href: '/' },
  { label: 'about', href: '/a-propos' },
  { label: 'contact', href: '/contact' },
  { label: 'quote', href: '/devis' },
];

export default function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Nav');


  const serviceGroups: Array<{
    key: string;
    label: string;
    links: Array<{ label: string; href: AppRoute }>;
  }> = [
      {
        key: 'creation',
        label: navT('creation'),
        links: [
          { label: navT('creationIndividual'), href: '/creation-entreprise-individuelle' as AppRoute },
          { label: navT('creationSarl'), href: '/creation-societe-sarl-sarlu' as AppRoute },
          { label: navT('creationNogAndAssociation'), href: '/creation-ong-association' as AppRoute },
          { label: navT('creationSA&SAU&SCI'), href: '/creation-sa-sau-sci' as AppRoute },
          { label: navT('travelAgencyCreation'), href: '/creation-agence-de-voyage' as AppRoute },
          { label: navT('wholesaleDesignCreation'), href: '/creation-grossiste' as AppRoute },
          { label: navT('religiousCreation'), href: '/creation-association-cultuelle' as AppRoute },
          { label: navT('creationDomiciliation'), href: '/domiciliation' as AppRoute },
        ],
      },
      {
        key: 'courier',
        label: navT('courier'),
        links: [
          { label: navT('courierDiploma'), href: '/recuperation-diplome-releves' as AppRoute },
          { label: navT('courierBirthMarriage'), href: '/recuperation-traduction-document' as AppRoute },
          { label: navT('certificateOfMarketabilityAndCommercialization'), href: '/certificat-consommabilite-et-mise-en-commerce' as AppRoute },
          { label: navT('AllOtherCertificationRecoveries'), href: '/toutes-autres-recuperations-et-certifications' as AppRoute },
        ],
      },
      {
        key: 'legalDdepartment',
        label: navT('legalDdepartment'),
        links: [
          { label: navT('draftingContractLeaseServiceProvider'), href: '/redaction-contrat-travail-bail-prestation' as AppRoute },
          { label: navT('legalConsulting'), href: '/conseil-juridique' as AppRoute },
          { label: navT('dismissalAssistance'), href: '/assistance-procedure-licenciement' as AppRoute },
          { label: navT('recruitment'), href: '/recrutement' as AppRoute },
          { label: navT('rightofWork'), href: '/droit-du-travail' as AppRoute },
        ],
      },
      {
        key: 'roomRental',
        label: navT('roomRental'),
        links: [
          { label: navT('officeRoomRental'), href: '/salle-de-bureau' as AppRoute },
          { label: navT('meetingRoom'), href: '/salle-de-reunion' as AppRoute },
          { label: navT('trainingRoomRental'), href: '/salle-de-formation' as AppRoute },
          { label: navT('hrTraining'), href: '/formation-ressources-humaines' as AppRoute },
        ],
      },
      {
        key: 'adviceAndAssistance',
        label: navT('adviceAndAssistance'),
        links: [
          { label: navT('companyCreationConsulting'), href: '/conseil-en-creation-de-societe' as AppRoute },
          { label: navT('companyModificationAssistance'), href: '/assistance-modification-de-societe' as AppRoute },
          { label: navT('businessFormalizationAssistance'), href: '/assistance-formalisation-d-entreprise' as AppRoute },
          { label: navT('strategicConsultingForEntrepreneurs'), href: '/consultation-strategique-pour-entrepreneurs' as AppRoute },
        ],
      },
    ];

  return (
    <footer className="mt-auto bg-gradient-to-r from-[#0a1a2f] via-[#0e2340] to-[#14315c] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        {/* Ligne du haut : marque / navigation / contact */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr]">
          <div className="group block rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-white/30 hover:bg-white/10">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-white.png"
                alt=""
                width={60}
                height={60}
              />
              <div>
                <p className="text-sm font-semibold text-white">Axcel Company</p>
                <p className="text-xs text-slate-300">{t('companySlogan')}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-200">
              {t('description')}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide">{t('navigation')}</h2>
            <nav className="mt-4 flex flex-col items-start gap-3" aria-label={t('secondaryNavigation')}>
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-200 transition-colors hover:text-secondary"
                >
                  {t(`links.${link.label}`)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide">{t('contact')}</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <Phone size={17} className="mt-0.5 shrink-0 text-white" />
                <span className="flex flex-col">
                  <a className="transition-colors hover:text-secondary" href={`tel:${PRIMARY_PHONE_NUMBER}`}>
                    {PRIMARY_PHONE_NUMBER}
                  </a>
                  <a className="transition-colors hover:text-secondary" href={`tel:${SECONDARY_PHONE_NUMBER}`}>
                    {SECONDARY_PHONE_NUMBER}
                  </a>
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-start gap-3 transition-colors hover:text-secondary"
                >
                  <Mail size={17} className="mt-0.5 shrink-0 text-white" />
                  <span>{EMAIL_ADDRESS}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-white" />
                <span>{COMPANY_ADDRESS}</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm mb-4 font-bold uppercase tracking-wide">{t('network')}</h2>
            <div className='flex gap-4 items-center'>
              <a href="https://web.facebook.com/profile.php?id=100092397681842" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                  <path fill="#FFFFFF" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://wa.me/387306632" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="30" height="30">
                  <path fill="#FFFFFF" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.6 222-222 0-59.3-23.1-115.1-65-157.1zM223.9 438.3c-33.2 0-65.7-8.9-94-25.8l-6.7-4-69.8 18.3L72 359.1l-4.4-7c-18.5-29.4-28.3-63.4-28.3-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.3-186.5 184.3zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.7-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-4-10.5-6.8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Ligne du bas : services en colonnes */}
        <div className="mt-12 border-t border-white/10 pt-10">

          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {serviceGroups.map((group) => (
              <nav key={group.key} aria-label={group.label} className="flex flex-col items-start gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                  {group.label}
                </h3>
                {group.links.map((link) => (
                  <Link
                    key={`${group.key}-${link.href}`}
                    href={link.href}
                    className="text-sm leading-snug text-slate-200 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Axcel Company. {t('rights')}</p>
          <Link href="/mentions-legales" className="transition-colors hover:text-secondary">
            {t('legalNotice')}
          </Link>
        </div>
      </div>
    </footer>
  );
}