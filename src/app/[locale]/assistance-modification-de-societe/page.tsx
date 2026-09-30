import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function CompanyModificationAssistance() {
    const companyModificationAssistance = await getTranslations('adviceAndAssistance.companyModificationAssistance');
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
                    {nav("creationNogAndAssociation")}
                </h1>
                <CreationPage
                    creationType="company-modification-assistance"
                    eyebrow={companyModificationAssistance("eyebrow")}
                    title={companyModificationAssistance("title")}
                    description={<p>{companyModificationAssistance("description")}</p>}
                    imageSrc="/images/advice/company-modification-assistance.jpg"
                    ctasDisplay
                    t={companyModificationAssistance}
                />
                <ElegantCardWrapper />
                <div
                    className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
            </div>
        </>
    )
}