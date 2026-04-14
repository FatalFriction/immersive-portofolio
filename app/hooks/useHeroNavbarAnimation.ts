"use client";

import { RefObject, useEffect } from "react";

import gsap from "gsap";

export default function useHeroNavbarAnimation(navRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -24,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, [navRef]);
}
