import Image from "next/image"
import { AlertTriangle, Wallet } from "lucide-react"
import type { Guide, Hotel, TripDay } from "./data"
import { dayTotal } from "./data"
import { TimelineItem } from "./timeline-item"
import { HotelCard } from "./hotel-card"
import { GuideCard } from "./guide-card"

export function DayCard({
  day,
  hotels,
  guide,
  guideRequested,
  currency,
}: {
  day: TripDay
  hotels: Hotel[]
  guide: Guide
  guideRequested: boolean
  currency: string
}) {
  const total = dayTotal(day)

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-4xl border border-border bg-card">
      <div className="relative h-44 w-full shrink-0">
        <Image
          src={day.cover || "/placeholder.svg"}
          alt={`${day.theme} in ${day.label}`}
          fill
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">{day.label}</p>
          <h2 className="font-serif text-2xl font-semibold text-primary-foreground text-balance">{day.theme}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="flex flex-col gap-5 p-5">
          <ol className="mt-1">
            {day.activities.map((activity, i) => (
              <TimelineItem
                key={activity.id}
                activity={activity}
                currency={currency}
                isLast={i === day.activities.length - 1}
              />
            ))}
          </ol>

          <div className="flex items-center justify-between rounded-2xl bg-secondary/10 px-4 py-3">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <Wallet className="h-4 w-4 text-secondary" aria-hidden="true" />
              Today&apos;s estimated spend
            </span>
            <span className="font-serif text-lg font-semibold text-foreground">
              {currency}
              {total}
            </span>
          </div>

          {day.warning && (
            <button
              type="button"
              className="flex w-full items-start gap-3 rounded-2xl border border-secondary/40 bg-secondary/10 p-4 text-left transition-colors hover:bg-secondary/20"
            >
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-foreground text-pretty">{day.warning}</span>
            </button>
          )}

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Where to stay</h3>
            <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} currency={currency} />
              ))}
            </div>
          </div>

          {guideRequested && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Your local guide</h3>
              <GuideCard guide={guide} currency={currency} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
