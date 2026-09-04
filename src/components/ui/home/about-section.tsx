'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AnimatedCounter from './animated-counter';

function ArrowIcon({ className = '' }: { className?: string }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
        >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    );
}

export default function AboutSection() {
    const t = useTranslations('Home');

    return (
        <section className="relative overflow-hidden bg-white py-20 sm:py-28">
            <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/5"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, #152039 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                }}
                aria-hidden="true"
            />

            <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
                {/* Colonne image */}
                <div className="relative">

                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/20 sm:aspect-[5/6]">
                        <Image
                            src="/images/home/about.jpg"
                            alt={t('aboutImageAlt')}
                            fill
                            sizes="(min-width: 1024px) 40vw, 90vw"
                            className="object-cover"
                        />
                    </div>

                    {/* badge flottant */}
                    <div className="absolute -bottom-6 -right-6 flex items-center gap-3 rounded-2xl bg-white px-12 py-4 shadow-md shadow-primary/15 ring-1 ring-slate-100 sm:-right-8 sm:-bottom-8">
                        <div>
                            <p className="text-4xl font-extrabold leading-none text-primary">
                               +<AnimatedCounter target={300} />
                            </p>
                            <p className="mt-1 text-xs font-medium text-slate-500">
                                {t('companiesCreated')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Colonne contenu */}
                <div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary">
                        <span className="h-px w-6 bg-secondary" />
                        {t('about.label')}
                    </span>

                    <h2 className="mt-4 text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
                        {t('about.title')}
                    </h2>

                    <p className="mt-6 text-base leading-relaxed text-slate-500">
                        {t('about.description')}
                    </p>

                    <ul className="mt-8 space-y-4">
                        {['foreignInvestors', 'courierServices'].map((featureKey) => (
                            <li key={featureKey} className="flex items-start gap-3.5">
                                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                                    <CheckCircle2 size={14} strokeWidth={2.5} />
                                </span>
                                <span className="text-slate-600">{t(`about.features.${featureKey}`)}</span>
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/a-propos"
                        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary hover:shadow-lg hover:shadow-secondary/25"
                    >
                        {t('learnMore')}
                        <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}