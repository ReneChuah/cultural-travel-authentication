import Image from "next/image"
import { Landmark, Utensils, Camera, TreePine, Mountain, Coffee, Palette, type LucideIcon } from "lucide-react"
import type { Activity, ActivityIcon } from "./data"

const iconMap: Record<ActivityIcon, LucideIcon> = {
  landmark: Landmark,
  food: Utensils,
  camera: Camera,
  nature: TreePine,
  view: Mountain,
  tea: Coffee,
  craft: Palette,
}

export function TimelineItem({
  activity,
  currency,
  isLast,
  onThumbClick,
}: {
  activity: Activity
  currency: string
  isLast: boolean
  onThumbClick?: () => void
}) {
  const Icon = iconMap[activity.icon]

  return (
    <li className="relative flex gap-4 pl-1">
      <div className="flex flex-col items-center">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-secondary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {!isLast && <span className="mt-1 w-px grow bg-border" aria-hidden="true" />}
      </div>

      <div className="flex flex-1 items-center gap-3 pb-7">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{activity.time}</p>
          <p className="mt-0.5 font-medium leading-snug text-foreground text-pretty">{activity.name}</p>
        </div>

        {onThumbClick ? (
          <button
            type="button"
            onClick={onThumbClick}
            aria-label={`View ${activity.name} on the map`}
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl outline-none ring-offset-2 ring-offset-card transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary active:scale-95"
          >
            <Image
              src={activity.thumb || "/placeholder.svg"}
              alt={activity.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </button>
        ) : (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={activity.thumb || "/placeholder.svg"}
              alt={activity.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        )}

        <span className="shrink-0 rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
          {activity.cost === 0 ? "Free" : `~${currency}${activity.cost}`}
        </span>
      </div>
    </li>
  )
}
