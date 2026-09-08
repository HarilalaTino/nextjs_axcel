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
            <CreationPage
                creationType="sarl"
                eyebrow={t("eyebrow")}
                title={t("title")}
                description={
                    <>
                        <p>{t("description")}</p>
                    </>
                }
                imageSrc="/images/home/hero-bg-1.jpg"
                price={t("price")}
                priceNote={t("priceNote")}
                t={t}
            />
            <CreationPage
                creationType="sarlu"
                eyebrow={tSarlu("eyebrow")}
                title={tSarlu("title")}
                description={
                    <>
                        <p>{tSarlu("description")}</p>
                    </>
                }
                imageSrc="/images/home/hero-bg-1.jpg"
                price={tSarlu("price")}
                priceNote={tSarlu("priceNote")}
                t={tSarlu}
                isReverseSection
            />
            <ElegantCardWrapper />
            <ContactCTA />
        </>
    )
}