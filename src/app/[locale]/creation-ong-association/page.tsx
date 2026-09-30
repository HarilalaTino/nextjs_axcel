import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage, { BasicPrice } from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function NgoAssociationCreation() {
    const forProfit = await getTranslations('NgoAssociationCreation.forProfit');
    const nonProfit = await getTranslations('NgoAssociationCreation.nonProfit');
    const t = await getTranslations("religious");
    const nav = await getTranslations("Nav");
    const basicPrice: BasicPrice = {
        originalPrice: '400 000',
        euroEquivalence: '80'
    }

    const basicReligiousPrice: BasicPrice = {
        originalPrice: '2 000 000',
        euroEquivalence: '400'
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
                    {nav("creationNogAndAssociation")}
                </h1>
                <CreationPage
                    creationType="for-profit-association"
                    eyebrow={forProfit("eyebrow")}
                    title={forProfit("title")}
                    description={
                        <>
                            <p>{forProfit("description")}</p>
                        </>
                    }
                    basicDisplayPrice={basicPrice}
                    imageSrc="/images/creations/forProfit.jpg"
                    t={forProfit}
                />
                <CreationPage
                    creationType="non-profit-association"
                    eyebrow={nonProfit("eyebrow")}
                    title={nonProfit("title")}
                    description={
                        <>
                            <p>{nonProfit("description")}</p>
                        </>
                    }
                    imageSrc="/images/creations/nonProfit.jpg"
                    t={nonProfit}
                    basicDisplayPrice={basicPrice}
                    isReverseSection
                />
                <CreationPage
                    creationType="establishment-of-religious-association"
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    description={
                        <>
                            <p>{t("description")}</p>
                        </>
                    }
                    imageSrc="/images/creations/religious.jpg"
                    basicDisplayPrice={basicReligiousPrice}
                    t={t}
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