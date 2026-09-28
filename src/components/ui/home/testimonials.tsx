"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const BRAND = "#152039";
const ACCENT = "#ff6341";
const PER_PAGE = 3;
const FADE_MS = 350;

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Aaron en parle",
    role: "Créateur de vidéos",
    quote:
      "L'équipe a pris en charge notre back-office avec beaucoup de sérieux. Un vrai gain de temps au quotidien.",
    image: "/images/testimonials/testimonials-1.jpeg",
  },
  {
    name: "Marc Lefèvre",
    role: "Fondateur, agence digitale",
    quote:
      "Réactifs, organisés et toujours de bon conseil. Notre service client n'a jamais été aussi fluide.",
    image: "/images/testimonials/testimonials-2.jpeg",
  },
  {
    name: "Sofia Andrianina",
    role: "Responsable RH",
    quote:
      "Un accompagnement sur-mesure et une équipe qui comprend vraiment nos besoins.",
    image: "/images/testimonials/testimonials-3.jpeg",
  },
  {
    name: "Claire Dubois1",
    role: "Directrice des opérations",
    quote:
      "L'équipe a pris en charge notre back-office avec beaucoup de sérieux. Un vrai gain de temps au quotidien.",
    image: "/images/testimonials/testimonials-4.jpeg",
  },
  {
    name: "Marc Lefèvre1",
    role: "Fondateur, agence digitale",
    quote:
      "Réactifs, organisés et toujours de bon conseil. Notre service client n'a jamais été aussi fluide.",
    image: "/images/testimonials/testimonials-5.jpeg",
  },
  {
    name: "Sofia Andrianina1",
    role: "Responsable RH",
    quote:
      "Un accompagnement sur-mesure et une équipe qui comprend vraiment nos besoins.",
    image: "/images/testimonials/testimonials-6.jpeg",
  },
  {
    name: "Claire Dubois2",
    role: "Directrice des opérations",
    quote:
      "L'équipe a pris en charge notre back-office avec beaucoup de sérieux. Un vrai gain de temps au quotidien.",
    image: "/images/testimonials/testimonials-7.jpeg",
  },
  {
    name: "Marc Lefèvre2",
    role: "Fondateur, agence digitale",
    quote:
      "Réactifs, organisés et toujours de bon conseil. Notre service client n'a jamais été aussi fluide.",
    image: "/images/testimonials/testimonials-8.jpeg",
  },
  {
    name: "Sofia Andrianina2",
    role: "Responsable RH",
    quote:
      "Un accompagnement sur-mesure et une équipe qui comprend vraiment nos besoins.",
    image: "/images/testimonials/testimonials-9.jpeg",
  },
];

/**
 * La photo reste toujours visible : au survol (ou au tap / focus clavier),
 * un panneau monte depuis le bas et révèle la citation.
 */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-slate-200 shadow-[0_18px_40px_-20px_rgba(21,32,57,0.45)]"
    >
      {/* Photo */}
      <Image
        src={testimonial.image}
        alt={`${testimonial.name}, ${testimonial.role}`}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-cover object-top transition-transform duration-700 ease-out motion-reduce:transition-none ${
          open ? "scale-105" : "scale-100"
        }`}
      />

      {/* Voile sombre léger pour assurer la lisibilité */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-60"
        }`}
        style={{
          background: `linear-gradient(to top, ${BRAND}F2 0%, ${BRAND}80 35%, transparent 65%)`,
        }}
      />

      {/* Bouton guillemets : indique que la carte est interactive (utile sur mobile) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
        aria-label={`Lire le témoignage de ${testimonial.name}`}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
        style={{
          backgroundColor: open ? ACCENT : undefined,
          transform: open ? "rotate(180deg)" : undefined,
        }}
      >
        <Quote
          className="h-4 w-4"
          strokeWidth={2}
          style={{ color: open ? "#fff" : BRAND }}
          fill={open ? "#fff" : BRAND}
        />
      </button>

      {/* Panneau du bas : nom + rôle toujours visibles, citation qui se déplie */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-5 pt-6 text-white">
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="pb-4 text-[15px] leading-relaxed text-white/95">
              {testimonial.quote}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className={`block w-1 self-stretch rounded-full transition-all duration-500 motion-reduce:transition-none ${
              open ? "opacity-100" : "opacity-70"
            }`}
            style={{ backgroundColor: ACCENT }}
          />
          <div>
            <p className="text-base font-semibold leading-tight">
              {testimonial.name}
            </p>
            <p className="text-xs text-white/70">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true);
  const t = useTranslations("Home");

  const pageCount = Math.ceil(testimonials.length / PER_PAGE);
  const items = testimonials.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  // Fade out -> changement de page -> fade in
  const goTo = (next: number) => {
    if (!visible || next === page || next < 0 || next >= pageCount) return;
    setVisible(false);
    setTimeout(() => {
      setPage(next);
      setVisible(true);
    }, FADE_MS);
  };

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm transition-all duration-300 hover:border-secondary hover:text-secondary hover:shadow-md disabled:pointer-events-none disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-md:-rotate-90";

  return (
    <section className="w-full bg-slate-50 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2
            className="text-3xl font-extrabold md:text-4xl"
            style={{ color: BRAND }}
          >
            {t("testimonialsTitle")}
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-4 h-1 w-14 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10">
          {/* Cartes : fade out / fade in au changement de page */}
          <div
            className={`grid flex-1 grid-cols-1 gap-8 transition-opacity ease-in-out motion-reduce:transition-none md:grid-cols-3 md:pb-10 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
            aria-live="polite"
          >
            {items.map((item) => (
              <div
                key={item.name}
                className="md:[&:nth-child(3n+2)]:translate-y-10"
              >
                <TestimonialCard testimonial={item} />
              </div>
            ))}
          </div>

          {/* Navigation : verticale à droite sur desktop, horizontale sous les cartes sur mobile */}
          <nav
            aria-label="Navigation des témoignages"
            className="flex items-center justify-center gap-4 md:w-11 md:flex-col md:justify-center md:pb-10"
          >
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Témoignages précédents"
              className={arrowClass}
            >
              <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-2 md:flex-col">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Page ${i + 1} sur ${pageCount}`}
                  aria-current={i === page}
                  className="rounded-full transition-all duration-300 motion-reduce:transition-none h-2 w-2 md:h-2 md:w-2 data-[active=true]:w-6 md:data-[active=true]:h-6 md:data-[active=true]:w-2"
                  data-active={i === page}
                  style={{
                    backgroundColor: i === page ? ACCENT : `${BRAND}33`,
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === pageCount - 1}
              aria-label="Témoignages suivants"
              className={arrowClass}
            >
              <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
