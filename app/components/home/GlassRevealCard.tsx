"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * Glass Reveal Card Component
 * 
 * A featured work card with interactive glass texture that reveals content on hover.
 * Features dynamic 3D transforms and canvas-based scratch effect.
 */
interface GlassRevealCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    tag: string;
    year: string;
    stack: string[];
  };
  clipPath: string;
  tagClipPath: string;
  isLarge?: boolean;
}

export default function GlassRevealCard({
  project,
  clipPath,
  tagClipPath,
  isLarge = false,
}: GlassRevealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);

  // Track mouse position for interactive effects
  const cursor = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  /**
   * Initialize interactive effects on mount
   */
  useEffect(() => {
    const card = cardRef.current;
    const texture = textureRef.current;
    if (!card || !texture) return;

    let raf: number;

    /**
     * Animation loop for interactive mask effect
     */
    const animate = () => {
      cursor.current.x += (target.current.x - cursor.current.x) * 0.16;
      cursor.current.y += (target.current.y - cursor.current.y) * 0.16;

      gsap.set(texture, {
        WebkitMaskImage: `radial-gradient(circle 140px at ${cursor.current.x}px ${cursor.current.y}px, black 20%, transparent 80%)`,
        maskImage: `radial-gradient(circle 140px at ${cursor.current.x}px ${cursor.current.y}px, black 20%, transparent 80%)`,
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(raf);
  }, []);

  /**
   * Handle mouse movement for interactive effects
   */
  const handleMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.current = { x, y };

    // Calculate rotation based on mouse position
    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      transformOrigin: "center",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  /**
   * Reset card rotation on mouse leave
   */
  const handleLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(textureRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  /**
   * Show texture on mouse enter
   */
  const handleEnter = () => {
    gsap.to(textureRef.current, {
      opacity: 0.85,
      duration: 0.3,
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative overflow-hidden border border-(--dna-border) bg-(--dna-surface)/95 transition duration-300"
      style={{ clipPath }}
    >
      {/* Image container with responsive sizing */}
      <div className="relative z-0 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill={isLarge}
          width={isLarge ? undefined : 920}
          height={isLarge ? undefined : 520}
          className={isLarge ? "object-cover" : "h-full w-full object-cover transition duration-500 group-hover:scale-105"}
          sizes={isLarge ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

      {/* Interactive glass texture overlay */}
      <div
        ref={textureRef}
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          backgroundImage: "url('/reference/glass.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "soft-light",
          opacity: 0,
        }}
      />

      {/* Content area */}
      <div className="relative z-30 space-y-6 p-8">
        <div className="flex justify-between">
          <span className="text-xs text-[#FF8872]">{project.year}</span>
          <span className="text-xs text-[#FEB23A]">{project.tag}</span>
        </div>

        <h3 className="text-2xl text-white">{project.title}</h3>
        <p className="text-sm text-zinc-400">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-(--dna-border) px-3 py-1 text-xs text-zinc-300"
              style={{ clipPath: tagClipPath }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}