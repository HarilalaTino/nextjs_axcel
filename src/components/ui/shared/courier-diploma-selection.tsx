'use client';

import { Check } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type CourierDiplomaOption = {
  slug: string;
  label: string;
  price: string;
};

type CourierDiplomaSelectionProps = {
  options: CourierDiplomaOption[];
};

const getSelectedSlugs = (value: string | null) =>
  (value ?? '')
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);

export default function CourierDiplomaSelection({ options }: CourierDiplomaSelectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSlugs(getSelectedSlugs(searchParams.get('type')));
  }, [searchParams]);

  const updateUrl = (slugs: string[]) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (slugs.length > 0) {
      nextParams.set('type', slugs.join(','));
    } else {
      nextParams.delete('type');
    }

    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const toggleOption = (slug: string) => {
    const nextSlugs = selectedSlugs.includes(slug)
      ? selectedSlugs.filter((selectedSlug) => selectedSlug !== slug)
      : [...selectedSlugs, slug];

    setSelectedSlugs(nextSlugs);
    updateUrl(nextSlugs);
  };

  return (
    <ul className="mt-8 space-y-3" aria-label="Options de documents">
      {options.map((option) => {
        const selected = selectedSlugs.includes(option.slug);

        return (
          <li key={option.slug} className="flex items-start gap-3.5">
            <label className="flex min-w-0 cursor-pointer items-start gap-3.5">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleOption(option.slug)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${selected
                  ? 'border-secondary bg-secondary text-white'
                  : 'border-slate-300 bg-white text-transparent'
                  }`}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="text-slate-600">
                {option.label} : {option.price}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
