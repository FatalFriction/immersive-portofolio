"use client";

import { useRef, useState } from "react";

import { homeContent } from "../../content/homeContent";
import { HeroPreviewCard } from "../../content/homeTypes";
import useHeroPreviewAnimations from "../../hooks/useHeroPreviewAnimations";
import {
  asymmetricButtonClipPath,
  asymmetricPosterClipPath,
  asymmetricTagClipPath,
} from "../../lib/asymmetricShapes";
import HeroNavbar from "./HeroNavbar";
import BurnGridCanvas from "../effects/BurnGridCanvas";

/**
 * Hero Section Component
 * 
 * Main introduction section featuring a hero image, tagline, and preview cards.
 * Uses GSAP animations and editorial design patterns.
 */
const { heroPreviewCards, techTags } = homeContent;

/**
 * Get hover reset opacity for preview cards
 */
function getHoverResetOpacity(featured: boolean): number {
  return featured ? 0.82 : 0.55;
}

/**
 * Get hover reset wash opacity for preview cards
 */
function getHoverResetWashOpacity(featured: boolean): number {
  return featured ? 0.1 : 0.06;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Apply GSAP animations to the hero section
  useHeroPreviewAnimations(sectionRef);

  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const registerCardRef = (index: number, el: HTMLElement | null) => {
    cardRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-4 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-24 lg:px-10"
    >
      <BurnGridCanvas items={heroPreviewCards} cardRefs={cardRefs} />

      {/* Navigation bar */}
      <HeroNavbar />

      {/* Background with layered effects */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/reference/canyon1.png)',
            filter: 'brightness(0.75) saturate(0.9)',
          }} 
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#1a1a1c]/85 via-[#1a1a1c]/60 to-[#1a1a1c]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,92,73,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(163,143,232,0.06),transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl mt-20">
        <div className="grid min-h-[calc(100svh-6rem)] items-center gap-10 lg:gap-12">
          <div className="flex min-h-[calc(100svh-6rem)] flex-col justify-center">
            {/* Brand tag */}
            <p className="hero-brand text-xs uppercase tracking-[0.35em] text-[#FEB23A]/80">
              Full-Stack Developer · Jakarta, Indonesia
            </p>
            
            {/* Hero headline */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 xl:gap-12">
              <h1 className="hero-headline mt-4 flex-1 text-[clamp(3.5rem,8vw,10.5rem)] font-black uppercase leading-[0.96] tracking-[-0.045em] text-white/95 lg:mt-6">
                Michael
                <br />
                Florentio
              </h1>
              <div className="hero-vertical mt-4 hidden shrink-0 lg:mt-8 lg:block">
                <span
                  className="italic text-[0.65rem] uppercase tracking-[0.4em] text-white/50 lg:text-[0.72rem] lg:tracking-[0.5em]"
                  style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
                >
                  3+ Years · Systems Design · DevOps
                </span>
              </div>
            </div>
            
            {/* Hero copy */}
            <p className="hero-copy mt-6 max-w-lg text-base leading-relaxed text-white/70 lg:mt-10 lg:text-lg">
              Full-stack engineer building production systems with React, Next.js, Go, and PostgreSQL.
              Specialized in performance optimization, CI/CD infrastructure, and end-to-end product ownership.
            </p>

            {/* Technology tags */}
            <div className="hero-chips mt-8 flex flex-wrap gap-2 sm:gap-3 lg:mt-10">
              {techTags.map((tag, index) => (
                <span
                  key={tag}
                  className={`hero-chip inline-flex border px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.32em] transition-all duration-300 sm:px-4 sm:py-2 sm:text-[0.66rem] ${index % 3 === 0
                      ? "border-white/20 bg-white/5 text-white/80 hover:border-[#FEB23A]/50 hover:text-[#FEB23A]"
                      : index % 3 === 1
                        ? "border-white/20 bg-white/5 text-white/80 hover:border-[#FF8872]/50 hover:text-[#FF8872]"
                        : "border-white/20 bg-white/5 text-white/80 hover:border-[#A38FE8]/50 hover:text-[#A38FE8]"
                    }`}
                  style={{ clipPath: asymmetricTagClipPath }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="hero-actions mt-10 flex flex-col gap-3 min-[480px]:flex-row sm:gap-4 lg:mt-12">
              <a
                href="#work"
                className="hero-action-btn relative inline-flex overflow-hidden bg-white/10 border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:border-white/40 sm:px-8 sm:py-4 sm:text-sm"
                style={{ clipPath: asymmetricButtonClipPath }}
              >
                View Projects
              </a>
              <a
                href="#about"
                className="hero-action-btn relative inline-flex overflow-hidden border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 transition duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white sm:px-8 sm:py-4 sm:text-sm"
                style={{
                  clipPath: asymmetricButtonClipPath,
                }}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
        
        {/* Preview stack section */}
        <section className="preview-stack mt-20 grid gap-12 lg:mt-24 lg:gap-14">
          <div className="grid gap-8 lg:grid-cols-[0.85fr,1.15fr] lg:items-end">
            <div className="space-y-6">
              <div>
                <p className="dna-mono text-[0.65rem] uppercase tracking-[0.42em] text-[#A38FE8]/90">
                  Editorial Index
                </p>
                <h2 className="mt-4 max-w-3xl dna-display text-[clamp(3.2rem,6vw,6rem)] uppercase leading-[0.92] tracking-[0.03em] text-white">
                  Color-led systems with magazine rhythm.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-zinc-400">
                Five production pillars arranged like a story spread. Each panel carries its own color
                field, serial mark, and hover focus so the stack reads like a curated editorial board.
              </p>
            </div>

            {/* Stats panel */}
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Format", value: "Poster Row" },
                { label: "Motion", value: "GSAP Focus" },
                { label: "Mood", value: "Editorial" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 px-4 py-4 backdrop-blur-sm"
                  style={{ clipPath: asymmetricPosterClipPath, backgroundColor: "rgba(63, 54, 64, 0.73)" }}
                >
                  <p className="dna-mono text-[0.58rem] uppercase tracking-[0.32em] text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-2 dna-display text-3xl uppercase leading-none tracking-[0.04em] text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Preview cards grid */}
          <div className="relative w-full">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              
              {heroPreviewCards.map((card: HeroPreviewCard, index: number) => (
                <article
                  key={card.title}
                  ref={(el) => registerCardRef(index, el)}
                  className={`preview-card group relative overflow-hidden border bg-[#121317]`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    borderColor: `${card.palette.edge}55`,
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(10,10,12,0.94)), linear-gradient(135deg, ${card.palette.wash}, rgba(8,8,10,0.1) 40%, rgba(8,8,10,0.92) 100%)`,
                    clipPath: asymmetricPosterClipPath,
                    willChange: "transform-gpu transition",
                  }}
                >
                  {/* Paper fiber texture for editorial depth */}
                  <div className="pointer-events-none absolute inset-0 texture-paper-fiber" />
                  
                  {/* Glow effect */}
                  <div
                    data-preview-glow=""
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
                    style={{
                      backgroundColor: card.palette.glow,
                      opacity: getHoverResetOpacity(hoveredIndex === index),
                    }}
                  />
                  
                  {/* Wash effect */}
                  <div
                    data-preview-wash=""
                    className="absolute inset-0"
                    style={{
                      opacity: getHoverResetWashOpacity(hoveredIndex === index),
                      background: `radial-gradient(circle at 18% 16%, ${card.palette.wash}, transparent 28%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 58%, rgba(0,0,0,0.8) 100%)`,
                    }}
                  />
                  
                  {/* Top and bottom gradients */}
                  <div className="absolute inset-x-0 top-0 h-18 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(4,4,6,0.92))]" />

                  {/* Content area */}
                  <div className={`preview-card-inner relative z-10 flex h-120 flex-col justify-between p-6 lg:h-152 lg:p-7 ${index % 2 === 0 ? "lg:pt-10" : "lg:pt-6"}`}>
                    <div className="space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <p
                            className="dna-mono text-[0.58rem] uppercase tracking-[0.34em]"
                            style={{ color: card.palette.ink }}
                          >
                            {hoveredIndex === index ? "Lead Story" : "System File"}
                          </p>
                          <p className="dna-mono text-[0.58rem] uppercase tracking-[0.32em] text-white/42">
                            Case {card.serial}
                          </p>
                        </div>
                        <span
                          className="dna-display text-6xl leading-none tracking-[0.02em]"
                          style={{ color: `${card.palette.glow}cc` }}
                        >
                          {card.serial}
                        </span>
                      </div>

                      <div className="max-w-40 space-y-3">
                        <h3 className="dna-display text-[2.2rem] uppercase leading-[0.88] tracking-[0.03em] text-white">
                          {card.title}
                        </h3>
                        <p
                          className="dna-mono text-[0.6rem] uppercase tracking-[0.32em]"
                          style={{ color: card.palette.ink }}
                        >
                          {card.detail}
                        </p>
                      </div>
                    </div>

                    <div className="h-px w-full bg-white/10" />
                    <div data-preview-meta="" className="space-y-5">
                      <div className="flex flex-wrap gap-3">
                        {card.stack.map((tech) => (
                          <span
                            key={tech}
                            className="dna-mono border border-white/14 bg-white/6 px-3 py-1.5 text-[0.52rem] uppercase tracking-[0.2em] text-zinc-200"
                            style={{ clipPath: asymmetricTagClipPath }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-end justify-between gap-4">
                        <span
                          className="shrink-0 dna-mono text-[0.56rem] uppercase tracking-[0.32em]"
                          style={{ color: card.palette.ink }}
                        >
                          Explore
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
