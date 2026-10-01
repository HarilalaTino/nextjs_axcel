"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, Play, Quote, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const BRAND = "#152039";
const ACCENT = "#ff6341";
const FB_BLUE = "#1877F2";
const PER_PAGE = 3;
const FADE_MS = 350;

interface Testimonial {
  name: string;
  role?: string;
  description: string;
  image: string;
  fbVideoUrl?: string;
  fbEmbedWidth?: number;
  fbEmbedHeight?: number;
}

function TestimonialCard({
  testimonial,
  onPlay,
}: {
  testimonial: Testimonial;
  onPlay: (t: Testimonial) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(testimonial.fbVideoUrl);
  const ct = useTranslations("customerTestimonial");

  return (
    <article
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      // Mobile : la carte grandit avec son contenu (flex-col + justify-end)
      // md+ : retour au ratio 4/5 fixe avec texte en absolute
      className="relative flex min-h-[420px] w-full flex-col justify-end overflow-hidden rounded-3xl bg-slate-200 shadow-[0_18px_40px_-20px_rgba(21,32,57,0.45)] md:block md:aspect-[4/5] md:min-h-0"
    >
      {/* Photo */}
      <Image
        src={testimonial.image}
        alt={`${testimonial.name}`}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-cover object-top transition-transform duration-700 ease-out motion-reduce:transition-none ${
          open ? "scale-105" : "scale-100"
        }`}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-60"
        }`}
        style={{
          background: `linear-gradient(
          to top,
            ${BRAND}F2 0%,
            ${BRAND}B8 45%,
            ${BRAND}B8 75%,
            ${BRAND}66 100%
        )`,
        }}
      />

      {hasVideo && (
        <button
          type="button"
          onClick={() => onPlay(testimonial)}
          aria-label={`Regarder le témoignage vidéo de ${testimonial.name} sur Facebook`}
          className={`absolute cursor-pointer z-40  left-4 top-4 flex h-10 items-center overflow-hidden rounded-full shadow-md transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${
            open
              ? "w-auto scale-100 pr-4 opacity-100"
              : "w-10 scale-75 pr-0 opacity-0 pointer-events-none"
          }`}
          style={{ backgroundColor: FB_BLUE }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center">
            <Play className="ml-0.5 h-4 w-4" strokeWidth={0} fill="#fff" />
          </span>
          <span
            className={`overflow-hidden whitespace-nowrap text-sm font-medium text-white transition-all duration-500 ease-out ${
              open ? "max-w-[140px]" : "max-w-0"
            }`}
          >
            {ct("WatchVideo")}
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
        aria-label={`Lire le témoignage de ${testimonial.name}`}
        className="absolute z-10 right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
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

      {/* Mobile : dans le flux normal (pt-20 réserve la place des boutons du haut)
          md+ : absolute en bas comme avant */}
      <div className="relative z-10 px-6 pb-5 pt-20 text-white md:absolute md:inset-x-0 md:bottom-0 md:pt-6">
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
            open
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="pb-4 text-[15px] leading-relaxed text-white/95">
              {testimonial.description}
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
            {testimonial.role && (
              <p className="text-xs text-white/70">{testimonial.role}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function VideoModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const baseWidth = testimonial.fbEmbedWidth ?? 560;
  const baseHeight =
    testimonial.fbEmbedHeight ?? Math.round((baseWidth * 314) / 560);
  const ratio = baseWidth / baseHeight;
  const isPortrait = ratio < 1;

  const EMBED_WIDTH = isPortrait ? 420 : 720;
  const EMBED_HEIGHT = Math.round(EMBED_WIDTH / ratio);

  const embedSrc = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    testimonial.fbVideoUrl!
  )}&show_text=false&autoplay=true&width=${EMBED_WIDTH}&height=${EMBED_HEIGHT}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Vidéo de ${testimonial.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: `min(92vw, calc(85vh * ${ratio}), ${EMBED_WIDTH}px)`,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la vidéo"
          className="absolute -right-3 -top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-4 w-4" strokeWidth={2.5} style={{ color: BRAND }} />
        </button>

        <div
          className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl"
          style={{ aspectRatio: `${ratio}` }}
        >
          <iframe
            key={testimonial.fbVideoUrl}
            src={embedSrc}
            scrolling="no"
            title={`Vidéo Facebook - ${testimonial.name}`}
            className="h-full w-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);
  const t = useTranslations("Home");
  const ct = useTranslations("customerTestimonial");
  const clients = ct.raw("clients") as Testimonial[];

  const pageCount = Math.ceil(clients.length / PER_PAGE);
  const items = clients.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

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
    <section className="w-full bg-slate-50 px-4 xs:px-8 py-16 md:px-10 md:py-24">
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
                <TestimonialCard testimonial={item} onPlay={setActiveVideo} />
              </div>
            ))}
          </div>

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

      {activeVideo && (
        <VideoModal
          testimonial={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
