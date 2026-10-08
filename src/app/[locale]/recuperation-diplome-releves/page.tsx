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

export default async function CourierDiplomaRetrieval() {
  const diplomaTranscription = await getTranslations("CourierService.courierDiplomaRetrieval");
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
          creationType="courier-diploma-retrieval"
          eyebrow={diplomaTranscription("eyebrow")}
          title={diplomaTranscription("title")}
          description={
            <>
              <p className="mb-4">{diplomaTranscription("description")}</p>
              <CourierDiplomaSelection
                options={[
                  {
                    slug: "releve-de-notes-bacc",
                    label: diplomaTranscription("bacc.label"),
                    price: diplomaTranscription("bacc.price"),
                  },
                  {
                    slug: "attestation-de-reussite",
                    label: diplomaTranscription("achievementCertificate.label"),
                    price: diplomaTranscription("achievementCertificate.price"),
                  },
                  {
                    slug: "licence",
                    label: diplomaTranscription("Licence.label"),
                    price: diplomaTranscription("Licence.price"),
                  },
                  {
                    slug: "diplome-master",
                    label: diplomaTranscription("Master.label"),
                    price: diplomaTranscription("Master.price"),
                  },
                ]}
              />
            </>
          }
          imageSrc="/images/courier/courier-1.jpg"
          ctasDisplay
          t={diplomaTranscription}
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
