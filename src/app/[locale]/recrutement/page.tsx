import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ImageLightboxCarousel from "@/components/ui/shared/image-light-box";
import { getTranslations } from "next-intl/server";

export default async function Recruitment() {
    const t = await getTranslations("Recruitment");
    const roles = [
        { slug: "senior-accountant", labelKey: "seniorAccountant" },
        { slug: "telesales-agents", labelKey: "telesalesAgents" },
        { slug: "field-agents", labelKey: "fieldAgents" },
        { slug: "graphic-design-intern", labelKey: "graphicDesignIntern" },
        { slug: "cleaner", labelKey: "cleaner" },
        { slug: "sales-representative", labelKey: "salesRepresentative" },
        { slug: "field-sales-representative", labelKey: "fieldSalesRepresentative" },
        { slug: "bank-branch-manager", labelKey: "bankBranchManager" },
        { slug: "administrative-assistant", labelKey: "administrativeAssistant" },
        { slug: "prospector", labelKey: "prospector" },
        { slug: "partnerships-manager", labelKey: "partnershipsManager" },
    ] as const;
    const images = roles.map((role, index) => ({
        src: `/images/recruitment/recruitment-${index + 1}.jpeg`,
        alt: t(`roles.${role.labelKey}`),
        quoteSlug: role.slug,
    }));
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
                <ImageLightboxCarousel images={images} quotePoolOfCVs={t('quotePoolOfCVs')} />
                <ContactCTA />
            </div>
        </>
    )
}