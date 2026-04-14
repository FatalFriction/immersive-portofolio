import Image from "next/image";

import BountyGrid from "./components/BountyGrid";
import HeroSection from "./components/HeroSection";
import { homeContent } from "./content/homeContent";
import {
  asymmetricInsetClipPath,
  asymmetricLargePanelClipPath,
  asymmetricPosterClipPath,
  asymmetricTagClipPath,
} from "./lib/asymmetricShapes";
import HeroProject from "./components/Hero/HeroProject";

const { bountyItems, bountyPosters, featuredProjects, footerLinks, processSteps } = homeContent;

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--dna-night)] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(255,92,73,0.22),_transparent_35%)]" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[#A38FE8]/15 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-80 h-64 w-64 rounded-full bg-[#FEB23A]/10 blur-3xl" />

      <HeroSection />
      <HeroProject project={featuredProjects[0]} />

      <section
        id="work"
        className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-[#FF5C49]/8 blur-3xl" />
        <div className="pointer-events-none absolute left-0 bottom-24 h-64 w-64 rounded-full bg-[#FF8872]/8 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-[#A38FE8]">
                Featured Work
              </p>
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
            {featuredProjects.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden border border-[var(--dna-border)] bg-[var(--dna-surface)]/95 transition duration-300 hover:-translate-y-1 hover:border-[#FF5C49]/40 hover:bg-[#131316]/95"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div
                    className="absolute left-5 top-5 border border-[var(--dna-border)] bg-[#09090b]/85 px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] text-[#FEB23A]"
                    style={{ clipPath: asymmetricTagClipPath }}
                  >
                    {project.tag}
                  </div>
                </div>
                <div className="relative space-y-4 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm uppercase tracking-[0.28em] text-[#FF8872]">
                      {project.year}
                    </p>
                    <span
                      className="border border-[var(--dna-border)] bg-[#ffffff0f] px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-200"
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
                        className="border border-[var(--dna-border)] bg-[#ffffff0f] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-zinc-300"
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

      <section id="process" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-[#A38FE8]/12 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
            <div
              className="space-y-6 border border-[var(--dna-border)] bg-[var(--dna-surface)]/95 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
              style={{ clipPath: asymmetricLargePanelClipPath }}
            >
              <span
                className="inline-flex border border-[#A38FE8]/20 bg-[var(--dna-sub)]/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#A38FE8]"
                style={{ clipPath: asymmetricTagClipPath }}
              >
                Development Cycle
              </span>
              <div>
                <h2 className="text-4xl font-semibold text-white">
                  From concept to production-ready systems.
                </h2>
                <p className="mt-4 text-base leading-8 text-zinc-400">
                  A proven workflow combining design rigor, full-stack development, and DevOps
                  best practices. Every project ships with performance optimization and scalable
                  infrastructure baked in.
                </p>
              </div>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step}
                    className="grid gap-3 border border-[var(--dna-border)] bg-[#0f0f12]/95 p-5 sm:grid-cols-[auto_1fr] sm:items-center"
                    style={{ clipPath: asymmetricPosterClipPath }}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center bg-[#FF5C49]/15 text-sm font-semibold text-[#FF5C49]"
                      style={{ clipPath: asymmetricInsetClipPath }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-zinc-300">{step}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-7 text-zinc-400">
                I use Next.js, React, Go (Gin), PostgreSQL, Docker, and GitHub Actions to build
                reliable products with clean delivery.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
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
                  image: "/reference/bc807e32-932f-4f06-b888-1474a2c8a0e5.png",
                  alt: "Deploy result",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="overflow-hidden border border-[var(--dna-border)] bg-[var(--dna-surface)]/95 p-4"
                  style={{ clipPath: asymmetricPosterClipPath }}
                >
                  <p
                    className="text-xs uppercase tracking-[0.28em]"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </p>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={560}
                    height={360}
                    className="mt-4 h-56 w-full object-cover"
                    style={{ clipPath: asymmetricInsetClipPath }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BountyGrid
        items={bountyItems}
        posters={bountyPosters}
        title="Bounty Grid"
        subtitle="An editorial work index with a locked center target, monochrome side panels, and hover-driven spotlight control. Scroll motion keeps each column drifting at a different speed so the gallery feels cinematic before any click."
      />

      <section id="about" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="pointer-events-none absolute left-0 bottom-24 h-72 w-72 rounded-full bg-[var(--dna-sub)]/10 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.35em] text-[#FF5C49]">About Me</p>
              <h2 className="text-4xl font-semibold text-white">
                Systems-thinking engineer with 3+ years of production experience.
              </h2>
              <p className="max-w-xl text-base leading-8 text-zinc-400">
                I combine full-stack development expertise with deep DevOps knowledge to architect
                scalable systems. Specialized in performance optimization, CI/CD infrastructure, and
                end-to-end product ownership from concept to deployment.
              </p>
            </div>
            <div
              className="relative overflow-hidden border border-[var(--dna-border)] bg-[var(--dna-surface)]/95 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.28)]"
              style={{ clipPath: asymmetricLargePanelClipPath }}
            >
              <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,_rgba(255,92,73,0.12),_transparent_50%)]" />
              <div className="relative grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
                <div className="space-y-5">
                  <div
                    className="flex items-center gap-4 border border-[var(--dna-border)] bg-[#0d0d10]/95 p-4"
                    style={{ clipPath: asymmetricPosterClipPath }}
                  >
                    <div
                      className="flex h-20 w-20 items-center justify-center border border-[var(--dna-border)] bg-[#17171b]/95 text-2xl text-white/80"
                      style={{ clipPath: asymmetricInsetClipPath }}
                    >
                      M
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-[#A38FE8]">
                        Michael Florentio
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        Full-Stack Engineer
                      </p>
                      <p className="mt-1 text-sm uppercase tracking-[0.28em] text-zinc-400">
                        Jakarta, Indonesia
                      </p>
                    </div>
                  </div>
                  <div
                    className="border border-[var(--dna-border)] bg-[#0d0d10]/95 p-6"
                    style={{ clipPath: asymmetricPosterClipPath }}
                  >
                    <p className="text-sm uppercase tracking-[0.28em] text-[#FEB23A]">
                      Currently Available
                    </p>
                  </div>
                  <div
                    className="space-y-4 border border-[var(--dna-border)] bg-[#0d0d10]/95 p-6"
                    style={{ clipPath: asymmetricPosterClipPath }}
                  >
                    {[
                      { color: "#FF5C49", label: "40-60% Performance Gains" },
                      { color: "#FF8872", label: "15+ Production Features" },
                      { color: "#A38FE8", label: "99.9% Uptime Infrastructure" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-4 text-sm text-zinc-300">
                        <span
                          className="inline-flex h-3.5 w-3.5"
                          style={{
                            backgroundColor: item.color,
                            clipPath: asymmetricInsetClipPath,
                          }}
                        />
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-zinc-300">
                    Full-stack development using React, Next.js, Node.js, and Go. Expertise in
                    system design, performance optimization, CI/CD infrastructure, and DevOps
                    workflows for production-scale applications.
                  </p>
                  <p className="text-sm leading-7 text-zinc-300">
                    Specialized in architecting microservices, optimizing performance at scale, and
                    implementing robust CI/CD workflows that reduce deployment friction and improve
                    system reliability.
                  </p>
                </div>
                <div
                  className="flex items-center justify-center bg-[#141418]/95 p-6"
                  style={{ clipPath: asymmetricPosterClipPath }}
                >
                  <div
                    className="h-72 w-72 border border-[var(--dna-border)] bg-[#17171c]/95"
                    style={{ clipPath: asymmetricLargePanelClipPath }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative px-4 py-12 sm:py-16 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_bottom,_rgba(255,92,73,0.15),_transparent_50%)]" />
        <div
          className="mx-auto max-w-7xl border border-[var(--dna-border)] bg-[#08080a]/95 px-4 py-6 text-sm text-zinc-500 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:px-6 sm:py-8"
          style={{ clipPath: asymmetricLargePanelClipPath }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-semibold text-white">Michael Florentio · Full-Stack Developer</p>
            <div className="flex flex-wrap gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="border border-[var(--dna-border)] bg-white/5 px-4 py-2 transition hover:border-[#A38FE8] hover:text-[#A38FE8]"
                  style={{ clipPath: asymmetricTagClipPath }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs text-zinc-500">
            © 2026 Michael Florentio. Jakarta, Indonesia. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
