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
          creationType="courier-diploma-retrieval"
          eyebrow={certificateRetrieval("eyebrow")}
          title={certificateRetrieval("title")}
          description={
            <>
              <p className="mb-4">{certificateRetrieval("description")}</p>
              <ul className="mt-8 space-y-3">
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{certificateRetrieval("payslip.label")} : {certificateRetrieval("payslip.price")}</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{certificateRetrieval("bankAccountCreation.label")} : {certificateRetrieval("bankAccountCreation.price")}</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{certificateRetrieval("simCardCreation.label")} : {certificateRetrieval("simCardCreation.price")}</span>
                </li>
                <li className="flex items-start gap-3.5 ">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{certificateRetrieval("fopEquivalence.label")} : {certificateRetrieval("fopEquivalence.price")}</span>
                </li>
              </ul>
            </>
          }
          imageSrc="/images/courier/courier-3.jpg"
          t={certificateRetrieval}
        />
        <CreationPage
          creationType="courier-diploma-retrieval"
          eyebrow={automobileProcedure("eyebrow")}
          title={automobileProcedure("title")}
          description={
            <>
              <p className="mb-4">{automobileProcedure("description")}</p>
              <ul className="mt-8 space-y-3">
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{automobileProcedure("vehicleMutation.label")} : {automobileProcedure("vehicleMutation.price")}</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-600">{automobileProcedure("carteGrise.label")} : {automobileProcedure("carteGrise.price")}</span>
                </li>
              </ul>
            </>
          }
          imageSrc="/images/courier/courier-4.jpg"
          isReverseSection
          t={automobileProcedure}
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
