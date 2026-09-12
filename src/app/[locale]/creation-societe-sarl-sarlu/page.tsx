import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function CreationSocieteSarlSarluPage() {
    const t = await getTranslations("CreationSocieteSarl");
    const tSarlu = await getTranslations("CreationSocieteSarlu");
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
                    creationType="sarl-creation"
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    description={
                        <>
                            <p>{t("description")}</p>
                        </>
                    }
                    imageSrc="/images/company/SARL.jpg"
                    price={t("price")}
                    priceNote={t("priceNote")}
                    t={t}
                />
                <CreationPage
                    creationType="sarlu-creation"
                    eyebrow={tSarlu("eyebrow")}
                    title={tSarlu("title")}
                    description={
                        <>
                            <p>{tSarlu("description")}</p>
                        </>
                    }
                    imageSrc="/images/company/SARLU.jpg"
                    price={tSarlu("price")}
                    priceNote={tSarlu("priceNote")}
                    t={tSarlu}
                    isReverseSection
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