import type { LucideIcon } from 'lucide-react';

type ElegantCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function ElegantCard({
  icon: Icon,
  title,
  description,
}: ElegantCardProps) {
  return (
    <article className="flex min-h-[170px] flex-col items-center rounded-2xl bg-slate-50 px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Icon className="text-primary" size={32} strokeWidth={2} />

      <h3 className="mt-5 text-lg font-semibold text-[#111]">{title}</h3>

      <p className="mt-2 max-w-[250px] text-sm leading-5 text-[#222]">
        {description}
      </p>
    </article>
  );
}