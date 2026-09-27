import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ImageLightboxCarousel from "@/components/ui/shared/image-light-box";
import { getTranslations } from "next-intl/server";

export default async function Recruitment() {
    const t = await getTranslations("Recruitment");
      const images = Array.from({ length: 11 }, (_, index) => ({
        src: `/images/recruitment/recruitment-${index + 1}.jpeg`,
        alt: `Recrutement ${index + 1}`,
    }))
    return (
        <>
            <TopMenu />
            <NavMenu />
            <div className="wrap w-full mx-auto overflow-hidden relative py-20 px-8 2xl:px-0">
                <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{t('eyebrow')}</p>
                <h2 className=" text-2xl font-extrabold leading-tight text-primary sm:text-3xl xl:text-4xl">
                    {t('title')}
                </h2>
                <div className="mt-4 h-1 w-16 bg-secondary"></div>
                <p className="mt-5 mb-14 text-lg leading-8 text-slate-600">{t('description')}</p>
                <ImageLightboxCarousel images={images} />
            </div>
            <ContactCTA />

        </>
    )
}