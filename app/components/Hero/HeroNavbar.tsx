"use client";

import { useRef } from "react";

import useHeroNavbarAnimation from "../../hooks/useHeroNavbarAnimation";

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
      className="fixed inset-x-0 top-0 z-40 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-[0.72rem] uppercase tracking-[0.35em] text-white/70 transition duration-300 hover:text-white/100 sm:px-8 lg:px-10"
    >
      <div className="font-semibold tracking-[0.4em] text-white/90">
        MICHAEL
      </div>

      <div className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition duration-300 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="md:hidden text-white/60">
        <a href="#work">Menu</a>
      </div>
    </nav>
  );
}
