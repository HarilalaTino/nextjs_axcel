import NavMenu from "@/components/layout/header";
import AboutSection from "@/components/ui/home/about-section";
import ContactCTA from "@/components/ui/home/contact-cta";
import HeroServices from "@/components/ui/home/hero-home";
import Partner from "@/components/ui/home/partner";
import ProfessionalServices from "@/components/ui/home/professional-services";
import TopMenu from "@/components/ui/home/top-menu";
import TrustedCompanies from "@/components/ui/home/trust-company";
import WhyChooseUs from "@/components/ui/home/why-us";

export default function Home() {
  return (
    <>
    <TopMenu />
    <NavMenu />
    <HeroServices />
    <AboutSection />
    <ProfessionalServices />
    <WhyChooseUs />
    <TrustedCompanies />
    <Partner />
    <ContactCTA />
    </>
  );
}
