import { AppPathname, Link } from '@/i18n/navigation';
import { Ban, Building2, FileText, Home, MessageSquareMore, RefreshCcwDot, Tag } from 'lucide-react';
import type { ReactNode } from 'react';
import ElegantCard from './elegant-card';
import Image from 'next/image';
import ContactCTA from '../home/contact-cta';

type AppRoute = Extract<AppPathname, string>;

type CreationPageProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  imageSrc: string;
  creationType: string;
  contactHref: AppRoute;
  quoteHref: AppRoute;
  contactLabel: string;
  quoteLabel: string;
  price?: string;
  priceNote: string;
  additionalServicesLabel: string;
  additionalServicesTitle: string;
  additionalServicesDescription: string;
  additionalServices: { title: string; description: string }[];
};

export default function CreationPage({
  eyebrow,
  title,
  description,
  imageSrc,
  creationType,
  contactHref,
  quoteHref,
  contactLabel,
  quoteLabel,
  price,
  priceNote,
  additionalServicesLabel,
  additionalServicesTitle,
  additionalServicesDescription,
  additionalServices
}: CreationPageProps) {
  const contactUrl = {
    pathname: contactHref,
    query: { type: creationType }
  } as const;
  const quoteUrl = {
    pathname: quoteHref,
    query: { type: creationType }
  } as const;

  return (
    <>
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {title}
            </h1>
            <div className="mt-4 h-1 w-16 bg-secondary" />

            <div
              className="mt-6 max-w-md text-primary/70"
            >
              {description}
            </div>

            <div className="mt-8 inline-block rounded-2xl border border-primary/7 bg-white px-7 py-3 shadow-xs">
              <div className="flex items-center justify-between gap-6 ">
                <div>
                  <p className="mt-1 text-4xl font-bold text-primary">
                    {price}
                  </p>
                  <small className="text-sm text-primary/60">
                    {priceNote}
                  </small>
                </div>

                <div className="flex h-11 w-11 items-center justify-center  rounded-full bg-primary/10">
                  <Tag className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href={contactUrl}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                {contactLabel}
              </Link>
              <Link
                href={quoteUrl}
                className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary/90"
              >
                {quoteLabel}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] bg-gray-100 shadow-lg">
            <Image src={imageSrc} alt={title} className="h-full w-full object-cover" fill />
          </div>
        </div>

        <section className="bg-white px-6 pt-30">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
              {additionalServicesLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              {additionalServicesTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary/60">
              {additionalServicesDescription}
            </p>
            <div className="mx-auto mt-6 h-1 w-16 bg-secondary" />

            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {additionalServices.map((service, index) => (
                <ElegantCard
                  key={service.title}
                  icon={[Home, Building2, RefreshCcwDot, Ban, FileText, MessageSquareMore][index]}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
         <ContactCTA />     
    </>
  );
}