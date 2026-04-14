"use client";

import Image from "next/image";

interface HeroProjectProps {
    project: {
        title: string;
        description: string;
        image: string;
        stack: string[];
    };
}

export default function HeroProject({ project }: HeroProjectProps) {
    return (
        <section className="relative mx-auto mt-10 pb-20 bg-(--dna-night)">

            <div className="relative flex items-center w-480 h-185 justify-center bg-transparent">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="
                    object-fill
                    drop-shadow-[0_60px_120px_rgba(0,0,0,0.8)]
                    "
                />
            </div>

            <div className="pt-16 sm:pt-20">

                <div className=" px-4 sm:px-6 lg:px-10 pb-10 relative grid gap-10 border-t border-white/15 pt-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[5px_5px]" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-size-[4px_4px]" />

                    <div className="space-y-10">
                        <div className="flex items-center gap-4">
                            <p className="text-xs uppercase tracking-[0.35em] text-[#FEB23A]">
                                Featured Project
                            </p>
                            <span className="h-px w-20 bg-white/35" />
                        </div>

                        <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.88] text-white sm:text-6xl lg:text-7xl">
                            {project.title}
                        </h1>

                        <p className="max-w-2xl border-l border-white/25 pl-6 text-lg leading-8 text-zinc-300">
                            {project.description}
                        </p>

                        <div className="max-w-2xl border-t border-white/15 pt-6">
                            <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-zinc-400">
                                Technology Stack
                            </p>
                            <div className="grid gap-y-3 sm:grid-cols-2">
                                {project.stack.map((item) => (
                                    <span
                                        key={item}
                                        className="text-xs uppercase tracking-[0.28em] text-zinc-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="border-y border-white/10 py-5 lg:mt-22">
                        <p className="text-[12px] uppercase tracking-[0.3em] text-zinc-500">Client Quote</p>
                        <blockquote className="mt-4 border-l border-white/20 pl-4">
                            <p className="text-base leading-7 text-zinc-200">
                                &ldquo;He didn’t just build what we asked. He simplified flows we didn’t even realize were confusing.&rdquo;
                            </p>
                            <cite className="mt-3 block text-[12px] uppercase tracking-[0.3em] text-zinc-500 not-italic">
                                CTO @Pixel Perfect
                            </cite>
                        </blockquote>
                    </aside>
                </div>
            </div>
        </section>
    );
}