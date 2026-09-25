import NavMenu from "@/components/layout/header";
import ContactCTA from "@/components/ui/home/contact-cta";
import TopMenu from "@/components/ui/home/top-menu";
import ElegantCardWrapper from "@/components/ui/shared/elegant-card-wrapper";
import CreationPage from "@/components/ui/shared/page-creation";
import { getTranslations } from "next-intl/server";

export default async function DraftingContractLeaseServiceProvider() {
    const employmentContract = await getTranslations('contractDrafting.employmentContract');
    const leaseContract = await getTranslations('contractDrafting.leaseContract');
    const serviceProviderContract = await getTranslations('contractDrafting.serviceProviderContract');
    const nav = await getTranslations("Nav");
    const employmentContractPoints = [
        "writtenForm",
        "classification",
        "salary",
        "effectiveDate",
    ];
    const leaseContractPoints = [
        "parties",
        "duration",
        "rent",
        "deposit"
    ];
    const serviceProviderContractPoints = [
        "scope",
        "payment",
        "independence",
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
                <h1 className="text-xs font-normal text-transparent absolute -z-10">
                    {nav("creationNogAndAssociation")}
                </h1>
                <CreationPage
                    creationType="employment-contract"
                    eyebrow={employmentContract("eyebrow")}
                    title={employmentContract("title")}
                    description={
                        <>
                            <p>{employmentContract("description")}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                {employmentContractPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="text-primary/70"
                                    >
                                        <span className="leading-7">
                                            {employmentContract(`keyPoints.items.${point}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                    imageSrc="/images/association/employmentContract.jpg"
                    ctasDisplay
                    t={employmentContract}
                />
                <CreationPage
                    creationType="lease-contract"
                    eyebrow={leaseContract("eyebrow")}
                    title={leaseContract("title")}
                    description={
                        <>
                            <p>{leaseContract("description")}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                {leaseContractPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="text-primary/70"
                                    >
                                        <span className="leading-7">
                                            {leaseContract(`keyPoints.items.${point}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                    imageSrc="/images/association/leaseContract.jpg"
                    isReverseSection
                    ctasDisplay
                    t={leaseContract}
                />
                <CreationPage
                    creationType="service-provider-contract"
                    eyebrow={serviceProviderContract("eyebrow")}
                    title={serviceProviderContract("title")}
                    description={
                        <>
                            <p>{serviceProviderContract("description")}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                {serviceProviderContractPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="text-primary/70"
                                    >
                                        <span className="leading-7">
                                            {serviceProviderContract(`keyPoints.items.${point}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                    ctasDisplay
                    imageSrc="/images/association/serviceProviderContract.jpg"
                    t={serviceProviderContract}
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