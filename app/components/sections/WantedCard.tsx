export default function WantedCard() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111113]/90 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.28)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,92,73,0.16),_transparent_50%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
          <div className="rounded-[2rem] border border-white/10 bg-[#0d0d0f]/95 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.2)]" style={{ transform: "rotate(-1.5deg)" }}>
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-white/10 bg-[#17171b]/90 text-3xl font-bold text-white/70">
                  M
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#A38FE8]">Michael</p>
                  <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-white">Full-Stack Developer</h2>
                  <p className="mt-2 text-sm uppercase tracking-[0.28em] text-zinc-400">Jakarta</p>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0b0b0d]/95 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[#FEB23A]">Open for opportunities</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#141418]/95 p-4 text-sm text-zinc-300">
                  <p className="font-semibold text-white">3+ Years Experience</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-[#141418]/95 p-4 text-sm text-zinc-300">
                  <p className="font-semibold text-white">15+ Features Delivered</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-[#141418]/95 p-4 text-sm text-zinc-300">
                  <p className="font-semibold text-white">Fullstack + DevOps</p>
                </div>
              </div>
              <div className="space-y-3 text-sm leading-7 text-zinc-300">
                <p>I build high-impact software for teams and founders by combining clean UX, stable backend systems, and a developer-first delivery process.</p>
                <p>I enjoy turning product strategy into launch-ready experiences and shaping systems that are easy to scale.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-6">
            <div className="h-80 w-full max-w-md rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#15151a] via-[#1b1b1f] to-[#0b0b0e] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.24)]">
              <div className="flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-white/10 bg-[#09090d]/95">
                <p className="text-sm uppercase tracking-[0.32em] text-[#FEB23A]">Profile</p>
                <div className="mt-8 h-48 w-48 rounded-[2rem] bg-[#17171b]/90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
