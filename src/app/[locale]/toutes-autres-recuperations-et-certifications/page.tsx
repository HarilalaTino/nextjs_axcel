import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CourierDiplomaSelection from "@/components/ui/shared/courier-diploma-selection";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";


export const metadata = {
  title: `Service coursier | Axcel Company`,
  description: 'Service de coursier pour la récupération de certificats, diplômes et relevés de notes. Axcel Company vous propose un service rapide et fiable pour récupérer vos documents officiels en toute sécurité.',
};

export default async function certificateRetrieval() {
  const certificateRetrieval = await getTranslations("CourierService.allOtherCertificationRecoveries.certificateRetrieval");
  const automobileProcedure = await getTranslations("CourierService.allOtherCertificationRecoveries.automobileProcedure");
  const nav = await getTranslations("Nav");

  return (
    <>
      <TopMenu />
      <NavMenu />
      <div className="relative overflow-hidden ">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/5"
          aria-hidden="true"
        />
        <h1 className="text-xs font-normal text-transparent absolute -z-10">
          {nav("courierServiceTitle")}
        </h1>
        <CreationPage
          creationType="other-administrative-certificate"
          eyebrow={certificateRetrieval("eyebrow")}
          title={certificateRetrieval("title")}
          description={
            <>
              <p className="mb-4">{certificateRetrieval("description")}</p>
              <CourierDiplomaSelection
                requiredMessage={certificateRetrieval("selectionRequired")}
                options={[
                  {
                    slug: "bank-account-creation",
                    label: certificateRetrieval("bankAccountCreation.label"),
                    unitPriceAr: 100000,
                  },
                  {
                    slug: "sim-card-creation",
                    label: certificateRetrieval("simCardCreation.label"),
                    unitPriceAr: 100000,
                  },
                  {
                    slug: "fop-equivalence-retrieval",
                    label: certificateRetrieval("fopEquivalence.label"),
                    unitPriceAr: 100000,
                  },
                ]}
              />
            </>
          }
          imageSrc="/images/courier/courier-3.jpg"
          ctasDisplay
          requiredSelectionType="other-administrative-certificate"
          t={certificateRetrieval}
        />
        <CreationPage
          creationType="Administrative-procedures-for-automobiles"
          eyebrow={automobileProcedure("eyebrow")}
          title={automobileProcedure("title")}
          description={
            <>
              <p className="mb-4">{automobileProcedure("description")}</p>
              <CourierDiplomaSelection
                requiredMessage={automobileProcedure("selectionRequired")}
                options={[
                  {
                    slug: "vehicle-mutation",
                    label: automobileProcedure("vehicleMutation.label"),
                    unitPriceAr: 100000,
                  },
                  {
                    slug: "vehicle-registration-card-change",
                    label: automobileProcedure("carteGrise.label"),
                    unitPriceAr: 100000,
                  },
                ]}
              />
            </>
          }
          imageSrc="/images/courier/courier-4.jpg"
          isReverseSection
          ctasDisplay
          requiredSelectionType="Administrative-procedures-for-automobiles"
          t={automobileProcedure}
        />
        <ElegantCardWrapper />

        <div
          className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
          aria-hidden="true"
        />
      </div>
    </>
  );
}
