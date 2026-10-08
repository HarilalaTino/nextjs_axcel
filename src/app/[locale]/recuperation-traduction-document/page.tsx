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
                            <CourierDiplomaSelection
                                requiredMessage={translationRetrieval("selectionRequired")}
                                quantityLabel={translationRetrieval("quantity")}
                                options={[
                                    {
                                        slug: "copie-acte-de-naissance",
                                        label: translationRetrieval("birthCertificateCopy.label"),
                                        quantityAware: true,
                                        unitPriceAr: 30000,
                                    },
                                    {
                                        slug: "acte-de-mariage",
                                        label: translationRetrieval("marriageCertificate.label"),
                                    },
                                    {
                                        slug: "bulletin-n3",
                                        label: translationRetrieval("bulletin3.label"),
                                        quantityAware: true,
                                        pricesByQuantity: { 1: 38000, 2: 46000, 3: 54000 },
                                    },
                                    {
                                        slug: "traduction-acte-de-mariage",
                                        label: translationRetrieval("marriageCertificateTranslation.label"),
                                    },
                                    {
                                        slug: "traduction-acte-de-naissance",
                                        label: translationRetrieval("birthCertificateTranslation.label"),
                                        quantityAware: true,
                                        unitPriceAr: 50000,
                                    },
                                    {
                                        slug: "certification-cin",
                                        label: translationRetrieval("cinCertification.label"),
                                        quantityAware: true,
                                        unitPriceAr: 30000,
                                    },
                                    {
                                        slug: "recuperation-certificat-nationalite",
                                        label: translationRetrieval("nationalityCertificateRetrieval.label"),
                                        quantityAware: true,
                                        unitPriceAr: 50000,
                                    },
                                    {
                                        slug: "recuperation-rcs-moins-de-3-mois",
                                        label: translationRetrieval("rcsRetrieval.label"),
                                    },
                                    {
                                        slug: "recuperation-acte-et-document-administratif",
                                        label: translationRetrieval("administrativeDocumentRetrieval.label"),
                                    },
                                ]}
                            />
                        </>
                    }
                    imageSrc="/images/courier/courier-2.jpg"
                    ctasDisplay
                    requiredSelectionType="courier-translation-retrieval"
                    t={translationRetrieval}
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
