'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedCounterProps = {
    target: number;
    prefix?: string;
    suffix?: string;
};

export default function AnimatedCounter({
    target,
    prefix = '',
    suffix = '',
}: AnimatedCounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null);
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const counter = counterRef.current;

        if (!counter) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(counter);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 1500;
        const startTime = performance.now();
        let animationFrame: number;

        const animate = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCount(Math.round(easedProgress * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, target]);

    return (
        <span ref={counterRef}>
            {prefix}{count}{suffix}
        </span>
    );
}
