import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import ImageLightboxCarousel from "@/components/ui/shared/image-light-box";
import CreationPage, { BasicPrice } from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function TravelAgencyCreation() {
    const t = await getTranslations("travelAgencyCreation");
    const nav = await getTranslations("Nav");
    const basicPrice: BasicPrice = {
        originalPrice: '2 000 000',
        euroEquivalence: '400'
    }
    const images = Array.from({ length: 11 }, (_, index) => ({
        src: `/images/creations/our-creations/creation-${index + 1}.jpeg`,
        alt: `creation ${index + 1}`,
    }))
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
                    {nav("travelAgencyCreation")}
                </h1>

                <CreationPage
                    creationType="travel-agency-creation"
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    description={
                        <>
                            <p>{t("description")}</p>
                        </>
                    }
                    imageSrc="/images/creations/travel-agency.jpg"
                    basicDisplayPrice={basicPrice}
                    t={t}
                />
                <div className="max-w-7xl m-auto mt-10 sm:px-4 lg:px-8">
                    <h2 className="text-center text-2xl font-extrabold leading-tight text-primary sm:text-3xl xl:text-4xl">{t("ourCreations")}</h2>
                    <div className="mt-4 h-1 m-auto w-16 bg-secondary" />

                    <ImageLightboxCarousel images={images} />
                </div>
                <ElegantCardWrapper />
                <div
                    className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
            </div>
        </div>
    )
}