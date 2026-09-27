'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import CarouselWithTrigger from './carousel-trigger'

type GalleryImage = {
  src: string
  alt: string
}

type ImageLightboxCarouselProps = {
  images: GalleryImage[]
}

export default function ImageLightboxCarousel({ images }: ImageLightboxCarouselProps) {
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
            <CarouselWithTrigger
                slides={images.map((image, index) => (
                    <button
                        key={image.src}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className="relative h-[420px] w-full cursor-zoom-in overflow-hidden rounded-[2rem] border border-gray-200"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    </button>
                ))}
            />

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