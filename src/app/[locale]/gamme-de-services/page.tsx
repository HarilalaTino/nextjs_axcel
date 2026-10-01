import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";

const rangeServiceImages = {
  taxCard: "/images/others-activities/renew.jpeg",
  activity: "/images/others-activities/activity.jpeg",
  headOffice: "/images/others-activities/change-office.jpeg",
  closure: "/images/others-activities/closure.jpeg",
  letter: "/images/others-activities/letter.jpeg",
  requests: "/images/others-activities/admin-request.jpeg",
} as const;

type RangeServiceKey = keyof typeof rangeServiceImages;

function isRangeServiceKey(value: string): value is RangeServiceKey {
  return Object.hasOwn(rangeServiceImages, value);
}

export default async function RangeOfServicePage({
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ service?: string | string[] }>;
}) {
  const query = (await searchParams) ?? {};
  const requestedService = Array.isArray(query.service)
    ? query.service[0]
    : query.service ?? "taxCard";
  const selectedService = isRangeServiceKey(requestedService)
    ? requestedService
    : "taxCard";

  const t = await getTranslations("CreationPages.additionalServices");
  const serviceTitle = t(`items.${selectedService}.title`);
  const serviceDescription = t(`items.${selectedService}.description`);
  const serviceDetails = t.raw(`items.${selectedService}.details`) as string[];

  return (
    <>
      <TopMenu />
      <NavMenu />
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/5"
          aria-hidden="true"
        />
        <h1 className="text-xs font-normal text-transparent absolute -z-10">
          {serviceTitle}
        </h1>

        <CreationPage
          creationType={selectedService}
          overideQueryparams="selected"
          eyebrow={t("label")}
          title={serviceTitle}
          description={
            <div className="space-y-4">
              <p>{serviceDescription}</p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-primary/70 sm:text-base">
                {serviceDetails.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          }
          imageSrc={rangeServiceImages[selectedService]}
          ctasDisplay
          t={t}
        />

        <div
          className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
          aria-hidden="true"
        />
      </div>

      <ElegantCardWrapper excludedSlug={selectedService} />
    </>
  );
}
