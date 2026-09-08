import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function ProprietorshipCreationPage() {
        const t = await getTranslations("CreationIndividual");

    return (
        <div>
            <TopMenu />
            <NavMenu />
            <CreationPage
                creationType="entreprise-individuelle"
                eyebrow={t("eyebrow")}
                title={t("title")}
                description={
                    <>
                        <strong>Axcel Company</strong> {t("description.intro")}
                        <ul className="mt-4 list-disc list-inside space-y-1 pl-4">
                            <li><strong>NIF</strong> ({t("description.nif")})</li>
                            <li><strong>STAT</strong> ({t("description.stat")})</li>
                            <li><strong>RCS</strong> ({t("description.rcs")})</li>
                        </ul>
                    </>
                }
                imageSrc="/images/home/hero-bg-1.jpg"
                contactHref="/contact"
                quoteHref="/devis"
                contactLabel={t("contact")}
                quoteLabel={t("quote")}
                price={t("price")}
                priceNote={t("priceNote")}
                additionalServicesLabel={t("additionalServices.label")}
                additionalServicesTitle={t("additionalServices.title")}
                additionalServicesDescription={t("additionalServices.description")}
                additionalServices={[
                    { title: t("additionalServices.items.taxCard.title"), description: t("additionalServices.items.taxCard.description") },
                    { title: t("additionalServices.items.activity.title"), description: t("additionalServices.items.activity.description") },
                    { title: t("additionalServices.items.headOffice.title"), description: t("additionalServices.items.headOffice.description") },
                    { title: t("additionalServices.items.closure.title"), description: t("additionalServices.items.closure.description") },
                    { title: t("additionalServices.items.letter.title"), description: t("additionalServices.items.letter.description") },
                    { title: t("additionalServices.items.requests.title"), description: t("additionalServices.items.requests.description") },
                ]}
            />
        </div>
    )
}