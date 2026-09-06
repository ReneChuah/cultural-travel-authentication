"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

type Slide = {
  id: string
  image: string
  headline: string
  href: string
}

const slides: Slide[] = [
  {
    id: "jaipur",
    image: "/banners/lantern.png",
    headline: "Diwali in Jaipur: lantern-lit palaces",
    href: "/survey?package=jaipur",
  },
  {
    id: "rio",
    image: "/banners/carnival.png",
    headline: "Post-Carnival Rio: beaches half empty",
    href: "/survey?package=rio",
  },
  {
    id: "kyoto",
    image: "/banners/temple.png",
    headline: "Kyoto temple festivals, half price",
    href: "/survey?package=kyoto",
  },
  {
    id: "paris",
    image: "/banners/market.png",
    headline: "Autumn markets across France",
    href: "/survey?package=paris",
  },
]

export function BannerCarousel() {
  const router = useRouter()
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const goTo = useCallback((index: number) => {
    const next = (index + slides.length) % slides.length
    setActive(next)
  }, [])

  // Auto-advance every 4.5s, paused while the tab is hidden
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // Keep the scroll position in sync with the active index
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const child = track.children[active] as HTMLElement | undefined
    if (child) {
      track.scrollTo({ left: child.offsetLeft, behavior: "smooth" })
    }
  }, [active])

  // Sync active dot when the user swipes manually
  function handleScroll() {
    const track = trackRef.current
    if (!track) return
    const index = Math.round(track.scrollLeft / track.clientWidth)
    if (index !== active) setActive(index)
  }

  return (
    <section aria-label="Featured trips" className="mx-auto mt-4 max-w-lg px-5">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={() => {
          isDragging.current = false
        }}
        onPointerMove={() => {
          isDragging.current = true
        }}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => {
              if (!isDragging.current) router.push(slide.href)
            }}
            className="relative aspect-[16/9] w-full shrink-0 snap-center overflow-hidden rounded-4xl border border-border text-left"
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.headline}
              fill
              sizes="(max-width: 640px) 100vw, 480px"
              className="object-cover"
              priority={slide.id === slides[0].id}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 font-serif text-lg font-semibold leading-snug text-background text-balance">
              {slide.headline}
            </h3>
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2" role="tablist" aria-label="Slide indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === active ? "w-6 bg-primary" : "w-2 bg-border",
            )}
          />
        ))}
      </div>
    </section>
  )
}
