"use client"

import { Leaf, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Chip, DatePicker } from "../controls"
import { durationOptions, interestOptions, type Pace, type SurveyData } from "../data"

const paceOptions: { id: Pace; label: string; icon: LucideIcon; blurb: string }[] = [
  { id: "fast", label: "Pack it all in", icon: Zap, blurb: "See as much as possible, dawn to dusk" },
  { id: "slow", label: "Take it slow", icon: Leaf, blurb: "Fewer stops, more time to soak it in" },
]

export function StepPace({
  data,
  update,
}: {
  data: SurveyData
  update: (patch: Partial<SurveyData>) => void
}) {
  function toggleInterest(interest: string) {
    update({
      interests: data.interests.includes(interest)
        ? data.interests.filter((i) => i !== interest)
        : [...data.interests, interest],
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-3xl font-semibold text-foreground text-balance">
        How do you like to explore?
      </h1>

      <div className="flex flex-col gap-3">
        {paceOptions.map((option) => {
          const Icon = option.icon
          const active = data.pace === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => update({ pace: option.id })}
              aria-pressed={active}
              className={cn(
                "flex items-center gap-4 rounded-xl border p-4 text-left transition-colors",
                active ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40",
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="font-serif text-lg font-semibold text-foreground">{option.label}</span>
                <span className="text-sm text-muted-foreground text-pretty">{option.blurb}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-xl font-semibold text-foreground">What interests you?</h2>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((interest) => (
            <Chip key={interest} selected={data.interests.includes(interest)} onClick={() => toggleInterest(interest)}>
              {interest}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-xl font-semibold text-foreground">When do you arrive?</h2>
        <DatePicker value={data.arrivalDate} onChange={(v) => update({ arrivalDate: v })} />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-xl font-semibold text-foreground">How long?</h2>
        <div className="flex flex-wrap gap-2">
          {durationOptions.map((duration) => (
            <Chip
              key={duration}
              selected={data.duration === duration}
              onClick={() => update({ duration })}
            >
              {duration}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}
