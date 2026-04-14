"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const steps = [
  "Understand Problem",
  "Design System / Architecture",
  "Build (Frontend + Backend)",
  "Optimize & Deploy",
];

const visuals = [
  { label: "UI screenshot", image: "/reference/0d770529-22f8-486b-b77f-b4c3985a32f3.png" },
  { label: "Code snippet", image: "/reference/680505ce-b510-4665-8742-6ad414d00660.png" },
  { label: "Architecture", image: "/reference/82c7d72c-4fb1-4577-8a27-f3189ac2aead.png" },
  { label: "Deployed result", image: "/reference/bc807e32-932f-4f06-b888-1474a2c8a0e5.png" },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".process-step", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(".process-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[#A38FE8]">Timeline</p>
          <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-white">Dev workflow, presented like a story.</h2>
          <p className="max-w-xl text-base leading-8 text-zinc-400">
            Four clear steps that take work from brief to launch with confidence and design-led execution.
          </p>
          <div className="relative mt-8 space-y-6">
            <div className="absolute left-5 top-7 h-full w-px bg-white/10" />
            {steps.map((step, index) => (
              <div key={step} className="process-step relative flex gap-4 pl-12">
                <div className="absolute left-0 top-1 h-10 w-10 rounded-full border border-white/10 bg-[var(--dna-surface)]/95 text-center text-sm font-semibold leading-10 text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Step {index + 1}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {visuals.map((visual) => (
            <div key={visual.label} className="process-card overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
              <p className="text-xs uppercase tracking-[0.32em] text-[#FEB23A]">{visual.label}</p>
              <div className="mt-4 h-56 overflow-hidden rounded-[1.75rem] bg-[#111113]">
                <Image src={visual.image} alt={visual.label} width={560} height={360} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
