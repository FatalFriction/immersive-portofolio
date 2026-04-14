export default function Footer() {
  const links = [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Email", href: "mailto:hello@example.com" },
  ];

  return (
    <footer className="rounded-[2rem] border border-white/10 bg-[#0b0b0d]/95 px-6 py-8 text-sm text-zinc-500 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-white">Michael</p>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#1DBFB0] hover:text-[#1DBFB0]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-zinc-500">© 2026 Michael. All rights reserved.</p>
    </footer>
  );
}
