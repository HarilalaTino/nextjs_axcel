import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function CompanyCreationConsulting() {
    const companyCreationConsulting = await getTranslations('adviceAndAssistance.companyCreationConsulting');
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
                    {nav("companyCreationConsulting")}
                </h1>
                <CreationPage
                    creationType="company-creation-consulting"
                    eyebrow={companyCreationConsulting("eyebrow")}
                    title={companyCreationConsulting("title")}
                    description={<p>{companyCreationConsulting("description")}</p>}
                    imageSrc="/images/advice/company-creation-consulting.jpg"
                    ctasDisplay
                    t={companyCreationConsulting}
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