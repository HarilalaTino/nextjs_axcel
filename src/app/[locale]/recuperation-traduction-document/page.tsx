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
                                        slug: "birth-certificate-copy",
                                        label: translationRetrieval("birthCertificateCopy.label"),
                                        quantityAware: true,
                                        unitPriceAr: 30000,
                                    },
                                    {
                                        slug: "marriage-certificate",
                                        label: translationRetrieval("marriageCertificate.label"),
                                        quantityAware: true,
                                        unitPriceAr: 30000,
                                    },
                                    {
                                        slug: "marriage-certificate-translation",
                                        label: translationRetrieval("marriageCertificateTranslation.label"),
                                        quantityAware: true,
                                        unitPriceAr: 50000,
                                    },
                                    {
                                        slug: "birth-certificate-translation",
                                        label: translationRetrieval("birthCertificateTranslation.label"),
                                        quantityAware: true,
                                        unitPriceAr: 50000,
                                    },
                                    {
                                        slug: "criminal-record-certificate",
                                        label: translationRetrieval("bulletin3.label"),
                                        quantityAware: true,
                                        pricesByQuantity: { 1: 38000, 2: 46000, 3: 54000 },
                                    },
                                    {
                                        slug: "national-id-certification",
                                        label: translationRetrieval("cinCertification.label"),
                                        quantityAware: true,
                                        unitPriceAr: 30000,
                                    },
                                    {
                                        slug: "nationality-certificate-retrieval",
                                        label: translationRetrieval("nationalityCertificateRetrieval.label"),
                                        quantityAware: true,
                                        unitPriceAr: 50000,
                                    },
                                    {
                                        slug: "recent-commercial-register-extract",
                                        label: translationRetrieval("rcsRetrieval.label"),
                                        quantityAware: true,
                                    },
                                    {
                                        slug: "recuperation-acte-et-document-administratif",
                                        label: translationRetrieval("administrativeDocumentRetrieval.label"),
                                    },
                                ]}
                            />
                        </>
                    }
                    imageSrc="/images/courier/courier-2.jpeg"
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
