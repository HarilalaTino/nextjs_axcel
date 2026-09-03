'use client';

import AnimatedCounter from './animated-counter';

type Stat = {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
};

const STATS: Stat[] = [
    { value: 4, suffix: ' ans', label: "d'expérience depuis 2022"  },
    { value: 860, label: 'Entreprises créées' },
    { value: 1000, prefix: '+', label: 'Clients satisfaits'},
    { value: 2000, label: 'formalités réalisées' },
];

export default function StatsBar() {
    return (
        <section className="bg-primary py-10">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-white/10">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="px-4 text-center">
                            <p className={`text-2xl font-extrabold sm:text-3xl text-white/80`}>
                                <AnimatedCounter
                                    target={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
                            </p>
                            <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}