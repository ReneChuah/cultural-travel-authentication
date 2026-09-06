import Image from "next/image"
import { MapPin, CalendarDays } from "lucide-react"
import type { Festival } from "./data"

export function FestivalCard({ festival }: { festival: Festival }) {
  return (
    <article className="flex gap-4 overflow-hidden rounded-4xl border border-border bg-card p-3">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl">
        <Image
          src={festival.image || "/placeholder.svg"}
          alt={`${festival.name}, ${festival.location}`}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1.5">
        <h3 className="font-serif text-lg font-semibold leading-snug text-foreground text-balance">
          {festival.name}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          {festival.location}
        </p>
        <p className="flex items-center gap-1.5 text-sm font-medium text-secondary">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {festival.dates}
        </p>
      </div>
    </article>
  )
}
