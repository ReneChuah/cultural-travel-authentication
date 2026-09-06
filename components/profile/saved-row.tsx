"use client"

import { useState } from "react"
import Image from "next/image"
import type { SavedItem } from "./data"

export function SavedRow({ title, items }: { title: string; items: SavedItem[] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold text-foreground">{title}</h2>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          {expanded ? "Show less" : "See all"}
        </button>
      </div>

      {expanded ? (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-3xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/40"
              >
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.place}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group w-36 shrink-0 snap-start text-left"
            >
              <span className="relative block h-28 w-36 overflow-hidden rounded-3xl border border-border">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  sizes="144px"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </span>
              <span className="mt-2 block truncate text-sm font-semibold text-foreground">{item.name}</span>
              <span className="block text-xs text-muted-foreground">{item.place}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
