'use client'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselWithTriggerProps = {
  slides: React.ReactNode[]
}

export default function CarouselWithTrigger({ slides }: CarouselWithTriggerProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        const syncInitialState = () => {
            onSelect(emblaApi)
        }

        queueMicrotask(syncInitialState)

        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)

        return () => {
            emblaApi.off('reInit', onSelect)
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <div className="relative">
            {/* Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex items-start  gap-4">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-1/2  lg:w-[337px] shrink-0 grow-0"
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>

            {/* Prev / Next — hors du viewport */}
            <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Précédent"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ChevronLeft />
            </button>
            <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Suivant"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ChevronRight />
            </button>
        </div>
    )
}