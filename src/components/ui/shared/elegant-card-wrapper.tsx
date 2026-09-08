import { getTranslations } from "next-intl/server";
import ElegantCard from "./elegant-card";
import { Ban, Building2, FileText, Home, MessageSquareMore, RefreshCcwDot } from "lucide-react";

export default async function ElegantCardWrapper() {
  const creationPages = await getTranslations("CreationPages");
  const elms = [
    { title: creationPages('additionalServices.items.taxCard.title'), description: creationPages('additionalServices.items.taxCard.description') },
    { title: creationPages('additionalServices.items.activity.title'), description: creationPages('additionalServices.items.activity.description') },
    { title: creationPages('additionalServices.items.headOffice.title'), description: creationPages('additionalServices.items.headOffice.description') },
    { title: creationPages('additionalServices.items.closure.title'), description: creationPages('additionalServices.items.closure.description') },
    { title: creationPages('additionalServices.items.letter.title'), description: creationPages('additionalServices.items.letter.description') },
    { title: creationPages('additionalServices.items.requests.title'), description: creationPages('additionalServices.items.requests.description') },
  ];
    return (
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
              {creationPages('additionalServices.label')}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              {creationPages('additionalServices.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary/60">
              {creationPages('additionalServices.description')}
            </p>
            <div className="mx-auto mt-6 h-1 w-16 bg-secondary" />

            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {elms.map((service, index) => (
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
    )
}