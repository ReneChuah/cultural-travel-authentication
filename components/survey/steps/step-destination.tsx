"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ChevronRight, MapPin, Navigation, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { countries, extraCountries, type Country, type SurveyData } from "../data"

export function StepDestination({
  data,
  update,
}: {
  data: SurveyData
  update: (patch: Partial<SurveyData>) => void
}) {
  const [query, setQuery] = useState("")
  const [regionQuery, setRegionQuery] = useState("")
  const [showMore, setShowMore] = useState(false)

  const list = useMemo(() => (showMore ? [...countries, ...extraCountries] : countries), [showMore])
  const selected: Country | undefined = list.find((c) => c.id === data.destinationCountry) ??
    [...countries, ...extraCountries].find((c) => c.id === data.destinationCountry)

  if (selected) {
    const regions = selected.regions.filter((r) =>
      r.toLowerCase().includes(regionQuery.trim().toLowerCase()),
    )
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => {
              update({ destinationCountry: null, destinationRegion: null })
              setRegionQuery("")
            }}
            className="self-start text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Change country
          </button>
          <h1 className="font-serif text-3xl font-semibold text-foreground text-balance">
            Where in {selected.name}?
          </h1>
          <p className="text-sm text-muted-foreground">Pick a region, or start from where you are now.</p>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            value={regionQuery}
            onChange={(e) => setRegionQuery(e.target.value)}
            placeholder="Search regions"
            aria-label="Search regions"
            className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => update({ destinationRegion: "Current location" })}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors",
              data.destinationRegion === "Current location"
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/40",
            )}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Navigation className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-foreground">Use my current location</span>
          </button>

          {regions.map((region) => {
            const active = data.destinationRegion === region
            return (
              <button
                key={region}
                type="button"
                onClick={() => update({ destinationRegion: region })}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-colors",
                  active ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40",
                )}
              >
                <span className="text-sm font-medium text-foreground">{region}</span>
                <ChevronRight
                  className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")}
                  aria-hidden="true"
                />
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const filtered = list.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-serif text-3xl font-semibold text-foreground text-balance">Where to?</h1>

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a country"
          aria-label="Search a country"
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((country) => (
          <button
            key={country.id}
            type="button"
            onClick={() => update({ destinationCountry: country.id, destinationRegion: null })}
            className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border"
          >
            <Image
              src={country.image || "/placeholder.svg"}
              alt={country.name}
              fill
              sizes="(max-width: 640px) 45vw, 220px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
            <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-3 text-left">
              <MapPin className="h-4 w-4 shrink-0 text-primary-foreground" aria-hidden="true" />
              <span className="font-serif text-base font-semibold leading-tight text-primary-foreground text-balance">
                {country.name}
              </span>
            </span>
          </button>
        ))}
      </div>

      {!showMore && (
        <button
          type="button"
          onClick={() => setShowMore(true)}
          className="w-full rounded-xl border border-border bg-card py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
        >
          More countries
        </button>
      )}

      <button
        type="button"
        className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
      >
        <MapPin className="h-4 w-4" aria-hidden="true" />
        Pin my destination on a map instead
      </button>
    </div>
  )
}
