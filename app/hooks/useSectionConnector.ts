"use client";

import { RefObject, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface UseSectionConnectorParams {
  fromSection: RefObject<HTMLElement | null>;
  toSection: RefObject<HTMLElement | null>;
}

export default function useSectionConnector({
  fromSection,
  toSection,
}: UseSectionConnectorParams) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const connectorLine = document.getElementById("section-connector-line");
      if (!connectorLine || !fromSection.current || !toSection.current) return;

      const fromEl = fromSection.current;
      const toEl = toSection.current;
      const startRect = fromEl.getBoundingClientRect();
      const endRect = toEl.getBoundingClientRect();

      const connectorX = startRect.left + startRect.width / 2 - 40;
      const startY = startRect.bottom;
      const endY = endRect.top;
      const pathLength = endY - startY;

      gsap.set(connectorLine, {
        left: connectorX,
        top: startY,
        height: pathLength,
        scaleY: 0,
      });

      gsap.to(connectorLine, {
        scaleY: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: fromEl,
          start: "bottom 60%",
          end: "top 40%",
          scrub: 1.5,
        },
      });

      const dotStart = document.getElementById("section-connector-dot-start");
      const dotEnd = document.getElementById("section-connector-dot-end");

      gsap.set(dotStart, { left: connectorX + 2, top: startY - 6 });
      gsap.set(dotEnd, { left: connectorX + 2, top: endY - 6 });

      gsap.fromTo(
        dotEnd,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: toEl,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
          duration: 0.4,
          ease: "back.out(2)",
        }
      );
    });

    return () => ctx.revert();
  }, [fromSection, toSection]);
}