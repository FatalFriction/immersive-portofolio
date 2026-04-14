"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const filters = ["All", "Frontend", "Backend", "Fullstack", "Experimental"];

const items = [
  {
    name: "Release Control",
    tag: "Fullstack",
    stack: ["Next.js", "Go", "PostgreSQL"],
    image: "/reference/5c5f131b-4abd-4c01-af78-99bfba287aab.png",
  },
  {
    name: "Core Architecture",
    tag: "Backend",
    stack: ["Gin", "Docker", "GitHub Actions"],
    image: "/reference/680505ce-b510-4665-8742-6ad414d00660.png",
  },
  {
    name: "Motion Grid",
    tag: "Frontend",
    stack: ["React", "Tailwind", "Framer"],
    image: "/reference/82c7d72c-4fb1-4577-8a27-f3189ac2aead.png",
  },
  {
    name: "Dev Toolkit",
    tag: "Experimental",
    stack: ["Go", "PostgreSQL", "Docker"],
    image: "/reference/bc807e32-932f-4f06-b888-1474a2c8a0e5.png",
  },
];

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () => items.filter((item) => activeFilter === "All" || item.tag === activeFilter),
    [activeFilter]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const target = cardsRef.current?.querySelectorAll(".gallery-card");
    if (!target) return;
    gsap.fromTo(
      target,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  }, [filtered]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-section", {
        scrollTrigger: {
          trigger: ".gallery-section",
          start: "top 90%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery-section mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#A38FE8]">Project gallery</p>
          <h2 className="mt-3 text-4xl font-semibold uppercase tracking-[-0.03em] text-white">More work with interactive motion.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em] transition ${
                activeFilter === filter
                  ? "border-[#1DBFB0] bg-[#1DBFB0]/10 text-[#1DBFB0]"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:border-[#A38FE8] hover:text-[#A38FE8]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div ref={cardsRef} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((item) => (
          <article key={item.name} className="gallery-card group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d]/95 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <div className="relative overflow-hidden">
              <Image src={item.image} alt={item.name} width={520} height={380} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="space-y-3 p-5">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#FEB23A]">{item.tag}</p>
              <h3 className="text-xl font-semibold uppercase tracking-[-0.02em] text-white">{item.name}</h3>
              <p className="text-sm leading-7 text-zinc-400">{item.stack.join(" · ")}</p>
              <div className="opacity-0 transition duration-300 group-hover:opacity-100">
                <a className="inline-flex rounded-full bg-[#FF5C49] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white" href="#">
                  View details
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
