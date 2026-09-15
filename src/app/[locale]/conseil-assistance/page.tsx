import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";
import ProcessSteps from "./step";

export default async function AdviceAndAssistance() {
    const t = await getTranslations("AdviceAndAssistance");
    const nav = await getTranslations("Nav");

    return (
        <>
            <TopMenu />
            <NavMenu />
            <div className="overflow-hidden relative">
                <div
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
                <h1 className="text-xs font-normal text-transparent absolute -z-10">
                    {nav("adviceTitle")}
                </h1>
                <CreationPage
                    creationType="sole-proprietorship-creation"
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    description={
                        <>
                            {t("description")}
                        </>
                    }
                    imageSrc="/images/advice/advice.jpg"
                    hideDevis
                    t={t}
                />
                <ProcessSteps />
                <div
                    className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
            </div>
            <ContactCTA />
        </>
    )
}