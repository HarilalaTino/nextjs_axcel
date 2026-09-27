import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import CarouselWithTrigger from "@/components/ui/shared/carousel-trigger";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Recruitment() {
    const t = await getTranslations("Recruitment");
    return (
        <>
            <TopMenu />
            <NavMenu />
            <div className="wrap w-full mx-auto overflow-hidden relative py-20 px-8 2xl:px-0">
                <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{t('eyebrow')}</p>
                <h2 className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl xl:text-4xl">
                    {t('title')}
                </h2>
                <p className="mt-5 mb-14 text-lg leading-8 text-slate-600">{t('description')}</p>
                <CarouselWithTrigger
                    slides={[
                        ...Array.from({ length: 11 }, (_, index) => (
                            <div
                                key={`recruitment-${index + 1}`}
                                className="relative h-[420px] w-full border border-gray-200 overflow-hidden rounded-[2rem]"
                            >
                                <Image
                                    src={`/images/recruitment/recruitment-${index + 1}.jpeg`}
                                    alt={`Recrutement ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            </div>
                        )),
                    ]}
                />
            </div>
            <ContactCTA />

        </>
    )
}