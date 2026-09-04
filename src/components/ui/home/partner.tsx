import Image from "next/image";
import { useTranslations } from "next-intl";

const companies = [
  {
    name: "Access banque",
    logo: "/images/home/partner/access_banque.png",
  },
  {
    name: "Bred",
    logo: "/images/home/partner/bred.png",
  },
  {
    name: "Manitra+",
    logo: "/images/home/partner/manitra+.png",
  },
  {
    name: "Next food Africa",
    logo: "/images/home/partner/Next_food_Africa.png",
  },
  {
    name: "Tumbu",
    logo: "/images/home/partner/tumbu.png",
  },
];

export default function Partner() {
  const t = useTranslations('Home');
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="mt-2 text-center text-3xl font-extrabold text-primary md:text-4xl">
            {t('partnersTitle')}
          </h2>
        </div>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {companies.map((company) => (
            <div
              key={company.name}
              className="
                flex
                h-28
                w-[calc(50%-12px)]
                items-center
                justify-center
                rounded-xl
                border
                border-gray-100
                bg-white
                px-5
                sm:w-[calc(33.333%-16px)]
                lg:w-[calc(20%-20px)]
              "
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={140}
                height={80}
                className="
                    h-auto
                    max-h-12
                    w-auto
                    max-w-[200px]
                    object-contain
                    transition-transform
                    duration-300
                    hover:scale-105
                "
                />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}