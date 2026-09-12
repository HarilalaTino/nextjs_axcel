import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function CreationDomiciliationPage() {
    const t = await getTranslations("Domiciliation");
    return (
        <>
            <TopMenu />
            <NavMenu />
            <div className="overflow-hidden relative">
                <div
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
                <CreationPage
                    creationType="sole-proprietorship-creation"
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    description={
                        <>
                            <p>{t("description")}</p>
                            <ul className="mt-4 list-disc list-inside space-y-1 pl-4">
                                <li>{t("why.first")}</li>
                                <li>{t("why.second")}</li>
                                <li>{t("why.third")}</li>
                                <li>{t("why.fourth")}</li>
                            </ul>
                        </>
                    }
                    imageSrc="/images/domiciliation/domiciliation.jpg"
                    t={t}
                    hideDevis
                />
                <div
                    className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
                <ElegantCardWrapper />
            </div>
            <ContactCTA />
        </>
    )
}