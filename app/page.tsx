"use client";

import BountyGrid from "./components/bounty/BountyGrid";
import HeroProject from "./components/Hero/HeroProject";
import HeroSection from "./components/Hero/HeroSection";
import AboutSection from "./components/home/AboutSection";
import FeaturedWorkSection from "./components/home/FeaturedWorkSection";
import ProcessSection from "./components/home/ProcessSection";
import SectionNumber from "./components/shared/SectionNumber";
import SiteFooter from "./components/home/SiteFooter";
import { homeContent } from "./content/homeContent";

const { bountyItems, bountyPosters, featuredProjects, footerLinks, processSteps } = homeContent;

export default function Home() {

  return (
    <main className="relative min-h-screen overflow-hidden bg-(--dna-night) text-white"> 
      <div className="texture-grain" />

      <div className="pointer-events-none absolute inset-0 z-5 bg-[radial-gradient(ellipse_at_top,rgba(255,92,73,0.18)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 z-5 bg-[radial-gradient(ellipse_at_right_top,rgba(163,143,232,0.14)_0%,transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 z-5 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,136,114,0.1)_0%,transparent_40%)]" />

      <div className="pointer-events-none absolute left-[5%] top-[20%] z-10 h-40 w-40 rounded-full bg-[#ff5c49]/20 blur-[80px] animate-pulse-glow-primary" />
      <div className="pointer-events-none absolute right-[8%] top-[15%] z-10 h-32 w-32 rounded-full bg-[#a38fe8]/18 blur-[60px]" />
      <div className="pointer-events-none absolute left-[15%] top-[60%] z-10 h-28 w-28 rounded-full bg-[#feb23a]/15 blur-[50px]" />
      <div className="pointer-events-none absolute right-[5%] top-[45%] z-10 h-36 w-36 rounded-full bg-[#ff8872]/12 blur-[60px]" />
      <div className="pointer-events-none absolute left-[25%] bottom-[25%] z-10 h-24 w-24 rounded-full bg-[#a38fe8]/10 blur-[45px]" />
      <div className="pointer-events-none absolute right-[20%] bottom-[15%] z-10 h-28 w-28 rounded-full bg-[#1dbfb0]/12 blur-[50px]" />

      <div className="relative">
        <SectionNumber number="01" variant="coral" />
        <HeroSection />
      </div>

      <div className="relative">
        <SectionNumber number="02" variant="amber" />
        <FeaturedWorkSection projects={featuredProjects} />
      </div>

      <div className="relative">
        <SectionNumber number="03" variant="coral" />
        <HeroProject project={featuredProjects[0]} />
      </div>

      <div className="relative">
        <SectionNumber number="04" variant="purple" />
        <ProcessSection processSteps={processSteps} />
      </div>

      <div className="relative">
        <SectionNumber number="05" variant="teal" />
        <BountyGrid
          items={bountyItems}
          posters={bountyPosters}
          title="Bounty Grid"
          subtitle="An editorial work index with a locked center target, monochrome side panels, and hover-driven spotlight control. Scroll motion keeps each column drifting at a different speed so the gallery feels cinematic before any click."
        />
      </div>

      <div className="relative">
        <SectionNumber number="06" variant="coral" />
        <AboutSection />
      </div>
      <SiteFooter links={footerLinks} />
    </main>
  );
}
