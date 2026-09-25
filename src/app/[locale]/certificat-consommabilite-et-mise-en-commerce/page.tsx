import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage, { BasicPrice } from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";


export const metadata = {
    title: `Service coursier | Axcel Company`,
    description: 'Service de coursier pour la récupération de certificats, diplômes et relevés de notes. Axcel Company vous propose un service rapide et fiable pour récupérer vos documents officiels en toute sécurité.',
};

export default async function CertificateOfSuitabilityForMarketPlacement() {
    const consumabilityCertification = await getTranslations("CourierService.consumabilityCertification");
    const basicPrice: BasicPrice =
    {
        originalPrice: "300 000",
        euroEquivalence: "60"
    }
    const consummability = [
        "healthCertificate",
        "commerceAuthorization",
        "registration",
        "establishmentRegistration",
    ];
    return (
        <>
            <TopMenu />
            <NavMenu />
            <div className="relative overflow-hidden ">
                <div
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
                <CreationPage
                    creationType="certificate-of-market-authorization"
                    eyebrow={consumabilityCertification("eyebrow")}
                    title={consumabilityCertification("title")}
                    description={
                        <>
                            <p>{consumabilityCertification("description")}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                {consummability.map((point) => (
                                    <li
                                        key={point}
                                        className="text-primary/70"
                                    >
                                        <span className="leading-7">
                                            {consumabilityCertification(`keyPoints.items.${point}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                    imageSrc="/images/courier/courier-5.jpg"
                    basicDisplayPrice={basicPrice}
                    t={consumabilityCertification}
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
