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
        <section className="relative mx-auto w-full py-20 bg-primary">

            <div className="relative flex items-center justify-center bg-transparent">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={1920}
                    height={720}
                    className="
                    object-contain
                    drop-shadow-[0_60px_120px_rgba(0,0,0,0.8)]
                    "
                />
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-1 pt-20 px-4 sm:px-6 lg:px-10 ">
                <div className="space-y-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#FEB23A]">
                        Featured Project
                    </p>

                    <h1 className="text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                        {project.title}
                    </h1>

                    <p className="max-w-lg text-lg leading-8 text-zinc-300">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                            <span
                                key={item}
                                className="border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-300"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}