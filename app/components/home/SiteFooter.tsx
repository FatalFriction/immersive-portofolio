import { FooterLink } from "../../content/homeTypes";
import { asymmetricLargePanelClipPath, asymmetricTagClipPath } from "../../lib/asymmetricShapes";

interface SiteFooterProps {
  links: FooterLink[];
}

export default function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer className="relative px-4 py-12 sm:py-16 lg:px-10 lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_bottom,_rgba(255,92,73,0.15),_transparent_50%)]" />
      <div
        className="mx-auto max-w-7xl border border-[var(--dna-border)] bg-[#08080a]/95 px-4 py-6 text-sm text-zinc-500 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:px-6 sm:py-8"
        style={{ clipPath: asymmetricLargePanelClipPath }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-white">Michael Florentio · Full-Stack Developer</p>
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="border border-[var(--dna-border)] bg-white/5 px-4 py-2 transition hover:border-[#A38FE8] hover:text-[#A38FE8]"
                style={{ clipPath: asymmetricTagClipPath }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-6 text-xs text-zinc-500">
          © 2026 Michael Florentio. Jakarta, Indonesia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
