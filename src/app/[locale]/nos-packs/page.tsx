import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import ImageLightboxCarousel from "@/components/ui/shared/image-light-box";
import { getTranslations } from "next-intl/server";

export default async function NosPacks() {
    const t = await getTranslations("OurPacks");
      const images = Array.from({ length: 11 }, (_, index) => ({
        src: `/images/creations/packs/packs-${index + 1}.jpeg`,
        alt: `Packs ${index + 1}`,
    }))
    return (
        <>
            <TopMenu />
            <NavMenu />
            <div className="wrap w-full mx-auto overflow-hidden relative py-8 px-6 lg:px-8 lg:py-12">
                <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{t('eyebrow')}</p>
                <h2 className=" text-2xl font-extrabold leading-tight text-primary sm:text-3xl xl:text-4xl">
                    {t('title')}
                </h2>
                <div className="mt-4 h-1 w-16 bg-secondary"></div>
                <p className="mt-5 my-8 text-sm text-primary/70 sm:text-base">{t('description')}</p>
                <ImageLightboxCarousel images={images} />
                <ElegantCardWrapper />
            </div>
        </>
    )
}