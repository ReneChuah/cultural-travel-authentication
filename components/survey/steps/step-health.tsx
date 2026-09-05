"use client"

import { Chip, Collapsible } from "../controls"
import {
  buildTravelers,
  dietaryExclusive,
  dietaryTags,
  healthExclusive,
  healthTags,
  toggleWithExclusive,
  type SurveyData,
  type TravelerInfo,
} from "../data"

export function StepHealth({
  data,
  update,
}: {
  data: SurveyData
  update: (patch: Partial<SurveyData>) => void
}) {
  const travelers = buildTravelers(data.party, data.counts)

  function getTraveler(id: string): TravelerInfo {
    return data.travelers[id] ?? { tags: [], note: "" }
  }

  function setTraveler(id: string, next: TravelerInfo) {
    update({ travelers: { ...data.travelers, [id]: next } })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-semibold text-foreground text-balance">Physical &amp; health</h1>
        <p className="text-sm text-muted-foreground">
          Helps us set a realistic pace and pick accessible spots.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {travelers.map((traveler, index) => {
          const info = getTraveler(traveler.id)
          return (
            <Collapsible key={traveler.id} title={traveler.label} defaultOpen={index === 0}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {healthTags.map((tag) => (
                    <Chip
                      key={tag}
                      selected={info.tags.includes(tag)}
                      onClick={() =>
                        setTraveler(traveler.id, {
                          ...info,
                          tags: toggleWithExclusive(info.tags, tag, healthExclusive),
                        })
                      }
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
                <input
                  value={info.note}
                  onChange={(e) => setTraveler(traveler.id, { ...info, note: e.target.value })}
                  placeholder="Add a note (optional)"
                  aria-label={`Add a note for ${traveler.label}`}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            </Collapsible>
          )
        })}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-xl font-semibold text-foreground">Dietary needs</h2>
        <div className="flex flex-wrap gap-2">
          {dietaryTags.map((tag) => (
            <Chip
              key={tag}
              selected={data.dietary.includes(tag)}
              onClick={() => update({ dietary: toggleWithExclusive(data.dietary, tag, dietaryExclusive) })}
            >
              {tag}
            </Chip>
          ))}
        </div>
        <input
          value={data.dietaryNote}
          onChange={(e) => update({ dietaryNote: e.target.value })}
          placeholder="Other dietary needs (optional)"
          aria-label="Other dietary needs"
          className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-xl font-semibold text-foreground">Anything else we should know?</h2>
        <textarea
          value={data.otherNotes}
          onChange={(e) => update({ otherNotes: e.target.value })}
          rows={3}
          placeholder="Special limits, allergies, or requests"
          aria-label="Anything else we should know"
          className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
      </div>
    </div>
  )
}
