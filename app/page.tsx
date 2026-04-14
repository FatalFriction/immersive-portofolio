import BountyGrid from "./components/bounty/BountyGrid";
import HeroProject from "./components/Hero/HeroProject";
import HeroSection from "./components/Hero/HeroSection";
import AboutSection from "./components/home/AboutSection";
import FeaturedWorkSection from "./components/home/FeaturedWorkSection";
import ProcessSection from "./components/home/ProcessSection";
import SiteFooter from "./components/home/SiteFooter";
import { homeContent } from "./content/homeContent";

const { bountyItems, bountyPosters, featuredProjects, footerLinks, processSteps } = homeContent;

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-(--dna-night) text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,rgba(255,92,73,0.22),transparent_35%)]" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[#A38FE8]/15 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-80 h-64 w-64 rounded-full bg-[#FEB23A]/10 blur-3xl" />

      <HeroSection />
      <HeroProject project={featuredProjects[0]} />
      <FeaturedWorkSection projects={featuredProjects} />
      <ProcessSection processSteps={processSteps} />

      <BountyGrid
        items={bountyItems}
        posters={bountyPosters}
        title="Bounty Grid"
        subtitle="An editorial work index with a locked center target, monochrome side panels, and hover-driven spotlight control. Scroll motion keeps each column drifting at a different speed so the gallery feels cinematic before any click."
      />

      <AboutSection />
      <SiteFooter links={footerLinks} />
    </main>
  );
}
