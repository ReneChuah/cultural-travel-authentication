import { Landmark, Utensils, Camera, TreePine, Mountain, Coffee, Palette, type LucideIcon } from "lucide-react"
import type { ActivityIcon } from "@/components/trip-plan/data"
import type { ItineraryCard } from "./data"

const iconMap: Record<ActivityIcon, LucideIcon> = {
  landmark: Landmark,
  food: Utensils,
  camera: Camera,
  nature: TreePine,
  view: Mountain,
  tea: Coffee,
  craft: Palette,
}

export function InlineItinerary({ card }: { card: ItineraryCard }) {
  return (
    <div className="mt-2 overflow-hidden rounded-3xl border border-border bg-card">
      <div className="border-b border-border bg-accent/60 px-4 py-3">
        <p className="font-serif text-base font-semibold text-foreground">{card.title}</p>
        <p className="text-xs text-muted-foreground">{card.subtitle}</p>
      </div>
      <ul className="flex flex-col px-4 py-3">
        {card.lines.map((line, i) => {
          const Icon = iconMap[line.icon]
          const isLast = i === card.lines.length - 1
          return (
            <li key={line.time} className="relative flex gap-3">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-secondary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {!isLast && <span className="mt-1 w-px grow bg-border" aria-hidden="true" />}
              </div>
              <div className={isLast ? "min-w-0 flex-1" : "min-w-0 flex-1 pb-4"}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{line.time}</p>
                <p className="mt-0.5 text-sm font-medium leading-snug text-foreground text-pretty">{line.name}</p>
                {line.note && (
                  <span className="mt-1 inline-block rounded-full bg-secondary/10 px-2 py-0.5 text-[11px] font-semibold text-secondary">
                    {line.note}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
