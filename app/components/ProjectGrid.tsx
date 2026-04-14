"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface ProjectItem {
  title: string;
  tag: string;
  year: string;
  image: string;
}

interface ProjectGridProps {
  projects: ProjectItem[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".grid-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.13,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[#A38FE8]">Project grid</p>
        <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-white">Not your average grid.</h2>
      </div>
      <div ref={containerRef} className="mt-10 grid gap-6 lg:grid-cols-12">
        {projects.map((project, index) => {
          const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-8"]; 
          return (
            <article
              key={project.title}
              className={`grid-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d]/95 transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.22)] ${spans[index % spans.length]} lg:min-h-[340px]`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C49]/0 via-[#A38FE8]/0 to-[#1DBFB0]/0 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative overflow-hidden rounded-[2rem]">
                <Image src={project.image} alt={project.title} width={720} height={460} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#09090c]/95 p-5 backdrop-blur-sm transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[0.68rem] uppercase tracking-[0.28em] text-[#FEB23A]">{project.tag}</span>
                  <h3 className="mt-4 text-2xl font-semibold uppercase tracking-[-0.02em] text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{project.year}</p>
                  <div className="mt-5 flex items-center justify-between opacity-0 transition duration-500 group-hover:opacity-100">
                    <span className="text-xs uppercase tracking-[0.28em] text-zinc-300">View project</span>
                    <span className="rounded-full bg-[#FF5C49] px-4 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-white">See case</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
