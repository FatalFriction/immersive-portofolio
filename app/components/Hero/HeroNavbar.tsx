"use client";

import { useRef } from "react";

import useHeroNavbarAnimation from "../../hooks/useHeroNavbarAnimation";
import { asymmetricRectClipPath } from "@/app/lib/asymmetricShapes";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "mailto:hello@example.com" },
];

export default function HeroNavbar() {
  const navRef = useRef<HTMLElement | null>(null);

  useHeroNavbarAnimation(navRef);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between bg-[linear-gradient(135deg,rgba(10,10,12,0.96),rgba(20,20,24,0.9))] px-4 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.45)] backdrop-blur-lg sm:px-6"
      style={{
              clipPath: asymmetricRectClipPath,
            }}
      >
        <a
          href="#"
          className="group relative inline-flex items-center gap-3 border border-[#FF5C49]/40 bg-[#0e0e11] px-3 py-2 uppercase"
        >
          <span className="block h-2 w-2 bg-[#FF5C49]" />
          <span className="text-[0.72rem] font-semibold tracking-[0.34em] text-white">Avalons</span>
          <span className="hidden text-[0.55rem] tracking-[0.26em] text-[#FF8872] sm:block">Studio</span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative inline-flex items-center border border-white/15 bg-[#0f0f13]/92 px-4 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-zinc-300 transition duration-300 hover:-translate-y-0.5 hover:border-[#FEB23A]/60 hover:text-[#FEB23A]"
              style={{ transform: `translateY(${index % 2 === 0 ? "0px" : "2px"})` }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#work"
          className="inline-flex items-center border border-[#A38FE8]/40 bg-[#1a1524]/85 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-[#d8ccff] md:hidden"
        >
          Index
        </a>
      </div>

      <div className="pointer-events-none mx-auto mt-2 hidden w-full max-w-7xl items-start justify-between px-2 md:flex">
        <p/>
        <p className="-rotate-2 border border-[#FEB23A]/35 bg-[#20180f]/75 px-2 py-1 text-[0.52rem] uppercase tracking-[0.26em] text-[#FEB23A]">
          Issue 2026
        </p>
      </div>
    </nav>
  );
}
