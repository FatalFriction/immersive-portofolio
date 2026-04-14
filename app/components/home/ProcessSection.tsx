import Image from "next/image";

import {
  asymmetricInsetClipPath,
  asymmetricLargePanelClipPath,
  asymmetricPosterClipPath,
  asymmetricTagClipPath,
} from "../../lib/asymmetricShapes";

interface ProcessSectionProps {
  processSteps: string[];
}

interface ProcessVisualItem {
  label: string;
  color: string;
  image: string;
  alt: string;
}

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

export default function ProcessSection({ processSteps }: ProcessSectionProps) {
  return (
    <section id="process" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-[#A38FE8]/12 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
          <div
            className="space-y-6 border border-(--dna-border) bg-(--dna-surface)/95 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
            style={{ clipPath: asymmetricLargePanelClipPath }}
          >
            <span
              className="inline-flex border border-[#A38FE8]/20 bg-(--dna-sub)/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#A38FE8]"
              style={{ clipPath: asymmetricTagClipPath }}
            >
              Development Cycle
            </span>
            <div>
              <h2 className="text-4xl font-semibold text-white">
                From concept to production-ready systems.
              </h2>
              <p className="mt-4 text-base leading-8 text-zinc-400">
                A proven workflow combining design rigor, full-stack development, and DevOps best
                practices. Every project ships with performance optimization and scalable
                infrastructure baked in.
              </p>
            </div>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div
                  key={step}
                  className="grid gap-3 border border-(--dna-border) bg-[#0f0f12]/95 p-5 sm:grid-cols-[auto_1fr] sm:items-center"
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
            {processVisualItems.map((item) => (
              <div
                key={item.label}
                className="overflow-hidden border border-[var(--dna-border)] bg-[var(--dna-surface)]/95 p-4"
                style={{ clipPath: asymmetricPosterClipPath }}
              >
                <p className="text-xs uppercase tracking-[0.28em]" style={{ color: item.color }}>
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
  );
}
