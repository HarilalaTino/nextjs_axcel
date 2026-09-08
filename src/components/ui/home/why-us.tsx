import {
  BadgeDollarSign,
  Clock3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import ElegantCard from "../shared/elegant-card";

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
            <ElegantCard
              key={key}
              icon={Icon}
              title={t(`whyUs.items.${key}.title`)}
              description={t(`whyUs.items.${key}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}