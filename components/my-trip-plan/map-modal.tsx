"use client"

import { useEffect } from "react"
import { MapPin, X } from "lucide-react"

export function MapModal({
  name,
  lat,
  lng,
  onClose,
}: {
  name: string
  lat: number
  lng: number
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  const dx = 0.012
  const dy = 0.009
  const bbox = `${lng - dx}%2C${lat - dy}%2C${lng + dx}%2C${lat + dy}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Map of ${name}`}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/50 sm:items-center sm:p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-t-4xl border border-border bg-card sm:rounded-4xl"
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <span className="inline-flex min-w-0 items-center gap-2 font-medium text-foreground">
            <MapPin className="h-4.5 w-4.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">{name}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close map"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-border"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <iframe
          title={`Map showing ${name}`}
          src={src}
          loading="lazy"
          className="h-72 w-full border-0"
        />
      </div>
    </div>
  )
}
