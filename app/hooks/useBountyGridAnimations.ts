"use client";

import { MutableRefObject, RefObject, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { BountyGridItem } from "../components/bounty/types";

interface UseBountyGridAnimationsParams {
  sectionRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  cardRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
  items: BountyGridItem[];
  hoveredId: string | null;
  focusedId: string | null;
}

function getColumnOffset(index: number): number {
  const offsetPattern: number[] = [-26, -12, 0, -16, -32];
  return offsetPattern[index % offsetPattern.length] ?? 0;
}

function getScrollDistance(index: number): number {
  const speedPattern: number[] = [34, 24, 12, 28, 40];
  return speedPattern[index % speedPattern.length] ?? 16;
}

function getIdleScale(item: BountyGridItem): number {
  return item.isFeatured ? 1.04 : 0.975;
}

function getIdleOpacity(item: BountyGridItem): number {
  return item.isFeatured ? 1 : 0.78;
}

function getIdleFilter(item: BountyGridItem): string {
  return item.isFeatured ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.72)";
}

export default function useBountyGridAnimations({
  sectionRef,
  gridRef,
  cardRefs,
  items,
  hoveredId,
  focusedId,
}: UseBountyGridAnimationsParams) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards: HTMLButtonElement[] = cardRefs.current.filter(
        (card): card is HTMLButtonElement => card !== null
      );

      cards.forEach((card, index) => {
        const item = items[index];
        if (!item) {
          return;
        }

        const visual = card.querySelector<HTMLElement>("[data-bounty-visual]");
        const sheen = card.querySelector<HTMLElement>("[data-bounty-sheen]");
        const copy = card.querySelector<HTMLElement>("[data-bounty-copy]");

        gsap.set(card, {
          y: getColumnOffset(index),
          scale: getIdleScale(item),
          opacity: getIdleOpacity(item),
          zIndex: item.isFeatured ? 4 : 1,
          transformOrigin: "center center",
        });

        if (visual) {
          gsap.set(visual, {
            filter: getIdleFilter(item),
            scale: item.isFeatured ? 1.02 : 1,
          });
        }

        if (sheen) {
          gsap.set(sheen, {
            opacity: item.isFeatured ? 0.48 : 0,
          });
        }

        if (copy) {
          gsap.set(copy, {
            y: item.isFeatured ? 0 : 16,
            opacity: item.isFeatured ? 1 : 0.7,
          });
        }
      });

      gsap.fromTo(
        cards,
        {
          y: (index: number) => getColumnOffset(index) + 40,
          opacity: 0,
        },
        {
          y: (index: number) => getColumnOffset(index),
          opacity: (index: number) => getIdleOpacity(items[index]),
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      cards.forEach((card, index) => {
        gsap.to(card, {
          y: getColumnOffset(index) - getScrollDistance(index),
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [cardRefs, gridRef, items, sectionRef]);

  useEffect(() => {
    const cards: HTMLButtonElement[] = cardRefs.current.filter(
      (card): card is HTMLButtonElement => card !== null
    );
    const activeId = focusedId ?? hoveredId;

    cards.forEach((card, index) => {
      const item = items[index];
      if (!item) {
        return;
      }

      const visual = card.querySelector<HTMLElement>("[data-bounty-visual]");
      const sheen = card.querySelector<HTMLElement>("[data-bounty-sheen]");
      const copy = card.querySelector<HTMLElement>("[data-bounty-copy]");
      const isActive = activeId === item.id;
      const isBackground = activeId !== null && activeId !== item.id;

      if (isActive) {
        gsap.to(card, {
          scale: focusedId === item.id ? 1.12 : 1.08,
          opacity: 1,
          y: getColumnOffset(index) - 18,
          zIndex: 12,
          duration: 0.42,
          ease: "power3.out",
        });

        if (visual) {
          gsap.to(visual, {
            filter: "grayscale(0%) brightness(1.12)",
            scale: 1.08,
            duration: 0.42,
            ease: "power3.out",
          });
        }

        if (sheen) {
          gsap.to(sheen, {
            opacity: 0.72,
            duration: 0.42,
            ease: "power2.out",
          });
        }

        if (copy) {
          gsap.to(copy, {
            y: 0,
            opacity: 1,
            duration: 0.42,
            ease: "power2.out",
          });
        }

        return;
      }

      if (isBackground) {
        gsap.to(card, {
          scale: item.isFeatured ? 0.97 : 0.945,
          opacity: focusedId === null ? 0.44 : 0.24,
          y: getColumnOffset(index) + 8,
          zIndex: 0,
          duration: 0.42,
          ease: "power2.out",
        });

        if (visual) {
          gsap.to(visual, {
            filter: "grayscale(100%) brightness(0.46)",
            scale: 0.99,
            duration: 0.42,
            ease: "power2.out",
          });
        }

        if (sheen) {
          gsap.to(sheen, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (copy) {
          gsap.to(copy, {
            y: 22,
            opacity: 0.45,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        return;
      }

      gsap.to(card, {
        scale: getIdleScale(item),
        opacity: getIdleOpacity(item),
        y: getColumnOffset(index),
        zIndex: item.isFeatured ? 4 : 1,
        duration: 0.42,
        ease: "power3.out",
      });

      if (visual) {
        gsap.to(visual, {
          filter: getIdleFilter(item),
          scale: item.isFeatured ? 1.02 : 1,
          duration: 0.42,
          ease: "power3.out",
        });
      }

      if (sheen) {
        gsap.to(sheen, {
          opacity: item.isFeatured ? 0.48 : 0,
          duration: 0.42,
          ease: "power2.out",
        });
      }

      if (copy) {
        gsap.to(copy, {
          y: item.isFeatured ? 0 : 16,
          opacity: item.isFeatured ? 1 : 0.7,
          duration: 0.42,
          ease: "power2.out",
        });
      }
    });
  }, [cardRefs, focusedId, hoveredId, items]);
}
