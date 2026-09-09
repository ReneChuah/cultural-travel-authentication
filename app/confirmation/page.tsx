"use client"

import Link from "next/link"
import { Check, CalendarDays, MapPin, Ticket } from "lucide-react"
import { useTripSelection, formatTripDates } from "@/components/trip-selection"

const BOOKING_REF = "TRV-48291"

export default function ConfirmationPage() {
  const selection = useTripSelection()
  const destination = selection.regionName
    ? `${selection.regionName}, ${selection.destinationName}`
    : selection.destinationName
  const dates = formatTripDates(selection)

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/12">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <Check className="h-7 w-7 text-primary-foreground" strokeWidth={3} aria-hidden="true" />
          </div>
        </div>

        <h1 className="mt-7 font-serif text-3xl font-semibold text-foreground text-balance">
          You&apos;re all set!
        </h1>
        <p className="mt-2 text-muted-foreground text-pretty">
          Your trip to {destination} is booked
        </p>

        <section
          aria-label="Booking summary"
          className="mt-8 w-full overflow-hidden rounded-3xl border border-border bg-accent/50"
        >
          <dl className="divide-y divide-border">
            <SummaryRow icon={<MapPin className="h-4 w-4" aria-hidden="true" />} label="Destination" value={destination} />
            <SummaryRow icon={<CalendarDays className="h-4 w-4" aria-hidden="true" />} label="Dates" value={dates} />
            <SummaryRow icon={<Ticket className="h-4 w-4" aria-hidden="true" />} label="Booking ref" value={`#${BOOKING_REF}`} mono />
          </dl>
        </section>

        <div className="mt-8 flex w-full flex-col gap-3">
          <Link href="/my-trip-plan" className="flex w-full items-center justify-center rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            View my trip plan
          </Link>
          <Link href="/home" className="flex w-full items-center justify-center rounded-xl border border-border bg-background py-4 text-base font-semibold text-foreground transition-colors hover:border-primary/50">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}

function SummaryRow({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <dt className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </dt>
      <dd className={`text-sm font-semibold text-foreground ${mono ? "font-mono tracking-wide" : ""}`}>{value}</dd>
    </div>
  )
}
