"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useTranslations } from "next-intl";

type ProgressItem = {
    label: string;
    value: number;
};

const DURATION = 1.5;

function ProgressBar({ label, value }: ProgressItem) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(wrapperRef, { once: true, amount: 0.5 });

    const progress = useMotionValue(0);
    const width = useTransform(progress, (v) => `${v}%`);
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
        <div ref={wrapperRef} className="mb-6">
            <p className="mb-2 text-sm font-medium text-slate-800">{label}</p>
            <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                    className="flex h-full items-center justify-end rounded-full px-3 bg-secondary"
                    style={{ width }}
                >
                    <motion.span className="text-xs font-semibold text-white">
                        {roundedLabel}
                    </motion.span>
                </motion.div>
            </div>
        </div>
    );
}

export default function ServicesSection() {
    const t = useTranslations("About.service");

    const progressItems: ProgressItem[] = [
        { label: t("progressItemsOne.label"), value: 75 },
        { label: t("progressItemsTwo.label"), value: 90 },
    ];

    return (
        <section className="w-full bg-white px-4">
            <div className="mx-auto max-w-6xl">
                <div className="mt-8">
                    {progressItems.map((item) => (
                        <ProgressBar key={item.label} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
