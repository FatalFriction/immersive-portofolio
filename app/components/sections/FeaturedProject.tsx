"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { FeaturedProjectItem } from "../../content/homeTypes";
import {
  asymmetricButtonClipPath,
  asymmetricLargePanelClipPath,
  asymmetricTagClipPath,
} from "../../lib/asymmetricShapes";

interface FeaturedProjectProps {
  project: FeaturedProjectItem;
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.from(".featured-eyebrow", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(
          ".featured-title",
          { y: 34, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=_0.4"
        )
        .from(
          ".featured-copy",
          { y: 28, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=_0.45"
        )
        .from(
          ".featured-tags",
          { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 },
          "-=_0.45"
        )
        .from(
          ".featured-cta",
          { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=_0.5"
        )
        .from(
          imageRef.current,
          { scale: 0.96, opacity: 0, duration: 1.1, ease: "power3.out" },
          "<"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="featured" className="relative mx-auto max-w-7xl bg-[radial-gradient(circle_at_top,_rgba(255,92,73,0.22),_transparent_35%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-[#FF5C49]/19 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-[#A38FE8]/15 blur-3xl" />

      <div ref={containerRef} className="grid gap-14 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
        <div className="group relative overflow-hidden bg-transparent" style={{ clipPath: asymmetricLargePanelClipPath }}>
          <div
            ref={imageRef}
            className="relative overflow-hidden transition duration-700 group-hover:scale-[1.03]"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={980}
              height={640}
              className="
                    h-full w-full object-contain
                    drop-shadow-[0_40px_100px_rgba(0,0,0,0.7)]
                    transition duration-700
                    group-hover:scale-[1.05]
                "
            />
          </div>
        </div>

        <div className="space-y-8">
          <p className="featured-eyebrow text-xs uppercase tracking-[0.35em] text-[#FEB23A]">Featured project</p>
          <h2 className="featured-title dna-display text-5xl font-black uppercase leading-[0.92] tracking-[0.01em] text-white sm:text-6xl">
            {project.title}
          </h2>
          <p className="featured-copy max-w-xl text-lg leading-8 text-zinc-300">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((item) => (
              <span
                key={item}
                className="featured-tags inline-flex border border-[var(--dna-border)] bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-zinc-300"
                style={{ clipPath: asymmetricTagClipPath }}
              >
                {item}
              </span>
            ))}
          </div>
          <a
            href="#gallery"
            className="featured-cta inline-flex bg-[#FF5C49] px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_20px_60px_rgba(255,92,73,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FF8872]"
            style={{ clipPath: asymmetricButtonClipPath }}
          >
            View Case Study
          </a>
        </div>
      </div>
    </section>
  );
}
