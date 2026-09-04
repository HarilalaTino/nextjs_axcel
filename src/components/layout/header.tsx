'use client';


import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '../ui/language-switcher';

type SubItem = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  submenu?: SubItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'advice',
    href: '/service',
    submenu: [
      { label: 'adviceCreation', href: '/conseil-creation-societe' },
      { label: 'adviceModification', href: '/assistance-modification-societe' },
      { label: 'adviceFormalization', href: '/assistance-formalisation-entreprise' },
      { label: 'adviceStrategic', href: '/consultation-strategique' },
    ],
  },
  {
    label: 'creation',
    href: '/creation',
    submenu: [
      { label: 'creationIndividual', href: '/creation-entreprise-individuelle' },
      { label: 'creationSarl', href: '/creation-societe-sarl-sarlu' },
      { label: 'creationDomiciliation', href: '/creation-domiciliation' },
      { label: 'creationMeetingRoom', href: '/location-salle-reunion' },
      { label: 'creationAdvice', href: '/conseil-assistance' },
    ],
  },
  {
    label: 'courier',
    href: '/coursier',
    submenu: [
      { label: 'courierDiploma', href: '/coursier-recuperation-diplome' },
      { label: 'courierBirthMarriage', href: '/coursier-recuperation-traduction' },
      { label: 'courierMarketCertificates', href: '/coursier-recuperation-certificats' },
      { label: 'courierConsumabilityCertificates', href: '/coursier-recuperation-certificats-consommabilite' },
      { label: 'courierRegistrations', href: '/coursier-toutes-enregistrement-certifications' },
    ],
  },
  { label: 'about', href: '/a-propos' },
  { label: 'contact', href: '/contact' }
];

export function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

export default function NavMenu() {
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const t = useTranslations('Nav');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDesktopMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef as React.RefObject<HTMLElement>}
      className="sticky top-0 z-50 w-full bg-white border-b border-slate-100"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-2">

        {/* Logo */}
        <Link href="/" className="shrink-0 text-primary" >
          <span className="text-lg font-semibold tracking-tight">
            <Image src="/logo.png" alt="axcel" width={50} height={50} />
          </span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label={t('mainMenu')}>
          {NAV_ITEMS.map((item) => {
            const isOpen = openDesktopMenu === item.label;
            if (!item.submenu) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:text-secondary"
                >
                  {t(item.label)}
                </Link>
              );
            }
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(item.label)}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md px-3 py-5 text-sm font-medium text-primary transition-colors hover:text-secondary"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {t(item.label)}
                  <ChevronIcon open={isOpen} />
                </button>

                {isOpen && (
                  <div
                    className="absolute left-0 top-full min-w-64 rounded-lg border border-slate-100 bg-white py-2 shadow-lg"
                    role="menu"
                  >
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-primary transition-colors hover:bg-slate-50 hover:text-secondary"
                      >
                        {t(sub.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* CTA Devis (desktop) */}
          <Link
            href="/devis"
            className="hidden shrink-0 rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:inline-block bg-secondary"
          >
            {t('quote')}
          </Link>

          {/* Bouton burger (mobile) */}
          <button
            type="button"
            className="text-primary lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>


      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <nav
          className="border-t border-slate-100 bg-white px-4 pb-4 lg:hidden"
          aria-label={t('mobileMenu')}
        >
          {NAV_ITEMS.map((item) => {
            const isSubOpen = openMobileSubmenu === item.label;
            if (!item.submenu) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block border-b border-slate-50 py-3 text-sm font-medium text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.label)}
                </Link>
              );
            }
            return (
              <div key={item.label} className="border-b border-slate-50">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-sm font-medium text-primary"
                  aria-expanded={isSubOpen}
                  onClick={() => setOpenMobileSubmenu(isSubOpen ? null : item.label)}
                >
                  {t(item.label)}
                  <ChevronIcon open={isSubOpen} />
                </button>
                {isSubOpen && (
                  <div className="pb-2 pl-4">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block py-2 text-sm text-slate-600"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/devis"
            className="mt-4 block rounded-md px-4 py-2 text-center text-sm font-semibold text-white bg-secondary"
            onClick={() => setMobileOpen(false)}
          >
            {t('quote')}
          </Link>
        </nav>
      )}
    </header>
  );
}
