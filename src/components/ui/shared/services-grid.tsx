import { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type ServicesGridProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  services: Service[];
};

export default function ServicesGrid({
  eyebrow,
  title,
  subtitle,
  services,
}: ServicesGridProps) {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary/60">
          {subtitle}
        </p>
        <div className="mx-auto mt-6 h-1 w-16 bg-secondary" />

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="relative pt-8">
                <div className="absolute left-6 top-0 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/20 bg-gradient-to-br from-secondary/15 to-secondary/5 shadow-sm">
                  <Icon className="h-6 w-6 text-secondary" strokeWidth={1.75} />
                </div>

                <div className="w-full rounded-xl border border-primary/10 bg-white p-6 pt-10 text-left shadow-sm transition-shadow hover:shadow-md">
                  <h3 className="text-lg font-semibold text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary/60">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
