import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage, { BasicPrice } from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function CreationDomiciliationPage() {
    const t = await getTranslations("Domiciliation");
    const nav = await getTranslations("Nav");
    const basicPrice: BasicPrice = {
        title: 'Prix mensuelle',
        originalPrice: '100 000',
        euroEquivalence: '20',
        annotation: <span className="text-red-800">{t('annotation')}</span>
    }
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
                    {nav("creationDomiciliation")}
                </h1>
                <CreationPage
                    creationType="domiciliation"
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
                    basicDisplayPrice={basicPrice}
                    t={t}
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