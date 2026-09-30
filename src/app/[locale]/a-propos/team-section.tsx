"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

type Member = {
  id: "stephane" | "carol" | "steven";
  image: string;
};

const TEAM: Member[] = [
  { id: "stephane", image: "/images/about/about-3.jpg" },
  { id: "carol", image: "/images/about/about-4.jpg" },
  { id: "steven", image: "/images/about/about-5.jpg" },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

function TeamCard({
  name,
  role,
  image,
  variants,
}: { name: string; role: string; image: string; variants: Variants }) {
  return (
    <motion.article
      variants={variants}
      className="group mx-auto w-full max-w-[300px] lg:[&:nth-child(2)]:mt-10"
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-3xl border-2 border-secondary/60 transition-transform duration-500 ease-out group-hover:translate-x-3.5 group-hover:translate-y-3.5 motion-reduce:transition-none"
        />

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-200 shadow-[0_18px_40px_-20px_rgba(21,32,57,0.45)]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 80vw, 300px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
          />

          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-5 pb-5 text-white">
            <span aria-hidden className="h-9 w-1 rounded-full bg-secondary" />
            <div>
              <h3 className="text-base font-semibold leading-tight">{name}</h3>
              <p className="mt-0.5 text-xs text-white/75">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function TeamSection() {
  const t = useTranslations("About.teamSection");
  const reduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const },
    },
  };

  return (
    <section className="w-full overflow-hidden bg-slate-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold text-secondary">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl font-extrabold leading-tight text-primary xl:text-4xl">
            {t("title")}
          </h2>
          <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-secondary" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:pb-10"
        >
          {TEAM.map((member) => (
            <TeamCard
              key={member.id}
              name={t(`members.${member.id}.name`)}
              role={t(`members.${member.id}.role`)}
              image={member.image}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
