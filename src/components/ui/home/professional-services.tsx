'use client';

import { useEffect, useRef, useState } from 'react';
import { SERVICES, ServiceCardItem, type ServiceCard } from './hero-home';
import { useTranslations } from 'next-intl';

function AnimatedServiceCard({ service, index }: { service: ServiceCard; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const card = cardRef.current;

        if (!card) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(card);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`h-full transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <ServiceCardItem service={service} />
        </div>
    );
}

export default function ProfessionalServices() {
    const t = useTranslations('Home');

    return (
        <section className="bg-slate-50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 relative overflow-hidden">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
                        {t('servicesLabel')}
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl">
                        {t('servicesTitle')}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-500">
                        {t('servicesDescription')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((service, index) => (
                        <AnimatedServiceCard key={service.titleKey} service={service} index={index} />
                    ))}
                </div>
            </div>
            <div
                className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/5"
                aria-hidden="true"
            />
        </section>
    );
}
