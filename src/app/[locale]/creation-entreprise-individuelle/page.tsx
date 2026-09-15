import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function ProprietorshipCreationPage() {
    const t = await getTranslations("CreationIndividual");
    const nav = await getTranslations("Nav");
    return (
        <div>
            <TopMenu />
            <NavMenu />
            <div className="overflow-hidden relative">
                <div
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
                <h1 className="text-xs font-normal text-transparent absolute -z-10">
                    {nav("creationIndividual")}
                </h1>

                <CreationPage
                    creationType="sole-proprietorship-creation"
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    description={
                        <>
                            <strong>Axcel Company</strong> {t("description.intro")}
                            <div className="mt-4 list-disc list-inside space-y-1 pl-4">
                                <h3><strong>NIF</strong> ({t("description.nif")})</h3>
                                <h3><strong>STAT</strong> ({t("description.stat")})</h3>
                                <h3><strong>RCS</strong> ({t("description.rcs")})</h3>
                            </div>
                        </>
                    }
                    imageSrc="/images/company/individual.jpg"
                    price={t("price")}
                    priceNote={t("priceNote")}
                    t={t}
                />
                <ElegantCardWrapper />
                <div
                    className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
            </div>
            <ContactCTA />
        </div>
    )
}