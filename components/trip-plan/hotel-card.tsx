import Image from "next/image"
import { Star } from "lucide-react"
import type { Hotel } from "./data"

export function HotelCard({ hotel, currency }: { hotel: Hotel; currency: string }) {
  return (
    <article className="flex w-56 shrink-0 flex-col overflow-hidden rounded-3xl border border-border bg-background">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={hotel.image || "/placeholder.svg"}
          alt={hotel.name}
          fill
          sizes="224px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1 text-secondary">
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          <span className="text-xs font-semibold text-foreground">{hotel.stars.toFixed(1)}</span>
        </div>
        <h4 className="font-medium leading-snug text-foreground text-pretty">{hotel.name}</h4>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {currency}
            {hotel.pricePerNight}
          </span>{" "}
          / night
        </p>
        <button
          type="button"
          className="mt-auto rounded-full border border-primary py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Select
        </button>
      </div>
    </article>
  )
}
