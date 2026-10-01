import { getTranslations } from "next-intl/server";
import ElegantCard from "./elegant-card";
import { Ban, Building2, FileText, Home, MessageSquareMore, RefreshCcwDot } from "lucide-react";

export default async function ElegantCardWrapper({
  excludedSlug,
}: {
  excludedSlug?: string;
}) {
  const creationPages = await getTranslations("CreationPages");
  const elms = [
    {
      slug: 'taxCard',
      icon: Home,
      title: creationPages('additionalServices.items.taxCard.title'),
      description: creationPages('additionalServices.items.taxCard.description')
    },
    {
      slug: 'activity',
      icon: Building2,
      title: creationPages('additionalServices.items.activity.title'),
      description: creationPages('additionalServices.items.activity.description')
    },
    {
      slug: 'headOffice',
      icon: RefreshCcwDot,
      title: creationPages('additionalServices.items.headOffice.title'),
      description: creationPages('additionalServices.items.headOffice.description')
    },
    {
      slug: 'closure',
      icon: Ban,
      title: creationPages('additionalServices.items.closure.title'),
      description: creationPages('additionalServices.items.closure.description')
    },
    {
      slug: 'letter',
      icon: FileText,
      title: creationPages('additionalServices.items.letter.title'),
      description: creationPages('additionalServices.items.letter.description')
    },
    {
      slug: 'requests',
      icon: MessageSquareMore,
      title: creationPages('additionalServices.items.requests.title'),
      description: creationPages('additionalServices.items.requests.description')
    },
  ];

  const visibleElms = excludedSlug
    ? elms.filter((service) => service.slug !== excludedSlug)
    : elms;

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
          {creationPages('additionalServices.label')}
        </p>
        <h2 className="text-2xl mt-3 font-extrabold leading-tight text-primary sm:text-3xl xl:text-4xl">
          {creationPages('additionalServices.title')}
        </h2>
        <p className="mt-6 text-sm text-primary/70 sm:text-base">
          {creationPages('additionalServices.description')}
        </p>
        <div className="mx-auto mt-6 h-1 w-16 bg-secondary" />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleElms.map((service) => (
            <ElegantCard
              key={service.slug}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={{
                pathname: '/gamme-de-services',
                query: { service: service.slug },
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}