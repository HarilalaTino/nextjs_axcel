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

export default async function TranslationRetrieval() {
    const translationRetrieval = await getTranslations("CourierService.translationRetrieval");
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
                    imageSrc="/images/courier/courier-2.jpg"
                    t={translationRetrieval}
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
