'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

type GalleryImage = {
    src: string
    alt: string
    quoteSlug?: string
}

type ImageLightboxCarouselProps = {
    images: GalleryImage[]
    quotePoolOfCVs?: string
}

export default function ImageLightboxCarousel({ images, quotePoolOfCVs }: ImageLightboxCarouselProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const close = useCallback(() => setActiveIndex(null), [])
    const showPrev = useCallback(() => {
        setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
    }, [images.length])
    const showNext = useCallback(() => {
        setActiveIndex((i) => (i === null ? null : (i + 1) % images.length))
    }, [images.length])

    useEffect(() => {
        if (activeIndex === null) return

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
            if (e.key === 'ArrowLeft') showPrev()
            if (e.key === 'ArrowRight') showNext()
        }
        window.addEventListener('keydown', onKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
        }
    }, [activeIndex, close, showPrev, showNext])

    return (
        <>
            {/* Liste : 4 colonnes en flex-wrap */}
            <div className="flex w-full flex-wrap gap-5 py-8">
                {images.map((image, n) => (
                    <div
                        key={image.src}
                        className="group relative h-[420px] w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
                    >
                        <button
                            type="button"
                            onClick={() => setActiveIndex(n)}
                            aria-label={`Agrandir : ${image.alt}`}
                            className="relative h-full w-full cursor-zoom-in overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-black/10 transition hover:scale-[1.02]"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                        </button>
                        {image.quoteSlug && quotePoolOfCVs && (
                            <Link
                                href={{ pathname: '/devis', query: { type: image.quoteSlug } }}
                                aria-label={`${quotePoolOfCVs} : ${image.alt}`}
                                className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-white opacity-0 shadow-lg transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
                            >
                                {quotePoolOfCVs}
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {activeIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        onClick={close}
                        aria-label="Fermer"
                        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    >
                        ✕
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            showPrev()
                        }}
                        aria-label="Précédent"
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    >
                        ←
                    </button>

                    <div
                        className="relative h-[85vh] w-full max-w-4xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[activeIndex].src}
                            alt={images[activeIndex].alt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            showNext()
                        }}
                        aria-label="Suivant"
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    >
                        →
                    </button>
                </div>
            )}
        </>
    )
}