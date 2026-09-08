"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  MapPin,
  CalendarDays,
  Clock,
  Wallet,
  Plane,
  BedDouble,
  Ticket,
  Utensils,
} from "lucide-react"
import { cn } from "@/lib/utils"

const gallery = [
  { src: "/trip/act-fushimi.png", alt: "Fushimi Inari red torii gates" },
  { src: "/trip/act-kiyomizu.png", alt: "Kiyomizu-dera temple at golden hour" },
  { src: "/trip/act-bamboo.png", alt: "Arashiyama bamboo grove" },
  { src: "/trip/act-tea.png", alt: "Traditional tea ceremony" },
  { src: "/trip/act-pottery.png", alt: "Kiyomizu pottery workshop" },
]

const highlights = [
  { icon: Plane, text: "Round-trip flights included" },
  { icon: BedDouble, text: "3 nights in a 4-star machiya ryokan" },
  { icon: Ticket, text: "Gion Matsuri festival access pass" },
  { icon: Utensils, text: "Guided Nishiki Market food tour" },
]

const chips = [
  { icon: CalendarDays, label: "12 – 14 Apr 2026" },
  { icon: Clock, label: "3 days · 2 nights" },
  { icon: Wallet, label: "RM2,400 – 3,200" },
]

export function PackageDetailClient() {
  const router = useRouter()
  const [saved, setSaved] = useState(false)

  return (
    <div className="min-h-dvh bg-background pb-28">
      {/* Hero */}
      <div className="relative h-72 w-full sm:h-80">
        <Image
          src="/packages/kyoto.png"
          alt="Kyoto temple festivals"
          fill
          sizes="(max-width: 640px) 100vw, 640px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-foreground/20" />
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur transition-colors hover:bg-card"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <main className="mx-auto max-w-lg px-5">
        {/* Title + badge */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-serif text-2xl font-semibold leading-snug text-foreground text-balance">
              Kyoto temple festivals, half price
            </h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              Kyoto, Japan
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">
            Save 50%
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
          Trade the cherry-blossom crowds for lantern-lit temple festivals and quiet garden
          mornings. This curated escape pairs the Gion Matsuri celebrations with tea houses,
          hidden shrines, and discounted ryokan nights — a slower, richer side of Kyoto at
          its best value of the year.
        </p>

        {/* Quick info chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground"
            >
              <chip.icon className="h-4 w-4 text-secondary" aria-hidden="true" />
              {chip.label}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <section className="mt-8">
          <h2 className="font-serif text-lg font-semibold text-foreground">Highlights</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {highlights.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm text-foreground text-pretty">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Gallery */}
        <section className="mt-8">
          <h2 className="font-serif text-lg font-semibold text-foreground">Gallery</h2>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {gallery.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-3xl border border-border"
              >
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Pinned actions */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-5 py-4">
          <button
            type="button"
            onClick={() => setSaved((s) => !s)}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved" : "Save this package"}
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-colors",
              saved ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60",
            )}
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-all duration-300",
                saved ? "scale-110 fill-primary text-primary" : "scale-100 text-muted-foreground",
              )}
              aria-hidden="true"
            />
          </button>
          <Link
            href="/survey"
            className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  )
}
