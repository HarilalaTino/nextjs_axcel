import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";
import StatsSection from "./stats-section";
import ServicesSection from "./service-section";
import Link from "next/link";
import TeamSection from "./team-secton";

export default async function AboutPage() {
    const t = await getTranslations("About.creationPage");
    const serviceTranslation = await getTranslations("About.service");
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
                    creationType="sole-proprietorship-creation"
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    description={
                        <>
                            <strong>Axcel Company</strong> {t("description")}
                            <ul className="mt-4 list-disc list-inside space-y-1 pl-4">
                                <li>{t("lists.first")}</li>
                                <li> {t("lists.second")}</li>
                                <li> {t("lists.third")}</li>
                            </ul>
                        </>
                    }
                    imageSrc="/images/about/about-1.jpg"
                    t={t}
                    overidecta={
                        <Link
                            href="/contact"
                            className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary/90"
                        >
                            {t("findMore")}
                        </Link>
                    }
                    hideDevis
                    hideContact
                />

                <StatsSection />
                <div className="pt-10"></div>
                <CreationPage
                    creationType="sole-proprietorship-creation"
                    eyebrow={serviceTranslation("eyebrow")}
                    title={serviceTranslation("title")}
                    description={
                        <>
                            {serviceTranslation("description")}
                            <ServicesSection />
                        </>
                    }
                    imageSrc="/images/about/about-2.jpg"
                    t={serviceTranslation}
                    hideDevis
                    hideContact
                    isReverseSection
                />
                < TeamSection />
                <div
                    className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
                    aria-hidden="true"
                />
            </div>
        </>
    )
}