import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage, { BasicPrice } from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function SocietyCreationSAorSAUorSCAI() {
    const sa = await getTranslations('societyCreation.sa');
    const sau = await getTranslations('societyCreation.sau');
    const sci = await getTranslations('societyCreation.sci');
    const saPoints = [
        "shareholders",
        "liability",
        "governance",
        "investors",
    ];
    const sauPoints = [
        "shareholders",
        "liability",
        "governance",
        "evolution",
        "credibility",
    ];
    const sciPoints = [
        "partners",
        "capital",
        "purpose",
        "liability",
        "transmission",
    ];
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
                    creationType="society-creation-sa"
                    eyebrow={sa("eyebrow")}
                    title={sa("title")}
                    description={
                        <>
                            <p>{sa("description")}</p>
                            <p className="mt-3">{sa("keyPoints.title")}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                {saPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="text-primary/70"
                                    >
                                        <span className="leading-7">
                                            {sa(`keyPoints.items.${point}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                        </>
                    }
                    imageSrc="/images/association/sa.jpg"
                    ctasDisplay
                    t={sa}
                />
                <CreationPage
                    creationType="society-creation-sau"
                    eyebrow={sau("eyebrow")}
                    title={sau("title")}
                    description={
                        <>
                            <p>{sau("description")}</p>
                            <p className="mt-3">{sau("keyPoints.title")}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                {sauPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="text-primary/70"
                                    >
                                        <span className="leading-7">
                                            {sau(`keyPoints.items.${point}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                        </>
                    }
                    imageSrc="/images/association/sau.jpg"
                    isReverseSection
                    ctasDisplay
                    t={sau}
                />
                <CreationPage
                    creationType="society-creation-sci"
                    eyebrow={sci("eyebrow")}
                    title={sci("title")}
                    description={
                        <>
                            <p>{sci("description")}</p>
                            <p className="mt-3">{sci("keyPoints.title")}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                {sciPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="text-primary/70"
                                    >
                                        <span className="leading-7">
                                            {sci(`keyPoints.items.${point}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                        </>
                    }
                    imageSrc="/images/association/sci.jpg"
                    ctasDisplay
                    t={sci}
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