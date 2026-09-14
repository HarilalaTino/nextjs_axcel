"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

type Member = {
  name: string;
  role: string;
  image: string;
};

const TEAM: Member[] = [
  { name: "Stephane A", role: "CEO", image: "/images/about/about-3.jpg" },
  { name: "Carol R.", role: "Service administratif", image: "/images/about/about-4.jpg" },
  { name: "Steven R.", role: "Coursier Manager", image: "/images/about/about-5.jpg" },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const },
  },
};

function TeamCard({ name, role, image }: Member) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-md"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

      <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col items-center px-4 pb-6 text-center transition-transform duration-500 ease-out group-hover:translate-y-0">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="mt-1 text-sm text-slate-200 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
          {role}
        </p>
        <span className="mt-3 h-0.5 w-0 bg-secondary transition-all duration-500 group-hover:w-10" />
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const t = useTranslations('About.teamSection');
  return (
    <section className="w-full bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-500">
           {t('eyebrow')}
        </p>
        <h2 className="text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
           {t('title')}
        </h2>
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-secondary" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TEAM.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
