import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";

const rangeServiceDetails: Record<
  string,
  { title: string; description: string; imageSrc: string; details: string[] }
> = {
  taxCard: {
    title: "Renouvellement carte fiscale",
    description:
      "Le renouvellement de la carte fiscale permet de rester conforme aux exigences administratives de l’État et de poursuivre l’exercice de votre activité sans interruption.",
    imageSrc: "/images/company/company-hero-1.jpg",
    details: [
      "Vérification des obligations fiscales",
      "Préparation du dossier de renouvellement",
      "Suivi administratif jusqu’à validation",
    ],
  },
  activity: {
    title: "Changement, rajout d’activité",
    description:
      "Nous accompagnons les entreprises dans les formalités liées au changement ou au rajout d’activité, afin de sécuriser les mises à jour réglementaires.",
    imageSrc: "/images/association/businessFormalizationAssistance.jpg",
    details: [
      "Analyse de la nouvelle activité",
      "Mise à jour des statuts et documents",
      "Assistance lors des démarches institutionnelles",
    ],
  },
  headOffice: {
    title: "Changement de siège social",
    description:
      "Le changement de siège social impose des démarches juridiques et administratives précises. Nous vous aidons à les réaliser dans les règles.",
    imageSrc: "/images/association/change-office.jpg",
    details: [
      "Contrôle du dossier de changement",
      "Coordination des formalités administratives",
      "Accompagnement sur les notifications requises",
    ],
  },
  closure: {
    title: "Cessation d’activité",
    description:
      "Nous vous assistons dans les étapes de fermeture de votre activité afin de clôturer correctement votre dossier et limiter les risques administratifs.",
    imageSrc: "/images/company/closure.jpg",
    details: [
      "Évaluation des obligations de clôture",
      "Préparation du dossier de cessation",
      "Suivi jusqu’à la finalisation",
    ],
  },
  letter: {
    title: "Rédaction de lettre administrative",
    description:
      "Nos rédactions administratives sont conçues pour être claires, conformes et adaptées à vos demandes auprès des administrations ou partenaires.",
    imageSrc: "/images/company/letter.jpg",
    details: [
      "Rédaction sur mesure",
      "Formulation conforme aux exigences",
      "Transmission de documents prêts à l’usage",
    ],
  },
  requests: {
    title: "Diverses demandes administratives",
    description:
      "Nous traitons plusieurs demandes institutionnelles, y compris les agréments, autorisations et autres démarches nécessitant une expertise particulière.",
    imageSrc: "/images/company/admin-request.jpg",
    details: [
      "Évaluation du type de demande",
      "Préparation complète du dossier",
      "Suivi jusqu’au résultat attendu",
    ],
  },
};

export default async function RangeOfServicePage({
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ service?: string | string[] }>;
}) {
  const query = (await searchParams) ?? {};
  const selectedService = Array.isArray(query.service)
    ? query.service[0]
    : query.service ?? "taxCard";

  const service = rangeServiceDetails[selectedService] ?? rangeServiceDetails.taxCard;
  const creationPages = await getTranslations("CreationPages");
  const t = await getTranslations("CreationPages.additionalServices")

  const serviceTitle =
    creationPages(`additionalServices.items.${selectedService}.title`) || service.title;

  const serviceDescription =
    creationPages(`additionalServices.items.${selectedService}.description`) ||
    service.description;

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
          eyebrow={creationPages("additionalServices.label")}
          title={serviceTitle}
          description={
            <div className="space-y-4">
              <p>{serviceDescription}</p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-primary/70 sm:text-base">
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          }
          imageSrc={service.imageSrc}
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
