"use client"

import { useState } from "react"
import { BedDouble, Wallet } from "lucide-react"
import { tripPlan, dayTotal, type Activity } from "@/components/trip-plan/data"
import { TimelineItem } from "@/components/trip-plan/timeline-item"
import { BudgetSummary } from "./budget-summary"
import { BookedHotelCard, BookedGuideCard } from "./booked-cards"
import { AiBubble } from "./ai-bubble"
import { MapModal } from "./map-modal"
import { TripsSubNav } from "@/components/my-trips/trips-sub-nav"
import { BottomNav } from "@/components/home/bottom-nav"
import { useTripSelection } from "@/components/trip-selection"
import { cn } from "@/lib/utils"
import { loadGeneratedTripPlan } from "@/components/generated-trip-plan"

const dayDates = ["12 Apr", "13 Apr", "14 Apr"]

export function MyTripPlanClient() {
  const [activeDay, setActiveDay] = useState(0)
  const [mapActivity, setMapActivity] = useState<Activity | null>(null)
  const selection = useTripSelection()
  const plan = loadGeneratedTripPlan() ?? tripPlan
  const { currency, days, hotels, guide, guideRequested } = plan
  const day = days[activeDay] 
  const confirmedHotel = hotels.find((h) => h.id === plan.selectedHotelId) ?? hotels[0]

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-5 py-4 backdrop-blur">
        <h1 className="font-serif text-xl font-semibold text-foreground">My trip plan</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {selection.destinationName} · 12 – 14 Apr 2026
        </p>
        <div className="mt-3">
          <TripsSubNav active="plan" />
        </div>
      </header>

      <main className="flex flex-col gap-6 px-5 pb-40 pt-5">
        <BudgetSummary currency={currency} />

        <div>
          <div
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1"
            role="tablist"
            aria-label="Select a day"
          >
            {days.map((d, i) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={i === activeDay}
                onClick={() => setActiveDay(i)}
                className={cn(
                  "flex shrink-0 flex-col items-start rounded-2xl border px-4 py-2.5 text-left transition-colors",
                  i === activeDay
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40",
                )}
              >
                <span className="text-sm font-semibold">{d.label}</span>
                <span
                  className={cn(
                    "text-xs",
                    i === activeDay ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {dayDates[i]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <section aria-label={`${day.label} itinerary`} className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{day.label}</p>
            <h2 className="font-serif text-2xl font-semibold text-foreground text-balance">{day.theme}</h2>
          </div>

          <ol>
            {day.activities.map((activity, i) => (
              <TimelineItem
                key={activity.id}
                activity={activity}
                currency={currency}
                isLast={i === day.activities.length - 1}
                onThumbClick={() => setMapActivity(activity)}
              />
            ))}
          </ol>

          <div className="flex items-center justify-between rounded-2xl bg-secondary/10 px-4 py-3">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <Wallet className="h-4 w-4 text-secondary" aria-hidden="true" />
              Estimated spend
            </span>
            <span className="font-serif text-lg font-semibold text-foreground">
              {currency}
              {dayTotal(day)}
            </span>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <BedDouble className="h-4 w-4 text-secondary" aria-hidden="true" />
              Your stay
            </h3>
            <BookedHotelCard hotel={confirmedHotel} currency={currency} />
          </div>

          {guideRequested && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Your local guide</h3>
              <BookedGuideCard guide={guide} currency={currency} />
            </div>
          )}
        </section>
      </main>

      {/* Draggable AI bubble — tap to open chat, drag to reposition */}
      <AiBubble />

      {mapActivity && (
        <MapModal
          name={mapActivity.name}
          lat={mapActivity.lat}
          lng={mapActivity.lng}
          onClose={() => setMapActivity(null)}
        />
      )}

      <BottomNav active="trips" />
    </div>
  )
}
