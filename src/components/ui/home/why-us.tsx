import {
  BadgeDollarSign,
  Clock3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const properties: {
    key: string;
  icon: LucideIcon;
}[] = [
  {
    key: "price",
    icon: BadgeDollarSign,
  },
  {
    key: "speed",
    icon: Clock3,
  },
  {
    key: "reliability",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  const t = useTranslations('Home');

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="text-center text-3xl font-extrabold text-primary md:text-4xl">
          {t('whyUs.title')}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map(({ key, icon: Icon }) => (
            <article
              key={key}
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
                {t(`whyUs.items.${key}.title`)}
              </h3>

              <p className="mt-2 max-w-[250px] text-sm leading-5 text-[#222]">
                {t(`whyUs.items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}