'use client';

import { Check } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type CourierDiplomaOption = {
  slug: string;
  label: string;
  price?: string;
  quantityAware?: boolean;
  unitPriceAr?: number;
  pricesByQuantity?: Record<number, number>;
};

type CourierDiplomaSelectionProps = {
  options: CourierDiplomaOption[];
  requiredMessage?: string;
  quantityLabel?: string;
};

const getSelectedSlugs = (value: string | null) =>
  (value ?? '')
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);

const getOptionPrice = (option: CourierDiplomaOption, quantity: number) => {
  if (option.pricesByQuantity) {
    const price = option.pricesByQuantity[quantity];
    return price ? `${price.toLocaleString('fr-FR')} Ar` : null;
  }

  if (option.unitPriceAr) {
    return `${(option.unitPriceAr * quantity).toLocaleString('fr-FR')} Ar`;
  }

  return null;
};

export default function CourierDiplomaSelection({
  options,
  requiredMessage,
  quantityLabel = 'Quantité',
}: CourierDiplomaSelectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

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
    setQuantities((previous) => ({
      ...previous,
      [slug]: selectedSlugs.includes(slug) ? previous[slug] ?? 1 : 1,
    }));
    updateUrl(nextSlugs);
  };

  const updateQuantity = (slug: string, value: number) => {
    const quantity = Math.max(1, Number.isFinite(value) ? Math.round(value) : 1);
    setQuantities((previous) => ({ ...previous, [slug]: quantity }));
  };

  return (
    <>
      <ul className="mt-4 space-y-3" aria-label="Options de documents">
        {options.map((option) => {
          const selected = selectedSlugs.includes(option.slug);
          const quantity = quantities[option.slug] ?? 1;
          const price = getOptionPrice(option, quantity);
          const displayLabel = option.price ? `${option.label} : ${option.price}` : option.label;

          return (
            <li key={option.slug} className="flex items-start gap-3.5">
              <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3.5">
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
                <span className="min-w-0 flex-1 text-slate-600">
                  <span className="block">{displayLabel} {price ? `: ${price} ` : ''}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {requiredMessage && selectedSlugs.length === 0 && (
        <p
          className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800"
          role="status"
        >
          {requiredMessage}
        </p>
      )}
    </>
  );
}
