import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage, { BasicPrice } from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function WholesaleDesignCreation() {
    const t = await getTranslations("wholesaleCreation");
    const nav = await getTranslations("Nav");
    const basicPrice: BasicPrice = {
        title: 'Prix total',
        originalPrice: '2 280 000',
        euroEquivalence: '455',
        annotation: ' '
    }
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
                    {nav("wholesaleDesignCreation")}
                </h1>

                <CreationPage
                    creationType="wholesale-design"
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    description={
                        <>
                            <p>{t("description")}</p>
                        </>
                    }
                    imageSrc="/images/company/wholesale.jpg"
                    basicDisplayPrice={basicPrice}
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