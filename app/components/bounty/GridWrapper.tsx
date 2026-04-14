"use client";

import { ReactNode } from "react";

import { BountyPosterItem } from "./types";
import { asymmetricPosterClipPath } from "../../lib/asymmetricShapes";

interface GridWrapperProps {
  id: string;
  title: string;
  subtitle: string;
  posters: BountyPosterItem[];
  children: ReactNode;
}

export default function GridWrapper({
  id,
  title,
  subtitle,
  posters,
  children,
}: GridWrapperProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,120,84,0.16),transparent_24%),radial-gradient(circle_at_82%_16%,rgba(163,143,232,0.14),transparent_20%),radial-gradient(circle_at_50%_90%,rgba(34,215,225,0.08),transparent_28%),linear-gradient(180deg,#1b1b1d_0%,#111113_42%,#09090b_100%)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-18 h-80 w-80 rounded-full bg-[#ff7a59]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-5rem] top-30 h-72 w-72 rounded-full bg-[#9a79ff]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0.8px,transparent_0.8px)] [background-size:18px_18px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-end">
          <div className="space-y-5">
            <p className="dna-mono text-[0.68rem] uppercase tracking-[0.45em] text-[#FEB23A]">
              Curated Showcase
            </p>
            <h2 className="dna-display max-w-3xl text-[clamp(3.2rem,6vw,6.6rem)] uppercase leading-[0.9] tracking-[0.02em] text-white">
              {title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-zinc-300/78 lg:justify-self-end lg:text-base">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:mt-14">
          {posters.map((poster) => (
            <div
              key={poster.id}
              className="border border-[var(--dna-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(13,13,16,0.92))] px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
              style={{ clipPath: asymmetricPosterClipPath }}
            >
              <p className="dna-mono text-[0.58rem] uppercase tracking-[0.34em] text-zinc-400">
                {poster.label}
              </p>
              <p className="mt-2 dna-display text-3xl uppercase leading-none tracking-[0.04em] text-white">
                {poster.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 lg:mt-16">{children}</div>
      </div>
    </section>
  );
}
