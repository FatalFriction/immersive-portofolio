"use client";

import { RefObject, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface AnimationConfig {
  duration: number;
  ease: string;
}

interface CardStyleConfig {
  filter: string;
  scale: number;
  opacity: number;
  y: number;
}

interface HoverCallback {
  (): void;
}

interface EventListenerData {
  card: HTMLElement;
  handleMouseEnter: HoverCallback;
  handleMouseLeave: HoverCallback;
}

type TweenVars = Record<string, unknown>;

const CARD_LIFT_SEQUENCE: number[] = [10, 10, 10, 10, 10];

const HOVER_CONFIG: AnimationConfig = { duration: 0.35, ease: "power2.out" };
const RESET_CONFIG: AnimationConfig = { duration: 0.3, ease: "power2.out" };

const BASE_CARD_STYLES: CardStyleConfig = {
  filter: "grayscale(100%) saturate(0.4) brightness(0.85)",
  scale: 1,
  opacity: 1,
  y: 0,
};

const HOVER_CARD_STYLES: CardStyleConfig = {
  filter: "grayscale(0%) saturate(1.2) brightness(1)",
  scale: 1.05,
  opacity: 1,
  y: -18,
};

const DIMMED_CARD_STYLES: CardStyleConfig = {
  filter: "grayscale(100%) saturate(0.3) brightness(0.7)",
  scale: 0.96,
  opacity: 0.4,
  y: 0,
};

const FILTERS = {
  base: "grayscale(100%) saturate(0.4) brightness(0.85)",
  dimmed: "grayscale(100%) saturate(0.3) brightness(0.7)",
  hover: "grayscale(0%) saturate(1.2) brightness(1)",
} as const;

const SCROLL_DURATION = 1;
const SCRUB_SPEED = 1.1;

function getCardLift(index: number): number {
  return CARD_LIFT_SEQUENCE[index] ?? 0;
}

function getHoverResetOpacity(featured: boolean): number {
  return featured ? 0.82 : 0.55;
}

function getHoverResetWashOpacity(featured: boolean): number {
  return featured ? 0.1 : 0.06;
}

function animateCardStyle(
  element: gsap.TweenTarget,
  style: Partial<CardStyleConfig>,
  config: AnimationConfig,
  extraProps: TweenVars = {},
  zIndex?: number
): gsap.core.Tween {
  const props: TweenVars = {
    ...style,
    duration: config.duration,
    ease: config.ease,
    overwrite: "auto",
    ...extraProps,
  };

  if (zIndex !== undefined) {
    props.zIndex = zIndex;
  }

  return gsap.to(element, props);
}

function setElementStyle(
  element: gsap.TweenTarget,
  style: TweenVars
): gsap.core.Tween {
  return gsap.set(element, style);
}

function animatePreviewCardHover(
  card: HTMLElement,
  cards: HTMLElement[],
  glow: HTMLElement | null,
  wash: HTMLElement | null,
  meta: HTMLElement | null
): void {
  const cardIndex = cards.indexOf(card);
  if (cardIndex === -1) return;

  const baseY = getCardLift(cardIndex);

  cards.forEach((otherCard, i) => {
    if (otherCard === card) return;

    const otherBaseY = getCardLift(i);
    animateCardStyle(
      otherCard,
      { ...DIMMED_CARD_STYLES, y: otherBaseY },
      HOVER_CONFIG
    );
  });

  animateCardStyle(
    card,
    { ...HOVER_CARD_STYLES, y: baseY - 18 },
    HOVER_CONFIG,
    { opacity: 1, filter: FILTERS.hover },
    12
  );

  if (glow) {
    gsap.to(glow, {
      opacity: 1,
      scale: 1.12,
      duration: HOVER_CONFIG.duration - 0.05,
      ease: HOVER_CONFIG.ease,
      overwrite: "auto",
    });
  }

  if (wash) {
    gsap.to(wash, {
      opacity: 0.14,
      duration: HOVER_CONFIG.duration - 0.05,
      ease: HOVER_CONFIG.ease,
      overwrite: "auto",
    });
  }

  if (meta) {
    gsap.to(meta, {
      y: 0,
      opacity: 1,
      duration: HOVER_CONFIG.duration - 0.05,
      ease: HOVER_CONFIG.ease,
      overwrite: "auto",
    });
  }
}

function animatePreviewCardReset(
  card: HTMLElement,
  cards: HTMLElement[],
  glow: HTMLElement | null,
  wash: HTMLElement | null,
  meta: HTMLElement | null
): void {
  const isFeatured = card.dataset.featured === "true";

  cards.forEach((otherCard, index) => {
    const baseY = getCardLift(index);
    animateCardStyle(
      otherCard,
      { ...BASE_CARD_STYLES, y: baseY },
      RESET_CONFIG,
      { filter: FILTERS.base },
      1
    );
  });

  const cardIndex = cards.indexOf(card);
  if (cardIndex !== -1) {
    const cardBaseY = getCardLift(cardIndex);
    animateCardStyle(
      card,
      { ...BASE_CARD_STYLES, y: cardBaseY },
      RESET_CONFIG,
      { filter: FILTERS.base },
      1
    );
  }

  if (glow) {
    gsap.to(glow, {
      opacity: getHoverResetOpacity(isFeatured),
      scale: 1,
      duration: RESET_CONFIG.duration - 0.05,
      ease: RESET_CONFIG.ease,
      overwrite: "auto",
    });
  }

  if (wash) {
    gsap.to(wash, {
      opacity: getHoverResetWashOpacity(isFeatured),
      duration: RESET_CONFIG.duration - 0.05,
      ease: RESET_CONFIG.ease,
      overwrite: "auto",
    });
  }

  if (meta) {
    gsap.to(meta, {
      y: 12,
      opacity: 0.82,
      duration: RESET_CONFIG.duration - 0.05,
      ease: RESET_CONFIG.ease,
      overwrite: "auto",
    });
  }
}

function setupHoverListeners(
  cards: HTMLElement[],
  onEnter: (card: HTMLElement, glow: HTMLElement | null, wash: HTMLElement | null, meta: HTMLElement | null) => void,
  onLeave: (card: HTMLElement, glow: HTMLElement | null, wash: HTMLElement | null, meta: HTMLElement | null) => void
): EventListenerData[] {
  return cards.map((card) => {
    const glow = card.querySelector<HTMLElement>("[data-preview-glow]");
    const wash = card.querySelector<HTMLElement>("[data-preview-wash]");
    const meta = card.querySelector<HTMLElement>("[data-preview-meta]");

    const handleMouseEnter = () => onEnter(card, glow, wash, meta);
    const handleMouseLeave = () => onLeave(card, glow, wash, meta);

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return { card, handleMouseEnter, handleMouseLeave };
  });
}

function cleanupHoverListeners(listeners: EventListenerData[]): void {
  listeners.forEach(({ card, handleMouseEnter, handleMouseLeave }) => {
    card.removeEventListener("mouseenter", handleMouseEnter);
    card.removeEventListener("mouseleave", handleMouseLeave);
  });
}

export default function useHeroPreviewAnimations(
  sectionRef: RefObject<HTMLDivElement | null>
): void {
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.96 },
      });

      introTimeline
        .from(".hero-brand", { y: 32, opacity: 0 })
        .from(
          ".hero-headline",
          { y: 48, opacity: 0, stagger: 0.05 },
          "-=0.55"
        )
        .from(".hero-copy", { y: 32, opacity: 0 }, "-=0.65")
        .fromTo(
          ".hero-chip",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07 },
          "-=0.6"
        )
        .from(
          ".hero-actions",
          { y: 28, opacity: 0, stagger: 0.08 },
          "-=0.7"
        )
        .from(
          ".hero-vertical",
          { x: 24, opacity: 0, duration: 0.8 },
          "-=0.8"
        );

      setElementStyle(".preview-card", { filter: FILTERS.base });

      gsap.fromTo(
        ".preview-card",
        {
          y: 54,
          opacity: 0,
          rotateZ: 1.8,
          filter: "grayscale(100%) saturate(0.5) brightness(0.85)",
        },
        {
          scrollTrigger: {
            trigger: ".preview-stack",
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: (i: number) => getCardLift(i),
          opacity: 1,
          rotateZ: 0,
          stagger: 0.1,
          duration: SCROLL_DURATION,
          ease: "power3.out",
        }
      );

      gsap.to(".preview-card", {
        scrollTrigger: {
          trigger: ".preview-stack",
          start: "top bottom",
          end: "bottom top",
          scrub: SCRUB_SPEED,
        },
        y: (i: number) => getCardLift(i) - (i % 2 === 0 ? 18 : 10),
        ease: "none",
      });

      const cards = gsap.utils.toArray<HTMLElement>(".preview-card");

      if (cards.length === 0) return;

      const listeners = setupHoverListeners(
        cards,
        (card, glow, wash, meta) => animatePreviewCardHover(card, cards, glow, wash, meta),
        (card, glow, wash, meta) => animatePreviewCardReset(card, cards, glow, wash, meta)
      );

      setElementStyle("[data-preview-meta]", { y: 12, opacity: 0.82 });

      return () => cleanupHoverListeners(listeners);
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}