interface SectionNumberProps {
  number: string;
  variant?: "coral" | "amber" | "purple" | "teal";
}

const variantStyles = {
  coral: "text-[#FF5C49]/15",
  amber: "text-[#FEB23A]/12",
  purple: "text-[#A38FE8]/12",
  teal: "text-[#1DBFB0]/10",
};

const variantLabelColors = {
  coral: "text-[#FF5C49]",
  amber: "text-[#FEB23A]",
  purple: "text-[#A38FE8]",
  teal: "text-[#1DBFB0]",
};

export default function SectionNumber({ number, variant = "coral" }: SectionNumberProps) {
  return (
    <div className="pointer-events-none absolute left-4 top-1/2 z-[30] -translate-y-1/2 sm:left-6 lg:left-10">
      <div className="flex flex-col items-center gap-1">
        <span className={`text-[2.5rem] font-black leading-none tracking-[-0.06em] sm:text-[3.5rem] ${variantStyles[variant]}`}>
          {number}
        </span>
        <div className={`h-10 w-px ${variantLabelColors[variant]}/30`} />
      </div>
    </div>
  );
}