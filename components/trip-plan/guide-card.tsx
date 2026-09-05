import Image from "next/image"
import { Star } from "lucide-react"
import type { Guide } from "./data"

export function GuideCard({ guide, currency }: { guide: Guide; currency: string }) {
  return (
    <section className="flex items-center gap-4 rounded-3xl border border-border bg-accent/60 p-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
        <Image src={guide.avatar || "/placeholder.svg"} alt={guide.name} fill sizes="64px" className="object-cover" />
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
        <p className="mt-1 text-sm font-semibold text-foreground">
          {currency}
          {guide.pricePerDay} <span className="font-normal text-muted-foreground">/ day</span>
        </p>
      </div>

      <button
        type="button"
        className="shrink-0 self-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
      >
        View profile
      </button>
    </section>
  )
}
