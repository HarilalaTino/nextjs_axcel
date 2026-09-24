import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";


export const metadata = {
  title: `Service coursier | Axcel Company`,
  description: 'Service de coursier pour la récupération de certificats, diplômes et relevés de notes. Axcel Company vous propose un service rapide et fiable pour récupérer vos documents officiels en toute sécurité.',
};

export default async function CourierService() {
  const diplomaTranscription = await getTranslations("CourierService.courierDiplomaRetrieval");
  const translationRetrieval = await getTranslations("CourierService.translationRetrieval");
  const certificateRetrieval = await getTranslations("CourierService.certificateRetrieval");
  const automobileProcedure = await getTranslations("CourierService.automobileProcedure");
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
              <ul className="mt-8 space-y-3">
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{diplomaTranscription("bacc.label")} : {diplomaTranscription("bacc.price")}</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{diplomaTranscription("achievementCertificate.label")} : {diplomaTranscription("achievementCertificate.price")}</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{diplomaTranscription("Licence.label")} : {diplomaTranscription("Licence.price")}</span>
                </li>
                <li className="flex items-start gap-3.5 ">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{diplomaTranscription("Master.label")} : {diplomaTranscription("Master.price")}</span>
                </li>
              </ul>
            </>
          }
          imageSrc="/images/courier/courier-1.jpg"
          t={diplomaTranscription}
        />
        <ElegantCardWrapper />

        <div
          className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
          aria-hidden="true"
        />
      </div>
            <ContactCTA />

    </>
  );
}
