import HeroSection from "./components/HeroSection";
import TechBar from "./components/TechBar";
import AboutSection from "./components/AboutSection";
import ExpertiseSection from "./components/ExpertiseSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <main id="top">
        <HeroSection />
        <TechBar />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
      </main>
      <ContactSection />
    </>
  );
}
