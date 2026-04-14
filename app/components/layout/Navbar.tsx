export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090c]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white">Michael</p>
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.28em] text-zinc-400 md:flex">
          <a href="#work" className="transition hover:text-white">Work</a>
          <a href="#process" className="transition hover:text-white">Process</a>
          <a href="#gallery" className="transition hover:text-white">Gallery</a>
          <a href="#about" className="transition hover:text-white">About</a>
        </nav>
      </div>
    </header>
  );
}
