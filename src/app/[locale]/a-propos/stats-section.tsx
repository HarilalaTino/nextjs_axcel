"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useTranslations } from "next-intl";

const SIZE = 140;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DURATION = 1.5;

type Stat = {
    value: number;
    label: string;
};

function StatCircle({ value, label }: Stat) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(wrapperRef, { once: true, amount: 0.3 });

    const progress = useMotionValue(0);

    const strokeDashoffset = useTransform(
        progress,
        (v) => CIRCUMFERENCE - (v / 100) * CIRCUMFERENCE
    );

    const roundedLabel = useTransform(progress, (v) => `${Math.round(v)}%`);

    useEffect(() => {
        if (!isInView) return;

        const controls = animate(progress, value, {
            duration: DURATION,
            ease: [0.33, 1, 0.68, 1],
        });

        return () => controls.stop();
    }, [isInView, value, progress]);

    return (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-6 py-8">
            <div ref={wrapperRef} className="relative" style={{ width: SIZE, height: SIZE }}>
                <svg
                    width={SIZE}
                    height={SIZE}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    className="-rotate-90"
                >
                    <circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth={STROKE}
                    />
                    <motion.circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        stroke="#ff6341"
                        strokeWidth={STROKE}
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        style={{ strokeDashoffset }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span className="text-2xl font-bold text-slate-900">
                        {roundedLabel}
                    </motion.span>
                </div>
            </div>
            <p className="text-center text-sm font-medium text-slate-600">{label}</p>
        </div>
    );
}

export default function StatsSection() {
    const t = useTranslations("About.stats");

    const stats: Stat[] = [
        { value: 60, label: t("items.companyCreation") },
        { value: 23, label: t("items.advice") },
        { value: 8, label: t("items.administrativeLetters") },
        { value: 18, label: t("items.otherServices") },
    ];

    return (
        <div className="bg-slate-50 py-20 mt-10">
            <div className="mx-auto max-w-7xl   px-4 sm:px-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-500">
                    {t("eyebrow")}
                </p>
                <h2 className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl xl:text-4xl">
                    {t("title")}
                </h2>
                <div className="mt-4 h-1 w-16 bg-secondary" />

                <p className=" mt-8 max-w-3xl">
                    {t("description")}
                </p>
                <p className=" mt-4 max-w-3xl">
                    {t("subtitle")}
                </p>

                <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {stats.map((stat) => (
                        <StatCircle key={stat.label} {...stat} />
                    ))}
                </div>
            </div>
        </div>

    );
}
