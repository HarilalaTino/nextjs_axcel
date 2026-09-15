import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { COMPANY_ADDRESS, EMAIL_ADDRESS, PRIMARY_PHONE_NUMBER, SECONDARY_PHONE_NUMBER } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import { AppPathname, Link } from '@/i18n/navigation';

type AppRoute = Extract<AppPathname, string>;

const FOOTER_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'home', href: '/' },
  { label: 'about', href: '/a-propos' },
  { label: 'quote', href: '/devis' },
  { label: 'contact', href: '/contact' },
];

const SERVICE_LINKS: { label: string; href: AppRoute }[][] = [
  [
    { label: 'individualCreation', href: '/creation-entreprise-individuelle' },
    { label: 'companyCreation', href: '/creation-societe-sarl-sarlu' },
    { label: 'associationCreation', href: '/creation-ong-association' },
    { label: 'domiciliation', href: '/domiciliation' },
  ],
  [
    { label: 'meetingRoom', href: '/location-salle-reunion' },
    { label: 'advice', href: '/conseil-assistance' },
    { label: 'courier', href: '/service-coursier' },
    { label: 'recruitment', href: '/recrutement' },
  ],
];

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-auto bg-white text-primary border-t border-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="col-span-2 sm:col-span-1">
           <Link href="/" className="shrink-0 text-primary" >
          <span className="text-lg font-semibold tracking-tight">
             <Image src="/logo.png" alt="axcel" width={50} height={50} />
          </span>
        </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            {t('description')}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
            {t('navigation')}
          </h2>
          <nav className="mt-4 flex flex-col items-start gap-3" aria-label={t('secondaryNavigation')}>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-secondary"
              >
                {t(`links.${link.label}`)}
              </Link>
            ))}
          </nav>
        </div>

        <div  className='col-span-2'>
          <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
            {t('services')}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {SERVICE_LINKS.map((serviceColumn, columnIndex) => (
              <nav key={columnIndex} className="flex flex-col items-start gap-3" aria-label={t('services')}>
                {serviceColumn.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-secondary"
                  >
                    {t(link.label)}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
            {t('contact')}
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <div className="group flex items-start gap-3 text-slate-500 transition-colors hover:text-secondary">
              <Phone size={17} className="mt-0.5 shrink-0 transition-colors group-hover:text-secondary" />
              <span>
                <a className="hover:text-secondary" href={`tel:${PRIMARY_PHONE_NUMBER}`}>
                  {PRIMARY_PHONE_NUMBER}
                </a>
                <a className="hover:text-secondary" href={`tel:${SECONDARY_PHONE_NUMBER}`}>
                  {' / '}{SECONDARY_PHONE_NUMBER}
                </a>
              </span>
            </div>
            <a href="mailto:contact@axcel.mg" className="flex items-start gap-3 transition-colors hover:text-secondary">
              <Mail size={17} className="mt-0.5 shrink-0" />
              <span>{EMAIL_ADDRESS}</span>
            </a>
            <span className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0" />
              <span>{COMPANY_ADDRESS}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Axcel Company. {t('rights')}</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="transition-colors hover:text-secondary">
              {t('legalNotice')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
