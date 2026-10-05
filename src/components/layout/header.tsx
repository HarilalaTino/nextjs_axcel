'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { AppPathname, Link } from '@/i18n/navigation';
import LanguageSwitcher from '../ui/language-switcher';

type AppRoute = Extract<AppPathname, string>;

type SubItem = {
  label: string;
  href: AppRoute;
};

type NavItem = {
  label: string;
  href: AppRoute;
  submenu?: SubItem[];
  minWidth?: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'creation',
    href: '/creation',
    submenu: [
      { label: 'creationIndividual', href: '/creation-entreprise-individuelle' },
      { label: 'creationSarl', href: '/creation-societe-sarl-sarlu' },
      { label: 'creationNogAndAssociation', href: '/creation-ong-association' },
      { label: 'creationSA&SAU&SCI', href: '/creation-sa-sau-sci' },
      { label: 'travelAgencyCreation', href: '/creation-agence-de-voyage' },
      { label: 'wholesaleDesignCreation', href: '/creation-grossiste' },
      { label: 'religiousCreation', href: '/creation-association-cultuelle' },
      { label: 'creationDomiciliation', href: '/domiciliation' },
      { label: 'ourPacks', href: '/nos-packs' },
    ],
  },
  {
    label: 'courier',
    href: '/service-coursier',
    submenu: [
      { label: 'courierDiploma', href: '/recuperation-diplome-releves' },
      { label: 'courierBirthMarriage', href: '/recuperation-traduction-document' },
      { label: 'certificateOfMarketabilityAndCommercialization', href: '/certificat-consommabilite-et-mise-en-commerce' },
      { label: 'AllOtherCertificationRecoveries', href: '/toutes-autres-recuperations-et-certifications' },
    ]
  },
  {
    label: 'legalDdepartment',
    href: '/service-juridique',
    submenu: [
      { label: 'draftingContractLeaseServiceProvider', href: '/redaction-contrat-travail-bail-prestation' },
      { label: 'legalConsulting', href: '/conseil-juridique' },
      { label: 'dismissalAssistance', href: '/assistance-procedure-licenciement' },
      { label: 'recruitment', href: '/recrutement' },
      { label: 'rightofWork', href: '/droit-du-travail' },
    ],
    minWidth: 'min-w-96'
  },
  {
    label: 'roomRental',
    href: '/location-salle',
    submenu: [
      { label: 'officeRoomRental', href: '/salle-de-bureau' },
      { label: 'meetingRoom', href: '/salle-de-reunion' },
      { label: 'trainingRoomRental', href: '/salle-de-formation' },
      { label: 'hrTraining', href: '/formation-ressources-humaines' },
    ]
  },
  {
    label: 'adviceAndAssistance',
    href: '/conseil-assistance',
    submenu: [
      { label: 'companyCreationConsulting', href: '/conseil-en-creation-de-societe' },
      { label: 'companyModificationAssistance', href: '/assistance-modification-de-societe' },
      { label: 'businessFormalizationAssistance', href: '/assistance-formalisation-d-entreprise' },
      { label: 'strategicConsultingForEntrepreneurs', href: '/consultation-strategique-pour-entrepreneurs' },
    ]
  },
  { label: 'about', href: '/a-propos' },
  { label: 'contact', href: '/contact' }
];

// Largeur (px) réservée pour le bouton "Plus" quand il doit apparaître.
// Sert à décider, pendant la mesure, s'il reste assez de place pour lui.
const MORE_BUTTON_RESERVE = 96;

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

/**
 * Continuously measures how many elements of NAV_ITEMS actually fit 
* in the available width (with their real translated labels, therefore 
* their true width — not a hard px value). The elements which do not 
* cannot switch to a "More" menu. 
* 
* Replaces the lg single breakpoint (hidden/flex) that caused the 
* overlap between ~1024px and ~1400px: here there is no longer any area where 
* "all" is displayed without sufficient space, regardless of the language.
 */
function useOverflowNav(itemCount: number, moreReserve: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(itemCount);

  const recompute = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const containerWidth = container.offsetWidth;
    const children = Array.from(measure.children) as HTMLElement[];

    let used = 0;
    let count = 0;

    for (let i = 0; i < children.length; i++) {
      used += children[i].offsetWidth;
      const remaining = children.length - i - 1;
      const reserve = remaining > 0 ? moreReserve : 0;
      if (used + reserve > containerWidth) break;
      count++;
    }

    setVisibleCount(count);
  }, [moreReserve]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => recompute());
    ro.observe(container);
    recompute();

    return () => ro.disconnect();
  }, [itemCount, recompute]);

  return { containerRef, measureRef, visibleCount };
}

export default function NavMenu() {
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const t = useTranslations('Nav');

  const { containerRef, measureRef, visibleCount } = useOverflowNav(
    NAV_ITEMS.length,
    MORE_BUTTON_RESERVE
  );

  const visibleItems = NAV_ITEMS.slice(0, visibleCount);
  const overflowItems = NAV_ITEMS.slice(visibleCount);
  const MORE_KEY = '__more__';

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

  // Rendering a first level link (with or without submenu), 
  // reused both for visible items and those in the "More" menu.
  function renderNavItem(item: NavItem) {
    const isOpen = openDesktopMenu === item.label;

    if (!item.submenu) {
      return (
        <Link
          key={item.label}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:text-secondary whitespace-nowrap"
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
          className="flex items-center gap-1 rounded-md px-3 py-5 text-sm font-medium text-primary transition-colors hover:text-secondary whitespace-nowrap"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {t(item.label)}
          <ChevronIcon open={isOpen} />
        </button>

        {isOpen && (
          <div
            className={`absolute left-0 top-full ${item.minWidth ?? 'min-w-[22rem]'} rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.18)] ring-1 ring-slate-100 backdrop-blur-sm z-50`}
            role="menu"
          >
            <div className="grid gap-1">
              {item.submenu.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  role="menuitem"
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-primary/5 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
                >
                  <span className="flex-1">{t(sub.label)}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-secondary"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <header
      ref={navRef as React.RefObject<HTMLElement>}
      className="sticky top-0 z-50 w-full bg-white border-b border-slate-100"
    >
      <div className="mx-auto flex wrap items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-2 gap-4">

        {/* Logo */}
        <Link href="/" className="shrink-0 text-primary">
          <span className="text-lg font-semibold tracking-tight ">
            <Image className='scale-130' src="/logo.png" alt="axcel" width={55} height={55} />
          </span>
        </Link>

        {/* Desktop menu with dynamic overflow ("priority+") */}
        <div ref={containerRef} className="hidden min-w-0 flex-1 lg:flex">
          {/* Invisible row used only to measure width 
            actual value of each translated wording. Never withdraw: it is 
            it which controls the calculation of visibleCount. */}
          <div
            ref={measureRef}
            className="pointer-events-none invisible absolute flex items-center gap-1"
            aria-hidden="true"
          >
            {NAV_ITEMS.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium"
              >
                {t(item.label)}
                {item.submenu && <ChevronIcon open={false} />}
              </span>
            ))}
          </div>

          <nav
            className="flex min-w-0 flex-1 items-center gap-1"
            aria-label={t('mainMenu')}
          >
            {visibleItems.map(renderNavItem)}

            {overflowItems.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(MORE_KEY)}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:text-secondary"
                  aria-expanded={openDesktopMenu === MORE_KEY}
                  aria-haspopup="true"
                >
                  {t('more')}
                  <ChevronIcon open={openDesktopMenu === MORE_KEY} />
                </button>

                {openDesktopMenu === MORE_KEY && (
                  <div
                    className="absolute right-0 top-full z-50 min-w-[16rem] rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.18)] ring-1 ring-slate-100 backdrop-blur-sm"
                    role="menu"
                  >
                    <div className="grid gap-1">
                      {overflowItems.map((item) =>
                        item.submenu ? (
                          <div key={item.label} className="border-b border-slate-100 pb-1 last:border-0 last:pb-0">
                            <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                              {t(item.label)}
                            </span>
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                role="menuitem"
                                className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-primary/5 hover:text-secondary"
                              >
                                {t(sub.label)}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            key={item.label}
                            href={item.href}
                            role="menuitem"
                            className="flex items-center rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-primary/5 hover:text-secondary"
                          >
                            {t(item.label)}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">

          {/* CTA Devis (desktop) */}
          <Link
            href="/devis"
            className="hidden shrink-0 rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:inline-block bg-secondary"
          >
            {t('quote')}
          </Link>

          <LanguageSwitcher />

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
                        {t(sub.label)}
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
