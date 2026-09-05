"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, RotateCcw, Check, Loader2 } from "lucide-react"
import { tripPlan, shuffle, type Hotel, type TripDay } from "./data"
import { DayCard } from "./day-card"

const THRESHOLD = 110

export function TripPlanClient() {
  const router = useRouter()
  const [activeDay, setActiveDay] = useState(0)
  const [days, setDays] = useState<TripDay[]>(tripPlan.days)
  const [hotels, setHotels] = useState<Hotel[]>(tripPlan.hotels)
  const [tx, setTx] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [toast, setToast] = useState(false)
  const [busy, setBusy] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ startX: number; startY: number; dir: "" | "h" | "v"; id: number } | null>(null)

  const width = () => cardRef.current?.offsetWidth ?? 400

  const regenerate = useCallback(() => {
    if (busy) return
    setBusy(true)
    setToast(true)
    setAnimate(true)
    setTx(-width() * 1.3)
    window.setTimeout(() => {
      setDays((prev) => prev.map((d, i) => (i === activeDay ? { ...d, activities: shuffle(d.activities) } : d)))
      setHotels((prev) => shuffle(prev))
      setAnimate(false)
      setTx(width() * 1.3)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true)
          setTx(0)
        })
      })
    }, 260)
    window.setTimeout(() => {
      setToast(false)
      setBusy(false)
    }, 1100)
  }, [activeDay, busy])

  const looksGood = useCallback(() => {
    if (busy) return
    setBusy(true)
    setAnimate(true)
    setTx(width() * 1.3)
    window.setTimeout(() => router.push("/booking-summary"), 260)
  }, [busy, router])

  const onPointerDown = (e: React.PointerEvent) => {
    if (busy) return
    drag.current = { startX: e.clientX, startY: e.clientY, dir: "", id: e.pointerId }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (d.dir === "") {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      d.dir = Math.abs(dx) > Math.abs(dy) ? "h" : "v"
      if (d.dir === "h") {
        cardRef.current?.setPointerCapture(d.id)
        setAnimate(false)
      }
    }
    if (d.dir === "h") setTx(dx)
  }

  const onPointerUp = () => {
    const d = drag.current
    drag.current = null
    if (!d || d.dir !== "h") return
    setAnimate(true)
    if (tx <= -THRESHOLD) {
      regenerate()
    } else if (tx >= THRESHOLD) {
      looksGood()
    } else {
      setTx(0)
    }
  }

  useEffect(() => {
    setAnimate(true)
    setTx(0)
  }, [activeDay])

  const rotate = Math.max(-9, Math.min(9, tx / 22))
  const day = days[activeDay]

  return (
    <main className="relative flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto w-full max-w-md px-4 pt-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <h1 className="font-serif text-lg font-semibold text-foreground">
              Your trip to {tripPlan.destination}
            </h1>
          </div>

          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-3">
            {days.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDay(i)}
                aria-current={i === activeDay}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  i === activeDay
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
                <span className="ml-2 font-normal opacity-70">
                  {i + 1}/{days.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-md flex-1 px-4 pb-40 pt-4">
        <div
          ref={cardRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            transform: `translateX(${tx}px) rotate(${rotate}deg)`,
            transition: animate ? "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            touchAction: "pan-y",
          }}
          className="h-[calc(100dvh-16rem)] min-h-[26rem] cursor-grab touch-pan-y select-none active:cursor-grabbing"
        >
          <DayCard
            day={day}
            hotels={hotels}
            guide={tripPlan.guide}
            guideRequested={tripPlan.guideRequested}
            currency={tripPlan.currency}
          />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex w-full max-w-md items-center justify-between gap-4 bg-gradient-to-t from-background via-background to-transparent px-6 pb-7 pt-10">
          <button
            type="button"
            onClick={regenerate}
            disabled={busy}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Regenerate
          </button>
          <button
            type="button"
            onClick={looksGood}
            disabled={busy}
            className="pointer-events-auto inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Check className="h-5 w-5" aria-hidden="true" />
            Looks good
          </button>
        </div>
      </div>

      <div
        aria-live="polite"
        className={`pointer-events-none fixed left-1/2 top-24 z-30 -translate-x-1/2 transition-opacity duration-200 ${
          toast ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Regenerating…
        </div>
      </div>
    </main>
  )
}
