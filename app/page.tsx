"use client";

import { useRef } from "react";

import BountyGrid from "./components/bounty/BountyGrid";
import HeroProject from "./components/Hero/HeroProject";
import HeroSection from "./components/Hero/HeroSection";
import AboutSection from "./components/home/AboutSection";
import FeaturedWorkSection from "./components/home/FeaturedWorkSection";
import ProcessSection from "./components/home/ProcessSection";
import SectionNumber from "./components/shared/SectionNumber";
import SiteFooter from "./components/home/SiteFooter";
import useSectionConnector from "./hooks/useSectionConnector";
import { homeContent } from "./content/homeContent";

const { bountyItems, bountyPosters, featuredProjects, footerLinks, processSteps } = homeContent;

export default function Home() {
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const heroProjectRef = useRef<HTMLDivElement | null>(null);

  useSectionConnector({
    fromSection: heroSectionRef,
    toSection: heroProjectRef,
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-(--dna-night) text-white">
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_top,rgba(255,92,73,0.18)_0%,transparent_50%)] pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_right_top,rgba(163,143,232,0.14)_0%,transparent_45%)] pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,136,114,0.1)_0%,transparent_40%)] pointer-events-none" />

      <div className="pointer-events-none absolute left-[5%] top-[20%] z-[10] h-40 w-40 rounded-full bg-[#ff5c49]/20 blur-[80px] animate-pulse-glow-primary" />
      <div className="pointer-events-none absolute right-[8%] top-[15%] z-[10] h-32 w-32 rounded-full bg-[#a38fe8]/18 blur-[60px]" />
      <div className="pointer-events-none absolute left-[15%] top-[60%] z-[10] h-28 w-28 rounded-full bg-[#feb23a]/15 blur-[50px]" />
      <div className="pointer-events-none absolute right-[5%] top-[45%] z-[10] h-36 w-36 rounded-full bg-[#ff8872]/12 blur-[60px]" />
      <div className="pointer-events-none absolute left-[25%] bottom-[25%] z-[10] h-24 w-24 rounded-full bg-[#a38fe8]/10 blur-[45px]" />
      <div className="pointer-events-none absolute right-[20%] bottom-[15%] z-[10] h-28 w-28 rounded-full bg-[#1dbfb0]/12 blur-[50px]" />

      <div ref={heroSectionRef} className="relative">
        <SectionNumber number="01" variant="coral" />
        <HeroSection />
      </div>

      <div
        id="section-connector-line"
        className="pointer-events-none fixed z-[15] w-px origin-top scale-y-0 bg-gradient-to-b from-[#FF5C49] via-[#FEB23A] to-[#FF8872] will-change-transform shadow-[0_0_20px_rgba(255,92,73,0.5)]"
        data-connector-path
      />
      <div
        id="section-connector-dot-start"
        className="pointer-events-none fixed z-[16] h-3 w-3 rounded-full bg-[#FF5C49] shadow-[0_0_20px_rgba(255,92,73,0.9),0_0_40px_rgba(255,92,73,0.4),0_0_60px_rgba(255,92,73,0.2)] animate-pulse-glow-primary"
        data-connector-path
      />
      <div
        id="section-connector-dot-end"
        className="pointer-events-none fixed z-[16] h-3 w-3 rounded-full bg-[#FF8872] shadow-[0_0_20px_rgba(255,136,114,0.9),0_0_40px_rgba(255,136,114,0.4),0_0_60px_rgba(255,136,114,0.2)] animate-pulse-glow-label"
        data-connector-path
      />

      <div ref={heroProjectRef} className="relative">
        <SectionNumber number="02" variant="coral" />
        <HeroProject project={featuredProjects[0]} />
      </div>

      <div className="relative">
        <SectionNumber number="03" variant="amber" />
        <FeaturedWorkSection projects={featuredProjects} />
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
