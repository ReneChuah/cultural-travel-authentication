"use client"

import { Baby, Heart, User, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Stepper } from "../controls"
import type { Party, SurveyData, TravelerCounts } from "../data"

const options: { id: Party; label: string; icon: LucideIcon; blurb: string }[] = [
  { id: "solo", label: "Solo", icon: User, blurb: "Just me" },
  { id: "couple", label: "Couple", icon: Heart, blurb: "Two of us" },
  { id: "friends", label: "Friends", icon: Users, blurb: "A group" },
  { id: "family", label: "Family", icon: Baby, blurb: "With kids or elders" },
]

const defaults: Record<Party, TravelerCounts> = {
  solo: { adults: 1, children: 0, elderly: 0 },
  couple: { adults: 2, children: 0, elderly: 0 },
  friends: { adults: 2, children: 0, elderly: 0 },
  family: { adults: 2, children: 1, elderly: 0 },
}

export function StepTravelers({
  data,
  update,
}: {
  data: SurveyData
  update: (patch: Partial<SurveyData>) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-semibold text-foreground text-balance">Who&apos;s traveling?</h1>
        <p className="text-sm text-muted-foreground">We tailor pacing and logistics around your group.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const Icon = option.icon
          const active = data.party === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => update({ party: option.id, counts: defaults[option.id] })}
              aria-pressed={active}
              className={cn(
                "flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                active ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40",
              )}
            >
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full",
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="font-serif text-lg font-semibold text-foreground">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.blurb}</span>
              </span>
            </button>
          )
        })}
      </div>

      {data.party && data.party !== "solo" && (
        <div className="flex flex-col gap-2.5">
          <p className="text-sm font-semibold text-foreground">How many, exactly?</p>
          <Stepper
            label="Adults"
            value={data.counts.adults}
            min={1}
            onChange={(v) => update({ counts: { ...data.counts, adults: v } })}
          />
          <Stepper
            label="Children"
            value={data.counts.children}
            onChange={(v) => update({ counts: { ...data.counts, children: v } })}
          />
          <Stepper
            label="Elderly"
            value={data.counts.elderly}
            onChange={(v) => update({ counts: { ...data.counts, elderly: v } })}
          />
        </div>
      )}
    </div>
  )
}
