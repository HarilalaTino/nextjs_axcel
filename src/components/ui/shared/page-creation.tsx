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
  ctasDisplay?: boolean
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
  annotation?: ReactNode
}

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
  ctasDisplay
}: CreationPageProps) {
  const contactHref = '/contact' as const;
  const quoteHref = '/devis' as const;
  const contactLabel = t ? t('contact') : 'Contact';
  const quoteLabel = t ? t('quote') : 'Demander un devis';

  const contactUrl = {
    pathname: contactHref
  } as const;
  const quoteUrl = {
    pathname: quoteHref,
    query: { type: creationType }
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
      <section className="page-creation-section px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-2 sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8">
          <div className={`${contentClassName} w-full flex-1 ${isReverseSection ? 'lg:order-2' : ''}`}>
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{eyebrow}</p>
            <h2 className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl xl:text-4xl">
              {title}
            </h2>
            <div className="mt-4 h-1 w-16 bg-secondary" />

            <div className="mt-6 text-sm text-primary/70 sm:text-base">
              {description}
            </div>

            {tiers && tiers.length > 0 && (
              <div className="w-full max-w-xl rounded-2xl border border-stone-200 shadow-sm overflow-hidden mt-10">
                <div className="grid grid-cols-2 divide-x divide-stone-200">
                  {tiers.map((tier) => (
                    <div key={tier.label} className="px-6 py-6 text-center">
                      <span className="text-xl text-stone-500">
                        {globalTranslation(tier.label)}
                      </span>
                      <div className="mt-4 text-2xl gap-2 font-bold flex items-end justify-center">
                        {tier.amount}{" "}
                        {tier.alt && (
                          <> <span className="text-base font-base"><EqualApproximately /></span>  <span className="mt-2 text-2xl font-bold">{tier.alt}</span></>
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
                        {globalTranslation("quoteLabel")}
                      </Link>

                    </div>
                  ))}
                </div>
                <div className="px-6 py-3 bg-stone-50 border-t border-stone-200">
                  <p className="text-xs text-stone-500 text-center">{globalTranslation("priceNote")}</p>
                </div>
              </div>
            )}

            {basicDisplayPrice && (
              <>
                <div className="page-creation-price mt-8 rounded-2xl border border-primary/7 bg-white px-4 py-3 shadow-xs sm:inline-block sm:px-7">
                  <div className="flex items-center justify-between gap-4 sm:gap-6">
                    <div>
                      <span className='text-primary/70'>{basicDisplayPrice.title}</span>
                      <p className="mt-1 text-3xl font-bold flex items-end justify-center gap-2 text-primary sm:text-4xl">
                        {basicDisplayPrice.originalPrice} Ar <span className="text-base font-base"><EqualApproximately /></span>  {basicDisplayPrice.euroEquivalence} €
                      </p>
                      {basicDisplayPrice.annotation && (
                        basicDisplayPrice.annotation
                      )}
                      {!basicDisplayPrice.annotation && (
                        <small className="text-xs text-primary/60 sm:text-sm">
                          {globalTranslation("priceNote")}
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

          <div className={`${mediaClassName} group relative aspect-square w-full overflow-hidden rounded-[2rem] bg-gray-100 shadow-lg sm:max-w-md lg:max-w-md ${isReverseSection ? 'lg:order-1' : ''}`}>
            <Image
              src={imageSrc}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              fill
            />
          </div>
        </div>
      </section>
    </>
  );
}