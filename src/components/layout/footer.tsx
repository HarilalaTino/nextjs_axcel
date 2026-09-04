import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { PRIMARY_PHONE_NUMBER, SECONDARY_PHONE_NUMBER } from '@/utils/constants';
import { useTranslations } from 'next-intl';

const FOOTER_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos de nous', href: '/a-propos' },
  { label: 'Nos services', href: '/creation' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-auto bg-white text-primary">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
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

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
            {t('services')}
          </h2>
          <nav className="mt-4 flex flex-col items-start gap-3" aria-label={t('services')}>
            <Link href="/creation-entreprise-individuelle" className="text-sm text-slate-500 transition-colors hover:text-secondary">
              {t('companyCreation')}
            </Link>
            <Link href="/domiciliation" className="text-sm text-slate-500 transition-colors hover:text-secondary">
              {t('domiciliation')}
            </Link>
            <Link href="/location-salle-reunion" className="text-sm text-slate-500 transition-colors hover:text-secondary">
              {t('meetingRoom')}
            </Link>
            <Link href="/conseil-assistance" className="text-sm text-slate-500 transition-colors hover:text-secondary">
              {t('advice')}
            </Link>
          </nav>
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
              <span>contact@axcel.mg</span>
            </a>
            <span className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0" />
              <span>Arrêt bus pharmacie Aina Andravoahangy Ambony, Antananarivo 101</span>
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
