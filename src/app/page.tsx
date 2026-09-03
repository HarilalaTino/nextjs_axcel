import NavMenu from "@/components/layout/header";
import AboutSection from "@/components/ui/home/about-section";
import HeroServices from "@/components/ui/home/hero-home";
import ProfessionalServices from "@/components/ui/home/professional-services";
import TopMenu from "@/components/ui/home/top-menu";

export default function Home() {
  return (
    <>
    <TopMenu />
    <NavMenu />
    <HeroServices />
    <AboutSection />
    <ProfessionalServices />
    </>
  );
}
