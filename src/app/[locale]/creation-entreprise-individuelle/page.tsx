import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
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
                price={t("price")}
                priceNote={t("priceNote")}
                t={t}
            />
            <ElegantCardWrapper />
            <ContactCTA />
        </div>
    )
}