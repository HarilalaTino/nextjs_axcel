'use client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'

type GalleryImage = {
    src: string
    alt: string
}

type ImageLightboxCarouselProps = {
    images: GalleryImage[]
}

export default function ImageLightboxCarousel({ images }: ImageLightboxCarouselProps) {
    // ---- Carousel ----
    const [index, setIndex] = useState(0)
    const [offset, setOffset] = useState(0)
    const [dragX, setDragX] = useState(0)
    const [dragging, setDragging] = useState(false)

    const viewportRef = useRef<HTMLDivElement>(null)
    const slideRefs = useRef<(HTMLDivElement | null)[]>([])
    const drag = useRef({ startX: 0, moved: false })

    const goTo = useCallback(
        (n: number) => setIndex(Math.max(0, Math.min(images.length - 1, n))),
        [images.length]
    )

    const measure = useCallback(() => {
        const vp = viewportRef.current
        const slide = slideRefs.current[index]
        const first = slideRefs.current[0]
        const last = slideRefs.current[images.length - 1]
        if (!vp || !slide || !first || !last) return

        const vpWidth = vp.clientWidth
        const pad = first.offsetLeft 
        const contentWidth = last.offsetLeft + last.offsetWidth + pad

        if (contentWidth <= vpWidth) {
            setOffset((vpWidth - contentWidth) / 2)
            return
        }

        const centered = vpWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2)
        const min = vpWidth - contentWidth
        setOffset(Math.max(min, Math.min(0, centered)))
    }, [index, images.length])

    useLayoutEffect(() => {
        measure()
    }, [measure])

    useEffect(() => {
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [measure])

    const onPointerDown = (e: React.PointerEvent) => {
        drag.current = { startX: e.clientX, moved: false }
        setDragging(true)
    }
    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragging) return
        const dx = e.clientX - drag.current.startX
        if (Math.abs(dx) > 6) drag.current.moved = true
        setDragX(dx)
    }
    const endDrag = () => {
        if (!dragging) return
        if (dragX < -50) goTo(index + 1)
        else if (dragX > 50) goTo(index - 1)
        setDragX(0)
        setDragging(false)
    }

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const close = useCallback(() => setActiveIndex(null), [])
    const showPrev = useCallback(() => {
        setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
        setIndex((i) => (i - 1 + images.length) % images.length)
    }, [images.length])
    const showNext = useCallback(() => {
        setActiveIndex((i) => (i === null ? null : (i + 1) % images.length))
        setIndex((i) => (i + 1) % images.length)
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
            <div className="relative w-full">
                <div
                    ref={viewportRef}
                    className="touch-pan-y select-none overflow-hidden py-8"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerLeave={endDrag}
                    onPointerCancel={endDrag}
                >
                    <div
                        className={`flex gap-5 px-4 will-change-transform md:px-16 ${
                            dragging ? '' : 'transition-transform duration-500 ease-out'
                        }`}
                        style={{ transform: `translateX(${offset + dragX}px)` }}
                    >
                        {images.map((image, n) => {
                            const isActive = n === index
                            return (
                                <div
                                    key={image.src}
                                    ref={(el) => {
                                        slideRefs.current[n] = el
                                    }}
                                    className={`h-[420px] w-[72vw] max-w-[320px] shrink-0 transition-all duration-500 ease-out ${
                                        isActive
                                            ? 'scale-100 opacity-100'
                                            : 'scale-90 opacity-50 saturate-75'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (drag.current.moved) return
                                            if (isActive) setActiveIndex(n)
                                            else goTo(n)
                                        }}
                                        aria-label={isActive ? `Agrandir : ${image.alt}` : image.alt}
                                        className={`relative h-full w-full overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-black/10 ${
                                            isActive ? 'cursor-zoom-in' : 'cursor-pointer'
                                        }`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            draggable={false}
                                            className="object-contain"
                                            sizes="(max-width: 640px) 72vw, 320px"
                                        />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Flèches */}
                <button
                    type="button"
                    onClick={() => goTo(index - 1)}
                    disabled={index === 0}
                    aria-label="Précédent"
                    className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition hover:scale-105 hover:bg-red-600 hover:text-white disabled:pointer-events-none disabled:opacity-30 md:left-6"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    disabled={index === images.length - 1}
                    aria-label="Suivant"
                    className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition hover:scale-105 hover:bg-red-600 hover:text-white disabled:pointer-events-none disabled:opacity-30 md:right-6"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                {/* Pagination */}
                <div className="mt-1 flex justify-center gap-2">
                    {images.map((image, n) => (
                        <button
                            key={image.src}
                            type="button"
                            onClick={() => goTo(n)}
                            aria-label={`Aller au slide ${n + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                n === index ? 'w-7 bg-red-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            </div>

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
