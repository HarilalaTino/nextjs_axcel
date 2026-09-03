import {
  BadgeDollarSign,
  Clock3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const properties: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Tarif avantageux",
    description:
      "Des tarifs compétitifs sans sacrifier la qualité du service, où que vous soyez.",
    icon: BadgeDollarSign,
  },
  {
    title: "Rapidité de service",
    description:
      "Un service rapide et efficace tout en respectant nos engagements et vos délais.",
    icon: Clock3,
  },
  {
    title: "Fiabilité et confidentialité",
    description:
      "Vos informations sont traitées avec le plus grand professionnalisme et confidentialité.",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="text-center text-3xl font-extrabold text-primary md:text-4xl">
          Pourquoi nous faire confiance ?
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="
                flex
                min-h-[170px]
                flex-col
                items-center
                rounded-2xl
                bg-slate-50
                px-6
                py-7
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              <Icon
                className="text-primary"
                size={32}
                strokeWidth={2}
              />

              <h3 className="mt-5 text-lg font-semibold text-[#111]">
                {title}
              </h3>

              <p className="mt-2 max-w-[250px] text-sm leading-5 text-[#222]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}