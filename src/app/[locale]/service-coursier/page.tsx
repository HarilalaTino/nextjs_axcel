import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
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
  return (
    <>
      <TopMenu />
      <NavMenu />
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
        imageSrc="/images/home/hero-bg-1.jpg"
        t={diplomaTranscription}
      />
      <CreationPage
        creationType="courier-translation-retrieval"
        eyebrow={translationRetrieval("eyebrow")}
        title={translationRetrieval("title")}
        description={
          <>
            <p className="mb-4">{translationRetrieval("description")}</p>
            <ul className="mt-8 space-y-3">
              <li className="flex items-start gap-3.5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </span>
                <span className="text-slate-600">{translationRetrieval("cinRectification.label")} : {translationRetrieval("cinRectification.price")}</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </span>
                <span className="text-slate-600">{translationRetrieval("bulletin3.label")} : {translationRetrieval("bulletin3.price")}</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </span>
                <span className="text-slate-600">{translationRetrieval("birthCertificateTranslation.label")} : {translationRetrieval("birthCertificateTranslation.price")}</span>
              </li>
              <li className="flex items-start gap-3.5 ">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </span>
                <span className="text-slate-600">{translationRetrieval("birthCertificateCopy.label")} : {translationRetrieval("birthCertificateCopy.price")}</span>
              </li>
            </ul>
          </>
        }
        imageSrc="/images/home/hero-bg-1.jpg"
        t={translationRetrieval}
        isReverseSection
      />

      <CreationPage
        creationType="courier-certificates-retrieval"
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
        imageSrc="/images/home/hero-bg-1.jpg"
        t={certificateRetrieval}
      />

      <CreationPage
        creationType="courier-automobile-procedure"
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
        imageSrc="/images/home/hero-bg-1.jpg"
        t={automobileProcedure}
        isReverseSection
      />
    </>
  );
}
