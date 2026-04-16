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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-3 sm:px-6"
      >
        <a
          href="#"
          className="group relative inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 uppercase"
        >
          <span className="text-[0.72rem] font-semibold tracking-[0.34em] text-white/90">MICHAEL</span>
          <span className="text-[0.52rem] tracking-[0.26em] text-white/50">/</span>
          <span className="text-[0.52rem] tracking-[0.26em] text-[#FEB23A]">Florentio</span>
        </a>

        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/60 transition duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#work"
          className="inline-flex items-center border border-white/20 bg-white/5 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.3em] text-white/70 md:hidden"
        >
          Menu
        </a>
      </div>
    </nav>
  );
}
