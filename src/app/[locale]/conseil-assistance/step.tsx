'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, FileSearch, ShieldCheck } from "lucide-react";

const stepsMeta = [
  { icon: MessageCircle },
  { icon: FileSearch },
  { icon: ShieldCheck },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
} as const;

export default function ProcessSteps() {
  const t = useTranslations("AdviceAndAssistance");

  const steps = [
    {
      icon: stepsMeta[0].icon,
      label: t("processSteps.step1.label"),
      title: t("processSteps.step1.title"),
      description: t("processSteps.step1.description"),
    },
    {
      icon: stepsMeta[1].icon,
      label: t("processSteps.step2.label"),
      title: t("processSteps.step2.title"),
      description: t("processSteps.step2.description"),
    },
    {
      icon: stepsMeta[2].icon,
      label: t("processSteps.step3.label"),
      title: t("processSteps.step3.title"),
      description: t("processSteps.step3.description"),
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl lg:text-4xl"
        >
          {t("processSteps.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
          className="mt-3 text-base text-primary/70"
        >
          {t("processSteps.subtitle")}
        </motion.p>

        <div className="mt-20 relative">
          <div className="hidden md:block absolute left-1/2 top-8 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
            }}
            className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute -inset-3 rounded-full bg-secondary/10 blur-xl" />
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.04 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-secondary/15 bg-[#FFF1EC] shadow-[0_12px_30px_rgba(255,99,65,0.12)]"
                    >
                      <Icon size={26} strokeWidth={2} color="#ff6341" />
                    </motion.div>
                  </div>

                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.45 }}
                    className="mt-5 text-xs font-semibold tracking-[0.12em] uppercase"
                    style={{ color: "#ff6341" }}
                  >
                    {step.label}
                  </motion.span>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.14, duration: 0.55 }}
                    className="mt-3 max-w-[220px] text-lg font-semibold leading-snug"
                    style={{ color: "#152039" }}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.14, duration: 0.55 }}
                    className="mt-2 max-w-[240px] text-sm leading-relaxed"
                    style={{ color: "#5B6472" }}
                  >
                    {step.description}
                  </motion.p>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.14, duration: 0.45 }}
                    className="mt-6 h-1.5 w-14 rounded-full bg-gradient-to-r from-secondary/30 to-secondary/80 md:hidden"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
