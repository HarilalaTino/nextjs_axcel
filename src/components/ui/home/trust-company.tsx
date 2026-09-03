"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const companies = [
  {
    name: "MTTC",
    logo: "/images/home/trust-logo/01_MTTC.png",
  },
  {
    name: "Centre Medical Ma Vie et Ma Santé",
    logo: "/images/home/trust-logo/02_CENTRE_MEDICAL_MAVIE_MASANTE.png",
  },
  {
    name: "La Verdure",
    logo: "/images/home/trust-logo/03_LA_VERDURE.png",
  },
  {
    name: "Pizza KM",
    logo: "/images/home/trust-logo/04_PIZZA_KM.png",
  },
  {
    name: "Kefir",
    logo: "/images/home/trust-logo/05_KEFIR.png",
  },
  {
    name: "Transcomad",
    logo: "/images/home/trust-logo/06_TRANSCOMAD.png",
  },
  {
    name: "Assiette Carrée",
    logo: "/images/home/trust-logo/07_ASSIETTE_CARREE.png",
  },
  {
    name: "We Technology",
    logo: "/images/home/trust-logo/08_WE_TECHNOLOGY.png",
  },
  {
    name: "Island Escape Tour",
    logo: "/images/home/trust-logo/09_ISLAND_ESCAPE_TOUR.png",
  },
  {
    name: "Université GSI Madagascar",
    logo: "/images/home/trust-logo/10_UNIVERSITE_GSI_MADAGASCAR.png",
  },
  {
    name: "AMCHAM",
    logo: "/images/home/trust-logo/11_AMCHAM.png",
  },
  {
    name: "Clover Hotel",
    logo: "/images/home/trust-logo/12_CLOVER_HOTEL.png",
  },
  {
    name: "Shop Shoes",
    logo: "/images/home/trust-logo/13_SHOP_SHOES.png",
  },
  {
    name: "EGM",
    logo: "/images/home/trust-logo/14_EGM.png",
  },
  {
    name: "Valune",
    logo: "/images/home/trust-logo/15_VALUNE.png",
  },
];

export default function TrustedCompanies() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 1,
        startDelay: 1000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  return (
    <section className="bg-[#f5f3ef] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="text-sm font-medium text-secondary uppercase tracking-wide">
             Ils nous font confiance
          </span>

          <h2 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">
            Des entreprises qui nous font confiance
          </h2>
        </div>

        {/* Carousel */}
        <div
          ref={emblaRef}
          className="cursor-grab overflow-hidden active:cursor-grabbing"
        >
          <div className="flex touch-pan-y">

            {companies.map((company) => (
              <div
                key={company.name}
                className="
                  min-w-0
                  flex-[0_0_50%]
                  px-3
                  sm:flex-[0_0_33.333%]
                  lg:flex-[0_0_16.666%]
                "
              >
                <div
                  className="
                    flex
                    h-28
                    items-center
                    flex-col
                    justify-center
                    rounded-xl
                    border
                    border-gray-100
                    bg-white
                    px-5
                  "
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={140}
                    height={60}
                    className="
                        max-h-12
                        w-auto
                        max-w-[130px]
                        object-contain
                        transition
                        duration-300
                        hover:scale-105
                        "
                  />
                  <p className="ml-2 text-sm font-medium text-gray-700 text-center">
                    {company.name}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}