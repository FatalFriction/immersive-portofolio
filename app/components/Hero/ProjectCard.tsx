import Image from "next/image";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    year: string;
    tag: string;
    stack: string[];
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden border border-white/10 bg-[var(--dna-surface)]/95 transition duration-300 hover:-translate-y-1 hover:border-[#FF5C49]/40">
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={920}
          height={520}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        <div className="absolute left-5 top-5 bg-black/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#FEB23A]">
          {project.tag}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex justify-between text-xs text-zinc-400">
          <span>{project.year}</span>
          <span>View</span>
        </div>

        <h3 className="text-lg font-semibold text-white">{project.title}</h3>

        <p className="text-sm text-zinc-400">{project.description}</p>

        <div className="flex flex-wrap gap-2 pt-2 opacity-0 transition group-hover:opacity-100">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}