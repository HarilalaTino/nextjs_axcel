import NavMenu from "@/components/layout/header";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function OfficeRoomRental() {
    const officeRoomRental = await getTranslations('roomRental.officeRoomRental');
    const nav = await getTranslations("Nav");
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
                    creationType="office-room-rental"
                    eyebrow={officeRoomRental("eyebrow")}
                    title={officeRoomRental("title")}
                    description={<p>{officeRoomRental("description")}</p>}
                    imageSrc="/images/venue-rental/office-room-rental.jpg"
                    ctasDisplay
                    t={officeRoomRental}
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