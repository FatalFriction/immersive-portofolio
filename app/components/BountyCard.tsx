"use client";

import Image from "next/image";
import { forwardRef } from "react";

import {
  asymmetricInsetClipPath,
  asymmetricPanelClipPath,
  asymmetricTagClipPath,
} from "../lib/asymmetricShapes";
import { BountyGridItem } from "./bountyGridTypes";

interface BountyCardProps {
  item: BountyGridItem;
  isActive: boolean;
  isFocused: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onClick: (id: string) => void;
}

const BountyCard = forwardRef<HTMLButtonElement, BountyCardProps>(function BountyCard(
  { item, isActive, isFocused, onHoverStart, onHoverEnd, onClick },
  ref
) {
  const featuredClassName = item.isFeatured
    ? "border-[#FF8872]/30 shadow-[0_36px_120px_rgba(255,113,86,0.22)]"
    : "border-[var(--dna-border)] shadow-[0_24px_72px_rgba(0,0,0,0.34)]";
  const activeClassName = isActive ? "ring-1 ring-[#ffe6bf]/30" : "";
  const focusedClassName = isFocused ? "ring-1 ring-[#ff9d7b]/50" : "";

  return (
    <button
      ref={ref}
      type="button"
      data-bounty-card=""
      data-bounty-id={item.id}
      data-featured={item.isFeatured ? "true" : "false"}
      onMouseEnter={() => onHoverStart(item.id)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHoverStart(item.id)}
      onBlur={onHoverEnd}
      onClick={() => onClick(item.id)}
      className={`group relative flex w-full cursor-pointer flex-col overflow-hidden border bg-[#101013] text-left text-white outline-none ${featuredClassName} ${activeClassName} ${focusedClassName}`}
      style={{
        willChange: "transform, opacity",
        clipPath: asymmetricPanelClipPath,
      }}
      aria-pressed={isFocused}
      aria-label={`${item.title} project card`}
    >
      <div
        data-bounty-visual=""
        className="absolute inset-0"
        style={{
          filter: item.isFeatured ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.72)",
          willChange: "filter, transform",
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1023px) 100vw, 20vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_25%,rgba(5,5,7,0.82)_78%,rgba(3,3,4,0.94)_100%)]" />
      <div
        data-bounty-sheen=""
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(255,214,165,0.22), transparent 34%), linear-gradient(180deg, rgba(255,110,84,0.16), transparent 26%, transparent 62%, rgba(122,94,255,0.2) 100%)",
          willChange: "opacity",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent)] opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.84))]" />

      <div className="relative z-10 flex min-h-[28rem] flex-1 flex-col justify-between p-5 sm:min-h-[32rem] lg:min-h-[36rem] lg:p-6">
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="dna-mono text-[0.58rem] uppercase tracking-[0.38em] text-white/52">
                {item.eyebrow}
              </p>
              <p className="mt-2 dna-mono text-[0.58rem] uppercase tracking-[0.35em] text-[#FEB23A]">
                {item.tag}
              </p>
            </div>
            <p className="dna-mono text-[0.58rem] uppercase tracking-[0.32em] text-white/48">
              {item.year}
            </p>
          </div>

          <div
            className="max-w-[11rem] border border-[var(--dna-border)] bg-black/20 px-3 py-3 backdrop-blur-sm"
            style={{ clipPath: asymmetricInsetClipPath }}
          >
            <p className="dna-display text-[1.95rem] uppercase leading-[0.86] tracking-[0.03em] text-white">
              {item.title}
            </p>
          </div>
        </div>

        <div data-bounty-copy="" className="space-y-4">
          <p className="max-w-[15rem] text-[0.77rem] leading-6 text-white/70">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.stack.map((entry) => (
              <span
                key={entry}
                className="dna-mono border border-[var(--dna-border)] bg-white/6 px-2.5 py-1 text-[0.54rem] uppercase tracking-[0.24em] text-zinc-200"
                style={{ clipPath: asymmetricTagClipPath }}
              >
                {entry}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 pt-3">
            <span className="dna-mono text-[0.6rem] uppercase tracking-[0.36em] text-[#FF8872]">
              {item.ctaLabel}
            </span>
            <span className="dna-mono text-[0.58rem] uppercase tracking-[0.34em] text-white/42">
              Open
            </span>
          </div>
        </div>
      </div>
    </button>
  );
});

export default BountyCard;
