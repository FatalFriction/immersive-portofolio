"use client";

import { useRef } from "react";
import Image from "next/image";

import {
  asymmetricInsetClipPath,
  asymmetricLargePanelClipPath,
  asymmetricPosterClipPath,
} from "../../lib/asymmetricShapes";
import useProcessSectionAnimations from "../../hooks/useProcessSectionAnimations";

/**
 * Process Section Component
 * 
 * Displays the development workflow using a vintage newspaper aesthetic.
 * Features animated editorial panels with process steps and visual representations.
 */
interface ProcessSectionProps {
  processSteps: string[];
}

interface ProcessVisualItem {
  label: string;
  color: string;
  image: string;
  alt: string;
}

/**
 * Visual representation items for the process section
 */
const processVisualItems: ProcessVisualItem[] = [
  {
    label: "UI design / wireframe",
    color: "#A38FE8",
    image: "/reference/680505ce-b510-4665-8742-6ad414d00660.png",
    alt: "Wireframe",
  },
  {
    label: "Actual app screenshot",
    color: "#FEB23A",
    image: "/reference/3a26bd8d-1922-4717-975d-a8861e6ba75c.png",
    alt: "App screenshot",
  },
  {
    label: "Backend architecture",
    color: "#A38FE8",
    image: "/reference/82c7d72c-4fb1-4577-8a27-f3189ac2aead.png",
    alt: "Architecture diagram",
  },
  {
    label: "Final deployed result",
    color: "#FF8872",
    image: "/reference/5c5f131b-4abd-4c01-af78-99bfba287aab.png",
    alt: "Deploy result",
  },
];

/**
 * Serif font for vintage newspaper aesthetic
 */
const serifFont = "Georgia, 'Times New Roman', 'Times', serif";

export default function ProcessSection({ processSteps }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Apply GSAP animations to the section
  useProcessSectionAnimations({ sectionRef });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
      style={{ backgroundColor: "#1a1816" }}
    >
      {/* ========== VINTAGE NEWSPAPER BACKGROUND ========== */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary background: oldnews1.png */}
        <div
          data-bg-primary
          className="absolute inset-0"
        >
          <Image
            src="/reference/oldnews1.png"
            alt=""
            fill
            className="object-cover"
            style={{
              opacity: 0.28,
              mixBlendMode: "multiply",
              filter: "sepia(0.75) brightness(0.72) contrast(1.18)",
            }}
          />
        </div>

        {/* Secondary overlay: oldnews.jpg for texture depth */}
        <div
          data-bg-secondary
          className="absolute inset-0"
        >
          <Image
            src="/reference/oldnews.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              opacity: 0.18,
              mixBlendMode: "overlay",
              filter: "sepia(0.88) brightness(0.82) contrast(1.1)",
            }}
          />
        </div>

        {/* Texture overlay for aged paper effect */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(139, 115, 85, 0.045) 1px,
                rgba(139, 115, 85, 0.045) 2px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 1px,
                rgba(139, 115, 85, 0.025) 1px,
                rgba(139, 115, 85, 0.025) 2px
              )
            `,
            mixBlendMode: "multiply",
          }}
        />

        {/* Subtle stains and ink imperfections */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.038,
            backgroundImage: `
              radial-gradient(ellipse at 18% 28%, rgba(139, 115, 85, 0.85), transparent 52%),
              radial-gradient(ellipse at 72% 62%, rgba(139, 115, 85, 0.65), transparent 42%),
              radial-gradient(ellipse at 42% 82%, rgba(139, 115, 85, 0.55), transparent 48%)
            `,
            mixBlendMode: "multiply",
          }}
        />

        {/* Worn edges effect */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 100px rgba(139, 115, 85, 0.2), inset 0 0 200px rgba(139, 115, 85, 0.1)",
            mixBlendMode: "multiply",
          }}
        />

        {/* Warm sepia wash for color harmony */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, rgba(26, 24, 22, 0.86) 0%, rgba(32, 28, 24, 0.74) 48%, rgba(26, 24, 22, 0.9) 100%)",
          }}
        />
      </div>

      {/* Ambient glow orbs for depth */}
      <div
        data-ambient-glow
        className="pointer-events-none absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-[#8b7355]/6 blur-[100px]"
      />
      <div
        data-ambient-glow
        className="pointer-events-none absolute bottom-[22%] right-[8%] h-64 w-64 rounded-full bg-[#a89880]/5 blur-[90px]"
      />

      {/* Diagonal lines texture for editorial accent */}
      <div className="pointer-events-none absolute inset-0 texture-diagonal-lines" />

      {/* ========== MAIN CONTENT ========== */}
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1fr,0.85fr] lg:items-start">
          
          {/* ===== LEFT: VINTAGE NEWSPAPER PANEL ===== */}
          <div
            data-newspaper-panel
            className="relative overflow-hidden border-2 border-[#8b7355]/55 shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
            style={{
              clipPath: asymmetricLargePanelClipPath,
              backgroundColor: "rgba(26, 24, 22, 0.52)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="relative px-10 py-12 sm:px-12 sm:py-14">
              
              {/* Newspaper masthead */}
              <div
                data-masthead
                className="mb-8 border-y-2 border-[#8b7355]/55 py-7 text-center"
              >
                <p
                  className="text-[2.75rem] font-black uppercase leading-none tracking-[0.09em]"
                  style={{ color: "#d4c5b0", fontFamily: serifFont }}
                >
                  NEW TIMES POST
                </p>
                <div className="mx-auto mt-4 h-px w-4/5 bg-[#8b7355]/45" />
                <p
                  className="mt-3 text-[0.6rem] uppercase tracking-[0.45em]"
                  style={{ color: "#8b7355", fontFamily: serifFont }}
                >
                  The Developer&apos;s Chronicle &middot; Vol. IV &middot; No. 26 &middot; Est. 2026
                </p>
              </div>

              {/* Main headline */}
              <h2
                data-headline
                className="mb-4 text-[2rem] font-black uppercase leading-[0.92] tracking-[0.015em]"
                style={{ color: "#d4c5b0", fontFamily: serifFont }}
              >
                From Concept to Production-Ready Systems
              </h2>

              {/* Subheadline */}
              <p
                data-subheadline
                className="mb-7 text-[0.74rem] uppercase tracking-[0.34em]"
                style={{ color: "#8b7355", fontFamily: serifFont }}
              >
                Engineering Workflow Proven Across Multiple Deployments
              </p>

              {/* Editorial rule line */}
              <div
                data-rule-line
                className="mb-7 h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, #8b7355 50%, transparent 100%)" }}
              />

              {/* Lead article */}
              <div
                data-lead-article
                className="mb-8 grid gap-5 sm:grid-cols-[1fr,auto]"
              >
                <p
                  className="text-[0.85rem] leading-[1.75]"
                  style={{ color: "#a89880", fontFamily: serifFont }}
                >
                  <span
                    className="float-left mr-3 mt-1 text-5xl font-black leading-none"
                    style={{ color: "#d4c5b0", fontFamily: serifFont, opacity: 0.32 }}
                  >
                    A
                  </span>
                  proven workflow combining design rigor, full-stack development, and DevOps best
                  practices. Every project ships with performance optimization and scalable
                  infrastructure baked in from day one.
                </p>
                <div
                  className="border border-[#8b7355]/55 p-4 text-right"
                  style={{ backgroundColor: "rgba(26, 24, 22, 0.6)" }}
                >
                  <p
                    className="text-[0.54rem] uppercase tracking-[0.34em]"
                    style={{ color: "#8b7355", fontFamily: serifFont }}
                  >
                    Special Report
                  </p>
                  <p
                    className="mt-1 text-[0.7rem] font-semibold"
                    style={{ color: "#d4c5b0", fontFamily: serifFont }}
                  >
                    Pages 4-8
                  </p>
                </div>
              </div>

              {/* Process steps - 2 column newspaper grid */}
              <div className="mb-8 grid grid-cols-2 gap-6">
                {processSteps.map((step, index) => (
                  <article
                    key={step}
                    data-process-step
                    className="relative border-t-2 border-[#8b7355]/55 pt-4"
                  >
                    <p
                      data-step-number
                      className="mb-2 text-[1.75rem] font-black leading-none"
                      style={{ color: "#d4c5b0", fontFamily: serifFont, opacity: 0.38 }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p
                      className="text-[0.74rem] leading-[1.65]"
                      style={{ color: "#a89880", fontFamily: serifFont }}
                    >
                      {step}
                    </p>
                    <p
                      className="mt-2 text-[0.54rem] uppercase tracking-[0.3em]"
                      style={{ color: "#8b7355", opacity: 0.68, fontFamily: serifFont }}
                    >
                      {index === 0 && "Phase I: Discovery"}
                      {index === 1 && "Phase II: Architecture"}
                      {index === 2 && "Phase III: Development"}
                      {index === 3 && "Phase IV: Deployment"}
                    </p>
                  </article>
                ))}
              </div>

              {/* Editorial rule line */}
              <div
                data-rule-line
                className="mb-8 h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, #8b7355 50%, transparent 100%)" }}
              />

              {/* Timeline box */}
              <div
                data-timeline-box
                className="mb-8 border-2 border-[#8b7355]/55 p-6"
                style={{ backgroundColor: "rgba(26, 24, 22, 0.58)" }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <p
                    className="text-[0.64rem] uppercase tracking-[0.4em]"
                    style={{ color: "#d4c5b0", fontFamily: serifFont }}
                  >
                    Development Timeline
                  </p>
                  <p
                    className="text-[0.54rem] uppercase tracking-[0.3em]"
                    style={{ color: "#8b7355", fontFamily: serifFont }}
                  >
                    Est. 2026
                  </p>
                </div>
                <div className="space-y-3.5">
                  {processSteps.map((step, index) => (
                    <div
                      key={step}
                      data-timeline-item
                      className="flex items-start gap-3.5"
                    >
                      <span
                        className="mt-0.5 flex h-6.5 w-6.5 shrink-0 items-center justify-center border-2 border-[#8b7355]/65 text-[0.6rem] font-bold"
                        style={{
                          backgroundColor: "rgba(139, 115, 85, 0.22)",
                          color: "#d4c5b0",
                          fontFamily: serifFont,
                        }}
                      >
                        {index + 1}
                      </span>
                      <p
                        className="flex-1 text-[0.74rem] leading-[1.7]"
                        style={{ color: "#a89880", fontFamily: serifFont }}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editorial rule line */}
              <div
                data-rule-line
                className="mb-7 h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, #8b7355 50%, transparent 100%)" }}
              />

              {/* Footer metadata */}
              <div
                data-footer-meta
                className="grid grid-cols-[auto,1fr] gap-6 items-center"
              >
                <div
                  className="border-2 border-[#8b7355]/55 p-4 text-center"
                  style={{ backgroundColor: "rgba(26, 24, 22, 0.58)" }}
                >
                  <p
                    className="text-[0.54rem] uppercase tracking-[0.34em]"
                    style={{ color: "#8b7355", fontFamily: serifFont }}
                  >
                    Tech Stack
                  </p>
                  <p
                    className="mt-1.5 text-[0.64rem] font-semibold"
                    style={{ color: "#d4c5b0", fontFamily: serifFont }}
                  >
                    Full-Stack
                  </p>
                </div>
                <p
                  className="text-[0.74rem] leading-[1.7]"
                  style={{ color: "#a89880", fontFamily: serifFont }}
                >
                  Next.js, React, Go (Gin), PostgreSQL, Docker, and GitHub Actions for reliable products.
                </p>
              </div>
            </div>
          </div>

          {/* ===== RIGHT: VISUAL CARDS ===== */}
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-2">
            {processVisualItems.map((item, index) => (
              <div
                key={item.label}
                data-visual-card
                className="group relative overflow-hidden border-2 border-[#8b7355]/45 shadow-[0_24px_70px_rgba(0,0,0,0.32)] transition-shadow duration-500 hover:shadow-[0_32px_90px_rgba(0,0,0,0.45)] hover:border-[#8b7355]/65"
                style={{
                  clipPath: asymmetricPosterClipPath,
                  backgroundColor: "rgba(26, 24, 22, 0.48)",
                  backdropFilter: "blur(1.5px)",
                }}
              >
                <div className="relative p-7">
                  {/* Label */}
                  <p
                    className="mb-5 text-[0.7rem] uppercase tracking-[0.34em]"
                    style={{ color: "#d4c5b0", fontFamily: serifFont }}
                  >
                    {item.label}
                  </p>

                  {/* Image container */}
                  <div className="relative overflow-hidden border border-[#8b7355]/35">
                    <Image
                      data-visual-image
                      src={item.image}
                      alt={item.alt}
                      width={560}
                      height={360}
                      className="aspect-wide h-auto w-full object-cover transition-transform duration-700"
                      style={{
                        clipPath: asymmetricInsetClipPath,
                        filter: "sepia(0.45) brightness(0.88) contrast(1.08)",
                      }}
                    />
                    {/* Sepia overlay for image blending */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        opacity: 0.22,
                        background:
                          "linear-gradient(140deg, rgba(139, 115, 85, 0.65), rgba(168, 152, 128, 0.45))",
                        mixBlendMode: "multiply",
                      }}
                    />
                    {/* Hover sheen */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(212, 197, 176, 0.12), transparent 50%)",
                      }}
                    />
                  </div>

                  {/* Caption */}
                  <p
                    className="mt-4 text-[0.54rem] uppercase tracking-[0.3em]"
                    style={{ color: "#8b7355", opacity: 0.72, fontFamily: serifFont }}
                  >
                    {item.alt} &middot; Fig. {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
