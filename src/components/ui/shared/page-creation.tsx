import { Link } from '@/i18n/navigation';
import { EqualApproximately, Tag } from 'lucide-react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export type TranslationFn = (key: string) => string;

type CreationPageProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  imageSrc: string;
  creationType: string;
  t?: TranslationFn;
  isReverseSection?: boolean;
  hideDevis?: boolean;
  hideContact?: boolean;
  overidecta?: ReactNode;
  tiers?: Tier[];
  basicDisplayPrice?: BasicPrice;
  ctasDisplay?: boolean;
  overideQueryparams?: string;
};

export interface Tier {
  label: 'Malgaches' | 'Strangers';
  amount: string;
  alt?: string;
  quoteUrl: 'stranger' | 'citizen';
}

export type BasicPrice = {
  title?: string;
  originalPrice: string;
  euroEquivalence: string;
  annotation?: ReactNode;
};

export default async function CreationPage({
  eyebrow,
  title,
  description,
  imageSrc,
  creationType,
  tiers,
  t,
  isReverseSection,
  hideDevis,
  hideContact,
  overidecta,
  basicDisplayPrice,
  ctasDisplay,
  overideQueryparams,
}: CreationPageProps) {
  const contactHref = '/contact' as const;
  const quoteHref = '/devis' as const;
  const contactLabel = t ? t('contact') : 'Contact';
  const quoteLabel = t ? t('quote') : 'Demander un devis';

  const contactUrl = {
    pathname: contactHref,
  } as const;

  const queryType = overideQueryparams
    ? { [overideQueryparams]: creationType }
    : { type: creationType };

  const quoteUrl = {
    pathname: quoteHref,
    query: queryType,
  } as const;

  const contentClassName = isReverseSection
    ? 'page-creation-content page-creation-content-right'
    : 'page-creation-content page-creation-content-left';

  const mediaClassName = isReverseSection
    ? 'page-creation-media page-creation-media-left'
    : 'page-creation-media page-creation-media-right';

  const globalTranslation = await getTranslations('Global');

  return (
    <>
      <section className="page-creation-section px-6 py-8 lg:px-8 lg:py-12">
        <div
          className={`mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:px-4 lg:items-stretch lg:gap-12 lg:px-8 ${isReverseSection
            ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]'
            : 'lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'
            }`}
        >
          {/* TEXTE */}
          <div
            className={`${contentClassName} flex w-full flex-col justify-center ${isReverseSection ? 'lg:order-2' : ''
              }`}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
              {eyebrow}
            </p>
            <h2 className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl xl:text-4xl">
              {title}
            </h2>
            <div className="mt-4 h-1 w-16 bg-secondary" />

            <div className="mt-6 max-w-prose text-sm text-primary/70 sm:text-base">
              {description}
            </div>

            {tiers && tiers.length > 0 && (
              <div className="mt-10 w-full max-w-xl overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                <div className="grid grid-cols-1 divide-x divide-stone-200 md:grid-cols-2">
                  {tiers.map((tier) => (
                    <div key={tier.label} className="px-6 py-6 text-center">
                      <span className="text-xl text-stone-500">
                        {globalTranslation(tier.label)}
                      </span>
                      <div className="mt-4 flex flex-wrap items-end justify-center gap-x-2 text-2xl font-bold">
                        <span className="whitespace-nowrap">{tier.amount}</span>
                        {tier.alt && (
                          <>
                            <span className="text-base font-normal"><EqualApproximately /></span>
                            <span className="whitespace-nowrap">{tier.alt}</span>
                          </>
                        )}
                      </div>

                      <Link
                        href={{
                          pathname: '/devis',
                          query: {
                            type: creationType,
                            rate: tier.quoteUrl,
                          },
                        }}
                        className="mt-6 inline-block rounded-md bg-secondary px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-secondary/90 sm:w-auto"
                      >
                        {globalTranslation('quoteLabel')}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone-200 bg-stone-50 px-6 py-3">
                  <p className="text-center text-xs text-stone-500">
                    {globalTranslation('priceNote')}
                  </p>
                </div>
              </div>
            )}

            {basicDisplayPrice && (
              <>
                <div className="page-creation-price mt-8 w-fit max-w-full rounded-2xl border border-primary/7 bg-white px-4 py-3 shadow-xs sm:max-w-[500px] sm:px-7">
                  <div className="flex items-center justify-between gap-4 sm:gap-6">
                    <div>
                      <span className="text-primary/70">{basicDisplayPrice.title}</span>
                      <p className="mt-1 flex items-end justify-center gap-2 text-3xl font-bold text-primary sm:text-4xl">
                        {basicDisplayPrice.originalPrice} Ar{' '}
                        <span className="font-base text-base">
                          <EqualApproximately />
                        </span>{' '}
                        {basicDisplayPrice.euroEquivalence} €
                      </p>
                      {basicDisplayPrice.annotation && basicDisplayPrice.annotation}
                      {!basicDisplayPrice.annotation && (
                        <small className="text-xs text-primary/60 sm:text-sm">
                          {globalTranslation('priceNote')}
                        </small>
                      )}
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Tag className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {!hideContact && (
                    <Link
                      href={contactUrl}
                      className="rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:w-auto"
                    >
                      {contactLabel}
                    </Link>
                  )}

                  {!hideDevis && (
                    <Link
                      href={quoteUrl}
                      className="rounded-md bg-secondary px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-secondary/90 sm:w-auto"
                    >
                      {quoteLabel}
                    </Link>
                  )}

                  {overidecta && <div className="w-full sm:w-auto">{overidecta}</div>}
                </div>
              </>
            )}

            {ctasDisplay && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={contactUrl}
                  className="rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:w-auto"
                >
                  {contactLabel}
                </Link>

                <Link
                  href={quoteUrl}
                  className="rounded-md bg-secondary px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-secondary/90 sm:w-auto"
                >
                  {quoteLabel}
                </Link>
              </div>
            )}
          </div>

          {/* IMAGE */}
          <div
            className={`${mediaClassName} group relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-gray-100 shadow-lg lg:aspect-auto lg:max-h-[640px] lg:min-h-[360px] ${isReverseSection ? 'lg:order-1' : ''
              }`}
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
        </div>
      </section>
    </>
  );
}