"use client";

import { RefObject, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function getCardLift(index: number): number {
  const sequence: number[] = [10, 10, 10, 10, 10];
  return sequence[index] ?? 0;
}

function getHoverResetOpacity(featured: boolean): number {
  return featured ? 0.82 : 0.55;
}

function getHoverResetWashOpacity(featured: boolean): number {
  return featured ? 0.1 : 0.06;
}

function animatePreviewCardHover(
  card: HTMLElement,
  cards: HTMLElement[],
  glow: HTMLElement | null,
  wash: HTMLElement | null,
  meta: HTMLElement | null
): void {
  const cardIndex = cards.indexOf(card);
  const baseY = getCardLift(cardIndex);

  cards.forEach((otherCard, i) => {
    if (otherCard === card) {
      return;
    }

    const otherBaseY = getCardLift(i);

    gsap.to(otherCard, {
      scale: 0.96,
      opacity: 0.4,
      y: otherBaseY,
      filter: "grayscale(100%) saturate(0.3) brightness(0.7)",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  gsap.to(card, {
    scale: 1.05,
    opacity: 1,
    y: baseY - 18,
    zIndex: 12,
    filter: "grayscale(0%) saturate(1.2) brightness(1)",
    duration: 0.35,
    ease: "power3.out",
    overwrite: "auto",
  });

  if (glow) {
    gsap.to(glow, {
      opacity: 1,
      scale: 1.12,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  if (wash) {
    gsap.to(wash, {
      opacity: 0.14,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  if (meta) {
    gsap.to(meta, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
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
  cards.forEach((otherCard, index) => {
    gsap.to(otherCard, {
      scale: 1,
      opacity: 1,
      y: getCardLift(index),
      filter: "grayscale(100%) saturate(0.4) brightness(0.85)",
      zIndex: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  gsap.to(card, {
    scale: 1,
    opacity: 1,
    y: getCardLift(cards.indexOf(card)),
    zIndex: 1,
    filter: "grayscale(100%) saturate(0.4) brightness(0.85)",
    duration: 0.3,
    ease: "power2.out",
    overwrite: "auto",
  });

  const isFeatured = card.dataset.featured === "true";

  if (glow) {
    gsap.to(glow, {
      opacity: getHoverResetOpacity(isFeatured),
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  if (wash) {
    gsap.to(wash, {
      opacity: getHoverResetWashOpacity(isFeatured),
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  if (meta) {
    gsap.to(meta, {
      y: 12,
      opacity: 0.82,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  }
}

export default function useHeroPreviewAnimations(sectionRef: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.96 } });

      timeline
        .from(".hero-brand", { y: 32, opacity: 0 })
        .from(
          ".hero-headline",
          {
            y: 48,
            opacity: 0,
            stagger: 0.05,
          },
          "-=0.55"
        )
        .from(
          ".hero-copy",
          {
            y: 32,
            opacity: 0,
          },
          "-=0.65"
        )
        .fromTo(
          ".hero-chip",
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
          },
          "-=0.6"
        )
        .from(
          ".hero-actions",
          {
            y: 28,
            opacity: 0,
            stagger: 0.08,
          },
          "-=0.7"
        )
        .from(
          ".hero-vertical",
          {
            x: 24,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.8"
        );

      gsap.set(".preview-card", {
        filter: "grayscale(100%) saturate(0.4) brightness(0.85)",
      });

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
          y: (index: number) => getCardLift(index),
          opacity: 1,
          rotateZ: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.to(".preview-card", {
        y: (index: number) => getCardLift(index) - (index % 2 === 0 ? 18 : 10),
        scrollTrigger: {
          trigger: ".preview-stack",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
        ease: "none",
      });

      const cards = gsap.utils.toArray<HTMLElement>(".preview-card");
      const listeners: Array<{
        card: HTMLElement;
        handleMouseEnter: () => void;
        handleMouseLeave: () => void;
      }> = [];

      cards.forEach((card) => {
        const glow = card.querySelector<HTMLElement>("[data-preview-glow]");
        const wash = card.querySelector<HTMLElement>("[data-preview-wash]");
        const meta = card.querySelector<HTMLElement>("[data-preview-meta]");
        const handleMouseEnter = () => animatePreviewCardHover(card, cards, glow, wash, meta);
        const handleMouseLeave = () => animatePreviewCardReset(card, cards, glow, wash, meta);

        listeners.push({ card, handleMouseEnter, handleMouseLeave });
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      });

      gsap.set("[data-preview-meta]", {
        y: 12,
        opacity: 0.82,
      });

      return () => {
        listeners.forEach(({ card, handleMouseEnter, handleMouseLeave }) => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}
