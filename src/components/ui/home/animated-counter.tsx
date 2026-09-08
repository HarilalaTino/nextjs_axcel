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
    const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined');

    useEffect(() => {
        const counter = counterRef.current;

        if (!counter) return;

        if (typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 },
        );

        observer.observe(counter);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        let current = 0;

        const tick = () => {
            current += Math.max(1, Math.round(target / 20));

            if (current >= target) {
                setCount(target);
                return;
            }

            setCount(current);
            timeoutId = setTimeout(tick, 40);
        };

        tick();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isVisible, target]);

    return (
        <span ref={counterRef}>
            {prefix}{count}{suffix}
        </span>
    );
}
