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
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-center text-3xl font-extrabold text-primary md:text-4xl">
            {t('partnersTitle')}
          </h2>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 items-center justify-items-center gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-12 lg:gap-y-14">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex w-full items-center justify-center"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={220}
                height={120}
                className="
                  h-auto
                  max-h-20
                  w-auto
                  max-w-[220px]
                  object-contain
                  transition-transform
                  duration-300
                  hover:scale-110
                "
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
