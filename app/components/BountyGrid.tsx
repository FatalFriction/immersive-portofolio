"use client";

import { useMemo, useRef, useState } from "react";

import {
  asymmetricButtonClipPath,
  asymmetricOverlayClipPath,
  asymmetricPanelClipPath,
  asymmetricTagClipPath,
} from "../lib/asymmetricShapes";
import BountyCard from "./BountyCard";
import FeaturedCard from "./FeaturedCard";
import GridWrapper from "./GridWrapper";
import { BountyGridItem, BountyPosterItem } from "./bountyGridTypes";
import useBountyGridAnimations from "./useBountyGridAnimations";

interface BountyGridProps {
  items: BountyGridItem[];
  posters: BountyPosterItem[];
  title: string;
  subtitle: string;
}

export default function BountyGrid({
  items,
  posters,
  title,
  subtitle,
}: BountyGridProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const focusedItem = useMemo(() => {
    return items.find((item) => item.id === focusedId) ?? null;
  }, [focusedId, items]);

  useBountyGridAnimations({
    sectionRef,
    gridRef,
    cardRefs,
    items,
    hoveredId,
    focusedId,
  });

  function handleHoverStart(id: string): void {
    setHoveredId(id);
  }

  function handleHoverEnd(): void {
    setHoveredId(null);
  }

  function handleClick(id: string): void {
    setFocusedId((currentId) => {
      if (currentId === id) {
        return null;
      }

      return id;
    });
  }

  return (
    <GridWrapper id="gallery" title={title} subtitle={subtitle} posters={posters}>
      <div ref={sectionRef}>
        <div className="relative">
          <div
            className={`pointer-events-none absolute inset-0 bg-black/58 backdrop-blur-[6px] transition-opacity duration-300 ${
              focusedItem ? "opacity-100" : "opacity-0"
            }`}
            style={{ clipPath: asymmetricOverlayClipPath }}
          />

          <div
            ref={gridRef}
            className="relative z-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:items-start"
          >
            {items.map((item, index) => {
              const isFocused = focusedId === item.id;
              const isActive = hoveredId === item.id || isFocused;

              const sharedProps = {
                item,
                isActive,
                isFocused,
                onHoverStart: handleHoverStart,
                onHoverEnd: handleHoverEnd,
                onClick: handleClick,
              };

              return (
                <div
                  key={item.id}
                  className={
                    item.isFeatured ? "lg:pt-0" : index % 2 === 0 ? "lg:pt-10" : "lg:pt-4"
                  }
                >
                  {item.isFeatured ? (
                    <FeaturedCard
                      {...sharedProps}
                      ref={(element) => {
                        cardRefs.current[index] = element;
                      }}
                    />
                  ) : (
                    <BountyCard
                      {...sharedProps}
                      ref={(element) => {
                        cardRefs.current[index] = element;
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {focusedItem ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center px-4">
              <div
                className="pointer-events-auto grid w-full max-w-3xl gap-4 border border-[var(--dna-border)] bg-[linear-gradient(180deg,rgba(24,24,28,0.96),rgba(10,10,12,0.98))] p-5 shadow-[0_36px_120px_rgba(0,0,0,0.45)] lg:grid-cols-[1fr,auto]"
                style={{ clipPath: asymmetricPanelClipPath }}
              >
                <div className="space-y-3">
                  <p className="dna-mono text-[0.62rem] uppercase tracking-[0.4em] text-[#FEB23A]">
                    Focus Mode
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="dna-display text-4xl uppercase leading-none tracking-[0.03em] text-white">
                      {focusedItem.title}
                    </h3>
                    <span
                      className="dna-mono border border-[var(--dna-border)] bg-white/6 px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-zinc-300"
                      style={{ clipPath: asymmetricTagClipPath }}
                    >
                      {focusedItem.tag}
                    </span>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-zinc-300/78">
                    {focusedItem.description}
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:items-end">
                  <a
                    href={focusedItem.href}
                    className="inline-flex items-center justify-center bg-[#FF5C49] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-[#FF8872]"
                    style={{ clipPath: asymmetricButtonClipPath }}
                  >
                    {focusedItem.ctaLabel}
                  </a>
                  <button
                    type="button"
                    onClick={() => setFocusedId(null)}
                    className="dna-mono text-[0.62rem] uppercase tracking-[0.34em] text-white/56 transition hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </GridWrapper>
  );
}
