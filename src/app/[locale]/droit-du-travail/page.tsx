import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function InternalRegulationsCnapsIrsa() {
    const internalRegulations = await getTranslations('rightofWork.internalRegulations');
    const cnapsOstieAffiliation = await getTranslations('rightofWork.cnapsOstieAffiliation');
    const irsaDeclaration = await getTranslations('rightofWork.irsaDeclaration');
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
                    creationType="internal-regulations"
                    eyebrow={internalRegulations("eyebrow")}
                    title={internalRegulations("title")}
                    description={<p>{internalRegulations("description")}</p>}
                    imageSrc="/images/association/internalRegulations.jpg"
                    ctasDisplay
                    t={internalRegulations}
                />
                <CreationPage
                    creationType="cnaps-ostie-affiliation"
                    eyebrow={cnapsOstieAffiliation("eyebrow")}
                    title={cnapsOstieAffiliation("title")}
                    description={<p>{cnapsOstieAffiliation("description")}</p>}
                    imageSrc="/images/association/cnapsOstieAffiliation.jpg"
                    isReverseSection
                    ctasDisplay
                    t={cnapsOstieAffiliation}
                />
                <CreationPage
                    creationType="irsa-declaration"
                    eyebrow={irsaDeclaration("eyebrow")}
                    title={irsaDeclaration("title")}
                    description={<p>{irsaDeclaration("description")}</p>}
                    ctasDisplay
                    imageSrc="/images/association/irsaDeclaration.jpg"
                    t={irsaDeclaration}
                />
                <ElegantCardWrapper />
                <div
                    className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
            </div>
            <ContactCTA />

        </>
    )
}