import Image from "next/image"
import { Star, BedDouble, Check } from "lucide-react"
import type { Guide, Hotel } from "@/components/trip-plan/data"

export function BookedHotelCard({ hotel, currency }: { hotel: Hotel; currency: string }) {
  return (
    <article className="flex items-center gap-4 rounded-3xl border border-border bg-card p-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
        <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill sizes="80px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          <Check className="h-3 w-3" aria-hidden="true" />
          Booked
        </span>
        <h4 className="mt-1 truncate font-medium text-foreground">{hotel.name}</h4>
        <div className="mt-0.5 flex items-center gap-1 text-secondary">
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          <span className="text-xs font-semibold text-foreground">{hotel.stars.toFixed(1)}</span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-semibold text-foreground">
          {currency}
          {hotel.pricePerNight}
        </p>
        <p className="text-xs text-muted-foreground">/ night</p>
      </div>
    </article>
  )
}

export function BookedGuideCard({ guide, currency }: { guide: Guide; currency: string }) {
  return (
    <section className="flex items-center gap-4 rounded-3xl border border-border bg-accent/60 p-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
        <Image src={guide.avatar || "/placeholder.svg"} alt={guide.name} fill sizes="56px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-foreground">{guide.name}</h4>
          <span className="inline-flex items-center gap-1 text-secondary">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <span className="text-xs font-semibold text-foreground">{guide.stars.toFixed(1)}</span>
          </span>
        </div>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">{guide.bio}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-semibold text-foreground">
          {currency}
          {guide.pricePerDay}
        </p>
        <p className="text-xs text-muted-foreground">/ day</p>
      </div>
    </section>
  )
}
