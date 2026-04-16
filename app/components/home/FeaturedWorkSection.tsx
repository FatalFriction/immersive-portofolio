import { FeaturedProjectItem } from "../../content/homeTypes";
import {
  asymmetricLargePanelClipPath,
  asymmetricTagClipPath,
  asymmetricPanelClipPath,
} from "../../lib/asymmetricShapes";
import GlassRevealCard from "./GlassRevealCard";

/**
 * Featured Work Section Component
 * 
 * Displays a masonry-style grid of featured projects using glass reveal cards.
 * Implements editorial layout with varying card sizes and dynamic effects.
 */
interface FeaturedWorkSectionProps {
  projects: FeaturedProjectItem[];
}

export default function FeaturedWorkSection({ projects }: FeaturedWorkSectionProps) {
  /**
   * Get CSS classes for layout positioning
   */
  const getLayoutClass = (index: number) => {
    if (index === 0) return "lg:col-span-2 lg:row-span-2";
    if (index === 3) return "lg:col-span-2";
    return "";
  };

  /**
   * Get clip path based on card position
   */
  const getClipPath = (index: number) => {
    if (index === 0) return asymmetricLargePanelClipPath;
    return asymmetricPanelClipPath;
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Ambient background glow effects */}
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-[#FF5C49]/8 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-24 h-64 w-64 rounded-full bg-[#FF8872]/8 blur-3xl" />
      
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="dna-mono text-[var(--text-mono-sm)] uppercase tracking-[0.35em] text-[#A38FE8]">Featured Work</p>
            <h2 className="mt-6 dna-display text-[var(--text-h2)] uppercase editorial-leading text-white">
              Three pillars of production expertise.
            </h2>
          </div>
          <p className="max-w-xl text-[var(--text-body)] leading-7 text-zinc-400">
            Full-stack systems optimized for scale. Performance, reliability, and modern
            architecture built for real-world challenges.
          </p>
        </div>

        {/* Masonry grid layout */}
        <div className="mt-12 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*:not(:first-child)]:mt-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`break-inside-avoid ${getLayoutClass(index)}`}
            >
              <GlassRevealCard
                project={project}
                clipPath={getClipPath(index)}
                tagClipPath={asymmetricTagClipPath}
                isLarge={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}