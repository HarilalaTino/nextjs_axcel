import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage, { Tier } from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function CreationSocieteSarlSarluPage() {
    const t = await getTranslations("CreationSocieteSarl");
    const tSarlu = await getTranslations("CreationSocieteSarlu");
    const nav = await getTranslations("Nav");

    const tiers: Tier[] = [
        {
            label: 'Malgaches',
            amount: '400 000 Ar',
            quoteUrl: "citizen",
        },
        {
            label: 'Strangers',
            amount: '500 000 Ar',
            quoteUrl: "stranger",
            alt: '100 €'
        }
    ]

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
                    {nav("creationSarl")}
                </h1>
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
                    tiers={tiers}
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
                    tiers={tiers}
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