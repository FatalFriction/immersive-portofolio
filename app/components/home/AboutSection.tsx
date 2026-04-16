import {
  asymmetricInsetClipPath,
  asymmetricLargePanelClipPath,
  asymmetricPosterClipPath,
} from "../../lib/asymmetricShapes";

interface AboutStatItem {
  color: string;
  label: string;
}

const aboutStats: AboutStatItem[] = [
  { color: "#FF5C49", label: "40-60% Performance Gains" },
  { color: "#FF8872", label: "15+ Production Features" },
  { color: "#A38FE8", label: "99.9% Uptime Infrastructure" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute left-0 bottom-24 h-72 w-72 rounded-full bg-[var(--dna-sub)]/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="dna-mono text-[var(--text-mono-sm)] uppercase tracking-[0.35em] text-[#FF5C49]">About Me</p>
            <h2 className="dna-display text-[var(--text-h2)] uppercase editorial-leading text-white">
              Systems-thinking engineer with 3+ years of production experience.
            </h2>
            <p className="max-w-xl text-[var(--text-body)] leading-8 text-zinc-400">
              I combine full-stack development expertise with deep DevOps knowledge to architect
              scalable systems. Specialized in performance optimization, CI/CD infrastructure, and
              end-to-end product ownership from concept to deployment.
            </p>
          </div>
          <div
            className="relative overflow-hidden border border-[var(--dna-border)] bg-[var(--dna-surface)]/95 p-10 shadow-[0_40px_100px_rgba(0,0,0,0.28)]"
            style={{ clipPath: asymmetricLargePanelClipPath }}
          >
            {/* Fine halftone texture for subtle depth */}
            <div className="pointer-events-none absolute inset-0 texture-fine-halftone" />
            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(255,92,73,0.12),_transparent_50%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
              <div className="space-y-6">
                <div
                  className="flex items-center gap-6 border border-[var(--dna-border)] bg-[#0d0d10]/95 p-6"
                  style={{ clipPath: asymmetricPosterClipPath }}
                >
                  <div
                    className="flex h-24 w-24 items-center justify-center border border-[var(--dna-border)] bg-[#17171b]/95 dna-display text-3xl text-white/80"
                    style={{ clipPath: asymmetricInsetClipPath }}
                  >
                    M
                  </div>
                  <div>
                    <p className="dna-mono text-[var(--text-mono-sm)] uppercase tracking-[0.32em] text-[#A38FE8]">
                      Michael Florentio
                    </p>
                    <p className="mt-3 dna-display text-[var(--text-h3)] uppercase editorial-leading text-white">Full-Stack Engineer</p>
                    <p className="mt-2 dna-mono text-[var(--text-caption)] uppercase tracking-[0.28em] text-zinc-400">
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>
                <div
                  className="border border-[var(--dna-border)] bg-[#0d0d10]/95 p-6"
                  style={{ clipPath: asymmetricPosterClipPath }}
                >
                  <p className="dna-mono text-[var(--text-mono-sm)] uppercase tracking-[0.28em] text-[#FEB23A]">
                    Currently Available
                  </p>
                </div>
                <div
                  className="space-y-6 border border-[var(--dna-border)] bg-[#0d0d10]/95 p-8"
                  style={{ clipPath: asymmetricPosterClipPath }}
                >
                  {aboutStats.map((item) => (
                    <div key={item.label} className="flex items-center gap-4 text-[var(--text-body-sm)] text-zinc-300">
                      <span
                        className="inline-flex h-4 w-4"
                        style={{
                          backgroundColor: item.color,
                          clipPath: asymmetricInsetClipPath,
                        }}
                      />
                      {item.label}
                    </div>
                  ))}
                </div>
                <p className="text-[var(--text-body-sm)] leading-7 text-zinc-300">
                  Full-stack development using React, Next.js, Node.js, and Go. Expertise in system
                  design, performance optimization, CI/CD infrastructure, and DevOps workflows for
                  production-scale applications.
                </p>
                <p className="text-[var(--text-body-sm)] leading-7 text-zinc-300">
                  Specialized in architecting microservices, optimizing performance at scale, and
                  implementing robust CI/CD workflows that reduce deployment friction and improve
                  system reliability.
                </p>
              </div>
              <div
                className="flex items-center justify-center bg-[#141418]/95 p-8"
                style={{ clipPath: asymmetricPosterClipPath }}
              >
                <div
                  className="aspect-editorial w-80 border border-[var(--dna-border)] bg-[#17171c]/95"
                  style={{ clipPath: asymmetricLargePanelClipPath }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
