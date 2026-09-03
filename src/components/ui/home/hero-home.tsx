'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
    User,
    Building2,
    MapPin,
    Headset,
    HeartHandshake,
    Landmark,
} from 'lucide-react';

const HERO_IMAGES = ['/images/home/hero-bg-1.jpg', '/images/home/hero-bg-2.jpg'];

export type ServiceCard = {
    title: string;
    description: string;
    ctaLabel: string;
    href: string;
    icon: ReactNode;
};

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

export const SERVICES: ServiceCard[] = [
    {
        title: 'Création Entreprise Individuelle',
        description: 'Lancez votre activité en solo avec un statut simple et rapide à mettre en place.',
        ctaLabel: 'Créer',
        href: '/creation-entreprise-individuelle',
        icon: <User size={20} />,
    },
    {
        title: 'Création Société SARL - SARLU',
        description: 'Structurez votre société à plusieurs associés avec une responsabilité limitée.',
        ctaLabel: 'Créer',
        href: '/creation-societe-sarl',
        icon: <Building2 size={20} />,
    },
    {
        title: 'Création ONG et Association',
        description: 'Structurez votre projet associatif ou humanitaire avec un statut adapté à votre mission.',
        ctaLabel: 'Créer',
        href: '/creation-ong-association',
        icon: <HeartHandshake size={20} />,
    },
    {
        title: 'Domiciliation',
        description: 'Domiciliez votre siège social à une adresse professionnelle reconnue.',
        ctaLabel: 'Domicilier',
        href: '/domiciliation',
        icon: <MapPin size={20} />
    },
    {
        title: 'Location Salle de Réunion',
        description: 'Réservez une salle équipée pour vos réunions et rendez-vous professionnels.',
        ctaLabel: 'Réserver',
        href: '/location-salle-reunion',
        icon: <Landmark size={20}/>
    },
    {
        title: 'Conseil et Assistance',
        description: 'Bénéficiez d\u2019un accompagnement juridique et administratif sur mesure.',
        ctaLabel: 'Être conseillé',
        href: '/conseil-assistance',
        icon: <Headset size={20} />
    },
];

export function ServiceCardItem({ service }: { service: ServiceCard }) {
    return (
        <div className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10 hover:ring-secondary/20">
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 ease-out group-hover:scale-x-100" />

            <span
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary ring-1 ring-slate-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:ring-secondary/40"
            >
                {service.icon}
            </span>

            <h3 className="min-h-[3.5rem] text-lg font-extrabold uppercase leading-7 text-primary/80">
                {service.title}
            </h3>
            <p className="mt-1 min-h-[3rem] text-sm leading-6 text-slate-500">{service.description}</p>

            <a
                href={service.href}
                className="group/cta relative mt-auto inline-flex w-fit items-center gap-1.5 overflow-hidden rounded-full py-2 pl-4 pr-3 text-sm font-semibold text-secondary"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary/10 to-secondary/0 transition-opacity duration-500 ease-out group-hover:opacity-0" />

                <span className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-secondary/20 to-secondary/30 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

                <span className="relative z-10">En savoir plus</span>
                <ArrowIcon className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
        </div>
    );
}

function AnimatedHeroCard({ service, index }: { service: ServiceCard; index: number }) {
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
            className={`h-full transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <ServiceCardItem service={service} />
        </div>
    );
}

function HeroBottomCurve() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 z-10 h-16 w-full text-white lg:h-20"
      viewBox="0 0 1920 160"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 C 480,140 1440,140 1920,0 L1920,160 L0,160 Z"
        fill="currentColor"
      />
    </svg>
  );
}


export default function HeroServices() {
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (HERO_IMAGES.length <= 1) return;
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative bg-white">
            <div className="hidden md:block relative h-[420px] overflow-hidden md:h-[820px] lg:h-[740px]">
                {HERO_IMAGES.map((src, index) => (
                    <Image
                        key={src}
                        src={src}
                        alt="Présentation de l'entreprise"
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className={`object-cover transition-opacity duration-1000 ease-in-out ${index === activeImage ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />

                <div className="absolute inset-0 hidden items-center px-6 md:flex lg:px-8">
                    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 lg:grid-cols-3">
                        {SERVICES.map((service, index) => (
                            <AnimatedHeroCard key={service.title} service={service} index={index} />
                        ))}
                    </div>
                </div>

                {/* Courbe en bas du hero */}
                <HeroBottomCurve />
            </div>

            <div className="px-4 pt-6 sm:px-6 md:hidden">
                <h2 className="text-2xl font-bold text-primary">
                    Choisir votre service
                </h2>
                <span className="text-sm text-gray-500 mb-8 block">
                    + de 300 entreprises créées depuis 2022
                </span>
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5">
                    {SERVICES.map((service, index) => (
                        <AnimatedHeroCard key={`mobile-${service.title}`} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}