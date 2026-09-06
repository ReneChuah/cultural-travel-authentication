"use client"

import { useState } from "react"
import { ArrowLeft, Check, Download, Loader2 } from "lucide-react"
import type { OfflineItem } from "./data"
import { cn } from "@/lib/utils"

type Status = "idle" | "downloading" | "done"

function DownloadButton({ initiallyDone }: { initiallyDone: boolean }) {
  const [status, setStatus] = useState<Status>(initiallyDone ? "done" : "idle")

  if (status === "done") {
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-xs font-semibold text-success">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        Saved offline
      </span>
    )
  }

  return (
    <button
      type="button"
      disabled={status === "downloading"}
      onClick={() => {
        setStatus("downloading")
        setTimeout(() => setStatus("done"), 1200)
      }}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
        status === "downloading"
          ? "bg-muted text-muted-foreground"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
      )}
    >
      {status === "downloading" ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          Downloading
        </>
      ) : (
        <>
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Download
        </>
      )}
    </button>
  )
}

export function OfflineView({
  title,
  items,
  onBack,
}: {
  title: string
  items: OfflineItem[]
  onBack: () => void
}) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/90 px-5 py-4 backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to profile"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <h1 className="font-serif text-xl font-semibold text-foreground">{title}</h1>
      </header>

      <main className="flex flex-col gap-3 px-5 pb-28 pt-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-3xl border border-border bg-card p-4"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.meta} · {item.sizeMb} MB
              </p>
            </div>
            <DownloadButton initiallyDone={item.downloaded} />
          </div>
        ))}
      </main>
    </div>
  )
}
