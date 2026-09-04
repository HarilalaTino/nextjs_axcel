// src/components/LanguageSwitcher.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { ChevronIcon } from '../layout/header';

const LOCALE_DATA: Record<string, { label: string; flagCode: string }> = {
  fr: { label: 'Français', flagCode: 'fr' },
  en: { label: 'Anglais', flagCode: 'en' }
};

function Flag({ code, size = 24 }: { code: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/flags/${code}.svg`}
      alt=""
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-primary transition-colors"
      >
        <Flag code={LOCALE_DATA[locale].flagCode} />
        <span>{LOCALE_DATA[locale].label}</span>
        <span className="text-lg mt-1">
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-3 min-w-[200px] rounded-xl bg-white py-1 shadow-xl z-50">
          <span className="absolute -top-2 left-6 h-4 w-4 rotate-45 bg-white" />
          {routing.locales.map((loc, index) => (
            <div key={loc}>
              {index > 0 && <div className="mx-3 border-t border-gray-100" />}
              <button
                onClick={() => handleChange(loc)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-800 transition-colors hover:bg-gray-50"
              >
                <Flag code={LOCALE_DATA[loc].flagCode} />
                <span>{LOCALE_DATA[loc].label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}