import Image from "next/image";

import { FeaturedProjectItem } from "../../content/homeTypes";
import {
  asymmetricLargePanelClipPath,
  asymmetricTagClipPath,
} from "../../lib/asymmetricShapes";

interface FeaturedWorkSectionProps {
  projects: FeaturedProjectItem[];
}

export default function FeaturedWorkSection({ projects }: FeaturedWorkSectionProps) {
  return (
    <section
      id="work"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-[#FF5C49]/8 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-24 h-64 w-64 rounded-full bg-[#FF8872]/8 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#A38FE8]">Featured Work</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Three pillars of production expertise.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            Full-stack systems optimized for scale. Performance, reliability, and modern
            architecture built for real-world challenges.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden border border-(--dna-border) bg-(--dna-surface)/95 transition duration-300 hover:-translate-y-1 hover:border-[#FF5C49]/40 hover:bg-[#131316]/95"
              style={{ clipPath: asymmetricLargePanelClipPath }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={920}
                  height={520}
                  className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div
                  className="absolute left-5 top-5 border border-(--dna-border) bg-[#09090b]/85 px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] text-[#FEB23A]"
                  style={{ clipPath: asymmetricTagClipPath }}
                >
                  {project.tag}
                </div>
              </div>
              <div className="relative space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.28em] text-[#FF8872]">{project.year}</p>
                  <span
                    className="border border-(--dna-border) bg-[#ffffff0f] px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-200"
                    style={{ clipPath: asymmetricTagClipPath }}
                  >
                    View Case Study
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm leading-7 text-zinc-400">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2 opacity-0 transition duration-300 group-hover:opacity-100">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-(--dna-border) bg-[#ffffff0f] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-zinc-300"
                      style={{ clipPath: asymmetricTagClipPath }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
