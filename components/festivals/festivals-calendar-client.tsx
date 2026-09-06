"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { festivals, months } from "./data"
import { FestivalCard } from "./festival-card"
import { cn } from "@/lib/utils"

type View = "month" | "all"

export function FestivalsCalendarClient() {
  const [view, setView] = useState<View>("month")
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth())

  const monthFestivals = festivals.filter((f) => f.month === activeMonth)

  return (
    <div className="min-h-svh bg-background pb-16">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Link
            href="/home"
            aria-label="Back to home"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="font-serif text-xl font-semibold text-foreground">Festivals &amp; events</h1>
        </div>

        <div className="mx-auto mt-4 flex max-w-lg gap-2 rounded-full border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => setView("month")}
            className={cn(
              "flex-1 rounded-full py-2 text-sm font-semibold transition-colors",
              view === "month" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            By month
          </button>
          <button
            type="button"
            onClick={() => setView("all")}
            className={cn(
              "flex-1 rounded-full py-2 text-sm font-semibold transition-colors",
              view === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            Explore all
          </button>
        </div>
      </header>

      {view === "month" && (
        <div
          className="mx-auto flex max-w-lg gap-2 overflow-x-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Select month"
        >
          {months.map((label, index) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={index === activeMonth}
              onClick={() => setActiveMonth(index)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                index === activeMonth
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <main className="mx-auto max-w-lg px-5 pt-1">
        {view === "month" ? (
          monthFestivals.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {monthFestivals.map((festival) => (
                <li key={festival.id}>
                  <FestivalCard festival={festival} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-4xl border border-dashed border-border px-6 py-12 text-center">
              <p className="font-serif text-lg font-semibold text-foreground">No festivals in {months[activeMonth]}</p>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                Try another month or switch to Explore all to browse everything.
              </p>
            </div>
          )
        ) : (
          <ul className="flex flex-col gap-3">
            {festivals.map((festival) => (
              <li key={festival.id}>
                <FestivalCard festival={festival} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
