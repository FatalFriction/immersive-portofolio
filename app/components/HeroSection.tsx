"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { homeContent } from "../content/homeContent";
import { HeroPreviewCard } from "../content/homeTypes";
import {
  asymmetricButtonClipPath,
  asymmetricPosterClipPath,
  asymmetricTagClipPath,
} from "../lib/asymmetricShapes";
import HeroNavbar from "./HeroNavbar";

const { heroPreviewCards, techTags } = homeContent;

function getCardLift(index: number): number {
  const sequence: number[] = [10, 10, 10, 10, 10];
  return sequence[index] ?? 0;
}

function getHoverResetOpacity(featured: boolean): number {
  return featured ? 0.82 : 0.55;
}

function getHoverResetWashOpacity(featured: boolean): number {
  return featured ? 0.1 : 0.06;
}

function animatePreviewCardHover(
  card: HTMLElement,
  cards: HTMLElement[],
  glow: HTMLElement | null,
  wash: HTMLElement | null,
  meta: HTMLElement | null
): void {
  cards.forEach((otherCard, i) => {
    if (otherCard === card) {
      return;
    }

    const baseY = getCardLift(i);

    gsap.to(otherCard, {
      scale: 0.96,
      opacity: 0.4,
      y: baseY,
      filter: "grayscale(100%) saturate(0.3) brightness(0.7)",
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(card, {
      scale: 1.05,
      opacity: 1,
      y: baseY - 18,
      zIndex: 12,
      filter: "grayscale(0%) saturate(1.2) brightness(1)",
      duration: 0.4,
      ease: "power3.out",
    });

  });

  if (glow) {
    gsap.to(glow, {
      opacity: 1,
      scale: 1.12,
      duration: 0.42,
      ease: "power3.out",
    });
  }

  if (wash) {
    gsap.to(wash, {
      opacity: 0.14,
      duration: 0.36,
      ease: "power2.out",
    });
  }

  if (meta) {
    gsap.to(meta, {
      y: 0,
      opacity: 1,
      duration: 0.36,
      ease: "power2.out",
    });
  }
}

function animatePreviewCardReset(
  card: HTMLElement,
  cards: HTMLElement[],
  glow: HTMLElement | null,
  wash: HTMLElement | null,
  meta: HTMLElement | null
): void {
  cards.forEach((otherCard, index) => {
    gsap.to(otherCard, {
      scale: 1,
      opacity: 1,
      y: getCardLift(index),
      filter: "grayscale(100%) saturate(0.4) brightness(0.85)",
      zIndex: 1,
      duration: 0.42,
      ease: "power3.out",
    });
  });

  const isFeatured = card.dataset.featured === "true";

  if (glow) {
    gsap.to(glow, {
      opacity: getHoverResetOpacity(isFeatured),
      scale: 1,
      duration: 0.36,
      ease: "power2.out",
    });
  }

  if (wash) {
    gsap.to(wash, {
      opacity: getHoverResetWashOpacity(isFeatured),
      duration: 0.36,
      ease: "power2.out",
    });
  }

  if (meta) {
    gsap.to(meta, {
      y: 12,
      opacity: 0.82,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.96 } });

      timeline
        .from(".hero-brand", { y: 32, opacity: 0 })
        .from(
          ".hero-headline",
          {
            y: 48,
            opacity: 0,
            stagger: 0.05,
          },
          "-=0.55"
        )
        .from(
          ".hero-copy",
          {
            y: 32,
            opacity: 0,
          },
          "-=0.65"
        )
        .fromTo(
          ".hero-chip",
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
          },
          "-=0.6"
        )
        .from(
          ".hero-actions",
          {
            y: 28,
            opacity: 0,
            stagger: 0.08,
          },
          "-=0.7"
        )
        .from(
          ".hero-vertical",
          {
            x: 24,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.8"
        );

      gsap.set(".preview-card", {
        filter: "grayscale(100%) saturate(0.4) brightness(0.85)",
      });

      gsap.fromTo(
        ".preview-card",
        {
          y: 54,
          opacity: 0,
          rotateZ: 1.8,
          filter: "grayscale(100%) saturate(0.5) brightness(0.85)",
        },
        {
          scrollTrigger: {
            trigger: ".preview-stack",
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: (index: number) => getCardLift(index),
          opacity: 1,
          rotateZ: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.to(".preview-card", {
        y: (index: number) => getCardLift(index) - (index % 2 === 0 ? 18 : 10),
        scrollTrigger: {
          trigger: ".preview-stack",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
        ease: "none",
      });

      const cards = gsap.utils.toArray<HTMLElement>(".preview-card");
      const listeners: Array<{
        card: HTMLElement;
        handleMouseEnter: () => void;
        handleMouseLeave: () => void;
      }> = [];

      cards.forEach((card) => {
        const glow = card.querySelector<HTMLElement>("[data-preview-glow]");
        const wash = card.querySelector<HTMLElement>("[data-preview-wash]");
        const meta = card.querySelector<HTMLElement>("[data-preview-meta]");
        const handleMouseEnter = () => animatePreviewCardHover(card, cards, glow, wash, meta);
        const handleMouseLeave = () => animatePreviewCardReset(card, cards, glow, wash, meta);

        listeners.push({
          card,
          handleMouseEnter,
          handleMouseLeave,
        });

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      });

      gsap.set("[data-preview-meta]", {
        y: 12,
        opacity: 0.82,
      });

      return () => {
        listeners.forEach(({ card, handleMouseEnter, handleMouseLeave }) => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--dna-night)] px-4 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-24 lg:px-10"
    >
      <HeroNavbar />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,92,73,0.18),transparent_22%),radial-gradient(circle_at_center_right,_rgba(163,143,232,0.16),transparent_20%),linear-gradient(180deg,#111113_0%,#070708_20%,#19191b_100%)]" />
      <div className="pointer-events-none absolute left-0 top-28 h-96 w-96 rounded-full bg-[#FF5C49]/14 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-36 h-72 w-72 rounded-full bg-[#FF8872]/12 blur-3xl" />
      <div className="pointer-events-none absolute left-6 top-20 select-none text-[18rem] font-black uppercase tracking-[-0.12em] text-white/4 opacity-60">
        01
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid min-h-[calc(100svh-6rem)] items-center gap-10 lg:gap-12">
          <div className="flex min-h-[calc(100svh-6rem)] flex-col justify-center">
            <p className="hero-brand text-xs italic uppercase tracking-[0.35em] text-[#FEB23A]/90">
              Full-Stack Developer · Jakarta, Indonesia
            </p>
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 xl:gap-12">
              <h1 className="hero-headline mt-4 flex-1 text-[clamp(3.5rem,8vw,10.5rem)] font-black uppercase leading-[0.96] tracking-[-0.045em] text-white lg:mt-6">
                Michael
                <br />
                Florentio
              </h1>
              <div className="hero-vertical mt-4 hidden shrink-0 lg:mt-8 lg:block">
                <span
                  className="italic text-[0.65rem] uppercase tracking-[0.4em] text-white/40 lg:text-[0.72rem] lg:tracking-[0.5em]"
                  style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
                >
                  3+ Years · Systems Design · DevOps
                </span>
              </div>
            </div>
            <p className="hero-copy mt-6 max-w-lg text-base leading-relaxed text-zinc-400 lg:mt-10 lg:text-lg">
              Full-stack engineer building production systems with React, Next.js, Go, and PostgreSQL.
              Specialized in performance optimization, CI/CD infrastructure, and end-to-end product ownership.
            </p>

            <div className="hero-chips mt-8 flex flex-wrap gap-2 sm:gap-3 lg:mt-10">
              {techTags.map((tag, index) => (
                <span
                  key={tag}
                  className={`hero-chip inline-flex border px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.32em] transition-all duration-300 sm:px-4 sm:py-2 sm:text-[0.66rem] ${index % 3 === 0
                      ? "border-[#FEB23A]/30 bg-[#FEB23A]/8 text-[#FEB23A] hover:border-[#FEB23A]/60 hover:bg-[#FEB23A]/12"
                      : index % 3 === 1
                        ? "border-[#FF8872]/30 bg-[#FF8872]/8 text-[#FF8872] hover:border-[#FF8872]/60 hover:bg-[#FF8872]/12"
                        : "border-[#A38FE8]/30 bg-[#A38FE8]/8 text-[#A38FE8] hover:border-[#A38FE8]/60 hover:bg-[#A38FE8]/12"
                    }`}
                  style={{ clipPath: asymmetricTagClipPath }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="hero-actions mt-10 flex flex-col gap-3 min-[480px]:flex-row sm:gap-4 lg:mt-12">
              <a
                href="#work"
                className="hero-action-btn relative inline-flex overflow-hidden bg-[#FF5C49] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_24px_80px_rgba(255,92,73,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff7b65] sm:px-8 sm:py-4 sm:text-sm"
                style={{ clipPath: asymmetricButtonClipPath }}
              >
                View Projects
              </a>
              <a
                href="#about"
                className="hero-action-btn relative inline-flex overflow-hidden border bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 transition duration-300 hover:border-[#A38FE8] hover:bg-white/10 hover:text-[#A38FE8] sm:px-8 sm:py-4 sm:text-sm"
                style={{
                  clipPath: asymmetricButtonClipPath,
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

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

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {heroPreviewCards.map((card: HeroPreviewCard, index: number) => (
              <article
                key={card.title}
                data-featured={card.featured ? "true" : "false"}
                className={`preview-card group relative overflow-hidden border bg-[#121317] ${card.featured
                    ? "lg:col-span-1 shadow-[0_35px_120px_rgba(255,163,71,0.22)]"
                    : "shadow-[0_28px_80px_rgba(0,0,0,0.34)]"
                  }`}
                style={{
                  borderColor: `${card.palette.edge}55`,
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(10,10,12,0.94)), linear-gradient(135deg, ${card.palette.wash}, rgba(8,8,10,0.1) 40%, rgba(8,8,10,0.92) 100%)`,
                  clipPath: asymmetricPosterClipPath,
                  willChange: "transform, opacity",
                }}
              >
                <div
                  data-preview-glow=""
                  className="pointer-events-none absolute -right-12 top-[-3rem] h-40 w-40 rounded-full blur-3xl"
                  style={{
                    backgroundColor: card.palette.glow,
                    opacity: getHoverResetOpacity(card.featured),
                  }}
                />
                <div
                  data-preview-wash=""
                  className="absolute inset-0"
                  style={{
                    opacity: getHoverResetWashOpacity(card.featured),
                    background: `radial-gradient(circle at 18% 16%, ${card.palette.wash}, transparent 28%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 58%, rgba(0,0,0,0.8) 100%)`,
                  }}
                />
                <div className="absolute inset-x-0 top-0 h-18 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(4,4,6,0.92))]" />

                <div
                  className={`relative z-10 flex h-[30rem] flex-col justify-between p-6 lg:h-[38rem] lg:p-7 ${index % 2 === 0 ? "lg:pt-10" : "lg:pt-6"
                    }`}
                >
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p
                          className="dna-mono text-[0.58rem] uppercase tracking-[0.34em]"
                          style={{ color: card.palette.ink }}
                        >
                          {card.featured ? "Lead Story" : "System File"}
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

                    <div className="max-w-[10rem] space-y-3">
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
        </section>
      </div>
    </section>
  );
}
