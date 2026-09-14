import { Link } from '@/i18n/navigation';
import { Tag } from 'lucide-react';
import type { ReactNode } from 'react';
import Image from 'next/image';

export type TranslationFn = (key: string) => string;

type CreationPageProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  imageSrc: string;
  creationType: string;
  price?: string;
  priceNote?: string;
  t?: TranslationFn;
  isReverseSection?: boolean;
  hideDevis?: boolean;
  hideContact?: boolean;
  overidecta?: ReactNode;
};

export default async function CreationPage({
  eyebrow,
  title,
  description,
  imageSrc,
  creationType,
  price,
  priceNote,
  t,
  isReverseSection,
  hideDevis,
  hideContact,
  overidecta
}: CreationPageProps) {
  const contactHref = '/contact' as const;
  const quoteHref = '/devis' as const;
  const contactLabel = t ? t('contact') : 'Contact';
  const quoteLabel = t ? t('quote') : 'Demander un devis';

  const contactUrl = {
    pathname: contactHref,
    query: { type: creationType }
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

  return (
    <>
      <section className="page-creation-section px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-2 sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8">
          <div className={`${contentClassName} w-full flex-1 ${isReverseSection ? 'lg:order-2' : ''}`}>
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{eyebrow}</p>
            <h1 className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl lg:text-4xl">
              {title}
            </h1>
            <div className="mt-4 h-1 w-16 bg-secondary" />

            <div className="mt-6 text-sm text-primary/70 sm:text-base">
              {description}
            </div>

            {price && priceNote && (
              <div className="page-creation-price mt-8 w-80 rounded-2xl border border-primary/7 bg-white px-4 py-3 shadow-xs sm:inline-block sm:px-7">
                <div className="flex items-center justify-between gap-4 sm:gap-6">
                  <div>
                    <p className="mt-1 text-3xl font-bold text-primary sm:text-4xl">
                      {price}
                    </p>
                    <small className="text-xs text-primary/60 sm:text-sm">
                      {priceNote}
                    </small>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Tag className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
            )}

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