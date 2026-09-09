import Image from "next/image"
import { Star, Check } from "lucide-react"
import type { Hotel } from "./data"

export function HotelCard({
  hotel,
  currency,
  selected,
  onSelect,
}: {
  hotel: Hotel
  currency: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <article
      className={`flex w-56 shrink-0 flex-col overflow-hidden rounded-3xl border bg-background transition-colors ${
        selected ? "border-primary ring-2 ring-primary/30" : "border-border"
      }`}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill sizes="224px" className="object-cover" />
        {selected && (
          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1 text-secondary">
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          <span className="text-xs font-semibold text-foreground">{hotel.stars.toFixed(1)}</span>
        </div>
        <h4 className="font-medium leading-snug text-foreground text-pretty">{hotel.name}</h4>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{currency}{hotel.pricePerNight}</span> / night
        </p>
        <button
          type="button"
          onClick={onSelect}
          className={`mt-auto rounded-full border py-2 text-sm font-semibold transition-colors ${
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {selected ? "Selected" : "Select"}
        </button>
      </div>
    </article>
  )
}