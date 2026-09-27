"use client";

import Image from "next/image";
import { ChevronDown, Quote } from "lucide-react";
import { useState } from "react";

const BRAND = "#152039";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
  illustration: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Claire Dubois",
    role: "Directrice des opérations",
    quote:
      "L'équipe a pris en charge notre back-office avec beaucoup de sérieux. Un vrai gain de temps au quotidien.",
    image: "/images/testimonials/testimonials-1.jpeg",
    illustration: "/images/testimonials/testimonials-1.jpeg",
  },
  {
    name: "Marc Lefèvre",
    role: "Fondateur, agence digitale",
    quote:
      "Réactifs, organisés et toujours de bon conseil. Notre service client n'a jamais été aussi fluide.",
    image: "/images/testimonials/testimonials-2.jpeg",
    illustration: "/images/testimonials/testimonials-2.jpeg",
  },
  {
    name: "Sofia Andrianina",
    role: "Responsable RH",
    quote:
      "Un accompagnement sur-mesure et une équipe qui comprend vraiment nos besoins.",
    image: "/images/testimonials/testimonials-3.jpeg",
    illustration: "/images/testimonials/testimonials-3.jpeg",
  },
  {
    name: "Claire Dubois1",
    role: "Directrice des opérations",
    quote:
      "L'équipe a pris en charge notre back-office avec beaucoup de sérieux. Un vrai gain de temps au quotidien.",
    image: "/images/testimonials/testimonials-4.jpeg",
    illustration: "/images/testimonials/testimonials-4.jpeg",
  },
  {
    name: "Marc Lefèvre1",
    role: "Fondateur, agence digitale",
    quote:
      "Réactifs, organisés et toujours de bon conseil. Notre service client n'a jamais été aussi fluide.",
    image: "/images/testimonials/testimonials-5.jpeg",
    illustration: "/images/testimonials/testimonials-5.jpeg",
  },
  {
    name: "Sofia Andrianina1",
    role: "Responsable RH",
    quote:
      "Un accompagnement sur-mesure et une équipe qui comprend vraiment nos besoins.",
    image: "/images/testimonials/testimonials-6.jpeg",
    illustration: "/images/testimonials/testimonials-6.jpeg",
  },
  {
    name: "Claire Dubois2",
    role: "Directrice des opérations",
    quote:
      "L'équipe a pris en charge notre back-office avec beaucoup de sérieux. Un vrai gain de temps au quotidien.",
    image: "/images/testimonials/testimonials-7.jpeg",
    illustration: "/images/testimonials/testimonials-7.jpeg",
  },
  {
    name: "Marc Lefèvre2",
    role: "Fondateur, agence digitale",
    quote:
      "Réactifs, organisés et toujours de bon conseil. Notre service client n'a jamais été aussi fluide.",
    image: "/images/testimonials/testimonials-8.jpeg",
    illustration: "/images/testimonials/testimonials-8.jpeg",
  },
  {
    name: "Sofia Andrianina2",
    role: "Responsable RH",
    quote:
      "Un accompagnement sur-mesure et une équipe qui comprend vraiment nos besoins.",
    image: "/images/testimonials/testimonials-9.jpeg",
    illustration: "/images/testimonials/testimonials-9.jpeg",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [showIllustration, setShowIllustration] = useState(true);

  return (
    <div
      onMouseEnter={() => setShowIllustration(false)}
      onMouseLeave={() => setShowIllustration(true)}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: `${BRAND}0D` }}
    >
      {/* Contenu texte */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-700 ${
          showIllustration ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Quote
          className="mb-4 h-6 w-6"
          style={{ color: BRAND }}
          strokeWidth={2}
          fill={BRAND}
        />

        <p className="mb-6 text-sm leading-relaxed text-gray-700">
          {testimonial.quote}
        </p>

        <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <p className="text-sm font-semibold" style={{ color: BRAND }}>
          {testimonial.name}
        </p>
        <p className="text-xs text-gray-500">{testimonial.role}</p>
      </div>

      {/* Illustration */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          showIllustration ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Image
          src={testimonial.illustration}
          alt={`Illustration - ${testimonial.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 px-5 py-4"
          style={{
            background: `linear-gradient(to top, ${BRAND}E6, transparent)`,
          }}
        >
          <p className="text-sm font-semibold text-white">
            {testimonial.name}
          </p>
          <p className="text-xs text-white/70">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [expanded, setExpanded] = useState(false);
  const visibleTestimonials = expanded ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="w-full bg-slate-50 px-6 py-16 md:py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-center text-3xl font-extrabold text-primary md:text-4xl" style={{ color: BRAND }}>
            Témoignages des clients
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {visibleTestimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>

        {testimonials.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:border-secondary hover:text-secondary hover:shadow-md"
              aria-expanded={expanded}
            >
              <span>{expanded ? "Afficher moins" : "Afficher plus"}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
                strokeWidth={2.5}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
