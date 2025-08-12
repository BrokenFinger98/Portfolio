import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Backend Developer Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
