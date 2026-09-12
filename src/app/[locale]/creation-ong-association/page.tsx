import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function NgoAssociationCreation() {
    const ngo = await getTranslations('NgoAssociationCreation.ngo');
    const association = await getTranslations('NgoAssociationCreation.associationCreation');
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
                        creationType="ngo-creation"
                        eyebrow={ngo("eyebrow")}
                        title={ngo("title")}
                        description={
                            <>
                                <p>{ngo("description")}</p>
                            </>
                        }
                        imageSrc="/images/ngo/ngo.jpg"
                        t={ngo}
                    />
                    <CreationPage
                        creationType="association-creation"
                        eyebrow={association("eyebrow")}
                        title={association("title")}
                        description={
                            <>
                                <p>{association("description")}</p>
                            </>
                        }
                        imageSrc="/images/association/association.jpg"
                        t={association}
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