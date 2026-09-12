import { Link } from '@/i18n/navigation';
import { Tag } from 'lucide-react';
import type { ReactNode } from 'react';
import Image from 'next/image';

type TranslationFn = (key: string) => string;

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
  hideDevis
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
      <section className="page-creation-section px-6 py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-12 px-4 sm:px-6 lg:gap-20 lg:px-8">
          {isReverseSection ? (
            <div className={`${mediaClassName} relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] bg-gray-100 shadow-lg`}>
              <Image src={imageSrc} alt={title} className="h-full w-full object-cover" fill />
            </div>
          ) : null}

          <div className={`${contentClassName} flex-1`}>
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {title}
            </h1>
            <div className="mt-4 h-1 w-16 bg-secondary" />

            <div className="mt-6 text-primary/70">
              {description}
            </div>

            {price && priceNote && (
              <div className="page-creation-price mt-8 inline-block rounded-2xl border border-primary/7 bg-white px-7 py-3 shadow-xs">
                <div className="flex items-center justify-between gap-6 ">
                  <div>
                    <p className="mt-1 text-4xl font-bold text-primary">
                      {price}
                    </p>
                    <small className="text-sm text-primary/60">
                      {priceNote}
                    </small>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                    <Tag className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
            )}


            <div className="mt-8 flex gap-3">
              <Link
                href={contactUrl}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                {contactLabel}
              </Link>
              {!hideDevis && (
                <Link
                  href={quoteUrl}
                  className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary/90"
                >
                  {quoteLabel}
                </Link>
              )}

            </div>
          </div>

          {!isReverseSection ? (
            <div className={`${mediaClassName} relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] bg-gray-100 shadow-lg`}>
              <Image src={imageSrc} alt={title} className="h-full w-full object-cover" fill />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}