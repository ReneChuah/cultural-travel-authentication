"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Gauge,
  MapPin,
  Plane,
  Star,
  UserCheck,
  Users,
} from "lucide-react"
import { tripPlan } from "@/components/trip-plan/data"

const NIGHTS = 2
const TRAVELERS = 2
const DATES = "12 – 14 Apr 2026"

type Flight = {
  id: string
  direction: "Outbound" | "Return"
  airline: string
  route: string
  depart: string
  arrive: string
  price: number
}

const flights: Flight[] = [
  {
    id: "out",
    direction: "Outbound",
    airline: "Malaysia Airlines",
    route: "KUL → KIX",
    depart: "09:20",
    arrive: "17:05",
    price: 1850,
  },
  {
    id: "ret",
    direction: "Return",
    airline: "Japan Airlines",
    route: "KIX → KUL",
    depart: "11:40",
    arrive: "18:15",
    price: 1780,
  },
]

function money(currency: string, amount: number) {
  return `${currency}${amount.toLocaleString()}`
}

export function BookingSummaryClient() {
  const router = useRouter()
  const { currency, destination, guideRequested, days } = tripPlan
  const hotel = tripPlan.hotels[0]
  const guide = tripPlan.guide

  const flightsTotal = flights.reduce((sum, f) => sum + f.price, 0)
  const hotelTotal = hotel.pricePerNight * NIGHTS
  const guideTotal = guideRequested ? guide.pricePerDay * days.length : 0
  const activitiesTotal = days.reduce(
    (sum, d) => sum + d.activities.reduce((s, a) => s + a.cost, 0),
    0,
  )
  const total = flightsTotal + hotelTotal + guideTotal + activitiesTotal

  const [card, setCard] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [name, setName] = useState("")

  function handleCard(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    setCard(digits.replace(/(.{4})/g, "$1 ").trim())
  }

  function handleExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/confirmation")
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="relative mx-auto flex max-w-lg items-center justify-center px-5 py-4">
          <Link
            href="/trip-plan"
            aria-label="Go back to trip plan"
            className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Confirm your trip</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-5 pb-40 pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Trip summary */}
          <section className="overflow-hidden rounded-3xl border border-border bg-accent/50">
            <div className="relative h-32 w-full">
              <Image
                src={days[0].cover || "/placeholder.svg"}
                alt={`${destination} trip`}
                fill
                sizes="(max-width: 512px) 100vw, 512px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-background">
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {destination}, Japan
                </div>
                <p className="text-xs opacity-90">{DATES}</p>
              </div>
            </div>
            <dl className="grid grid-cols-3 divide-x divide-border border-t border-border">
              <SummaryStat icon={<CalendarDays className="h-4 w-4" />} label="Duration" value={`${days.length} days`} />
              <SummaryStat icon={<Clock3 className="h-4 w-4" />} label="Nights" value={`${NIGHTS} nights`} />
              <SummaryStat icon={<Users className="h-4 w-4" />} label="Travelers" value={`${TRAVELERS}`} />
            </dl>
            <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
              <StylePill icon={<Gauge className="h-3.5 w-3.5" />} label="Relaxed pace" />
              <StylePill
                icon={<UserCheck className="h-3.5 w-3.5" />}
                label={guideRequested ? "Guide included" : "No guide"}
              />
            </div>
          </section>

          {/* Flights */}
          <Section title="Flights" trailing={money(currency, flightsTotal)}>
            <div className="overflow-hidden rounded-3xl border border-border bg-background">
              {flights.map((f, i) => (
                <div
                  key={f.id}
                  className={i > 0 ? "border-t border-border/70 p-4" : "p-4"}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <Plane
                        className={`h-3.5 w-3.5 ${f.direction === "Return" ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                      {f.direction}
                    </span>
                    <span className="font-semibold text-foreground">{money(currency, f.price)}</span>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <div>
                      <p className="font-medium text-foreground">{f.airline}</p>
                      <p className="text-sm text-muted-foreground">{f.route}</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {f.depart} <span className="text-muted-foreground">→</span> {f.arrive}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Stay */}
          <Section title="Stay" trailing={money(currency, hotelTotal)}>
            <article className="flex gap-4 rounded-3xl border border-border bg-background p-3">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={hotel.image || "/placeholder.svg"}
                  alt={hotel.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-1 text-secondary">
                  <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  <span className="text-xs font-semibold text-foreground">{hotel.stars.toFixed(1)}</span>
                </div>
                <h3 className="mt-0.5 font-medium leading-snug text-foreground text-pretty">{hotel.name}</h3>
                <p className="text-sm text-muted-foreground">{DATES}</p>
                <p className="mt-auto text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{money(currency, hotel.pricePerNight)}</span> / night
                  <span className="px-1.5 text-border">|</span>
                  {NIGHTS} nights
                </p>
              </div>
            </article>
          </Section>

          {/* Guide */}
          {guideRequested && (
            <Section title="Your guide" trailing={money(currency, guideTotal)}>
              <article className="flex items-center gap-4 rounded-3xl border border-border bg-accent/60 p-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image src={guide.avatar || "/placeholder.svg"} alt={guide.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{guide.name}</h3>
                    <span className="inline-flex items-center gap-1 text-secondary">
                      <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      <span className="text-xs font-semibold text-foreground">{guide.stars.toFixed(1)}</span>
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{guide.bio}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{money(currency, guide.pricePerDay)}</span> / day
                    <span className="px-1.5 text-border">|</span>
                    {days.length} days
                  </p>
                </div>
              </article>
            </Section>
          )}

          {/* Price breakdown */}
          <Section title="Price breakdown">
            <div className="rounded-3xl border border-border bg-background p-5">
              <dl className="flex flex-col gap-3">
                <LineItem label="Flights (2 travelers)" value={money(currency, flightsTotal)} />
                <LineItem label={`Hotel · ${NIGHTS} nights`} value={money(currency, hotelTotal)} />
                {guideRequested && <LineItem label={`Guide · ${days.length} days`} value={money(currency, guideTotal)} />}
                <LineItem label="Activities estimate" value={money(currency, activitiesTotal)} />
              </dl>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-base font-semibold text-foreground">Total</span>
                <span className="text-xl font-semibold text-primary">{money(currency, total)}</span>
              </div>
            </div>
          </Section>

          {/* Payment */}
          <Section title="Payment details">
            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-background p-5">
              <Field label="Card number" htmlFor="card">
                <input
                  id="card"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  value={card}
                  onChange={(e) => handleCard(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" htmlFor="expiry">
                  <input
                    id="expiry"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => handleExpiry(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </Field>
                <Field label="CVV" htmlFor="cvv">
                  <input
                    id="cvv"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </Field>
              </div>
              <Field label="Cardholder name" htmlFor="name">
                <input
                  id="name"
                  autoComplete="cc-name"
                  placeholder="As shown on card"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </Field>
              <p className="text-xs text-muted-foreground">
                This is a demo — no real payment will be processed.
              </p>
            </div>
          </Section>

          <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/90 backdrop-blur">
            <div className="mx-auto max-w-lg px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Confirm and book
                <span className="font-normal text-primary-foreground/80">·</span>
                {money(currency, total)}
              </button>
            </div>
          </footer>
        </form>
      </main>
    </div>
  )
}

function SummaryStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-2 py-4 text-center">
      <span className="text-primary" aria-hidden="true">
        {icon}
      </span>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold text-foreground">{value}</dd>
    </div>
  )
}

function StylePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
      <span className="text-secondary" aria-hidden="true">
        {icon}
      </span>
      {label}
    </span>
  )
}

function Section({
  title,
  trailing,
  children,
}: {
  title: string
  trailing?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {trailing && <span className="text-sm font-medium text-muted-foreground">{trailing}</span>}
      </div>
      {children}
    </section>
  )
}

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}
