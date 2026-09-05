"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Compass } from "lucide-react"

const messages = [
  "Matching festivals to your dates",
  "Checking the weather",
  "Finding the best local eats",
  "Balancing your budget",
  "Pacing your days just right",
]

const DURATION_MS = 4500

export default function GeneratingPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    // Cycle the sub-text with a short fade-out/fade-in between messages.
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length)
        setVisible(true)
      }, 300)
    }, 1200)

    // Animate the progress bar smoothly to 100% over DURATION_MS.
    let frame: number
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const pct = Math.min(100, (elapsed / DURATION_MS) * 100)
      setProgress(pct)
      if (elapsed < DURATION_MS) {
        frame = requestAnimationFrame(tick)
      } else {
        router.push("/trip-plan")
      }
    }
    frame = requestAnimationFrame(tick)

    return () => {
      clearInterval(cycle)
      cancelAnimationFrame(frame)
    }
  }, [router])

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-background px-8 text-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span
          className="absolute inset-0 animate-ping rounded-full bg-primary/15 [animation-duration:1.8s]"
          aria-hidden="true"
        />
        <span
          className="absolute inset-2 rounded-full border-2 border-secondary/30 animate-spin [animation-duration:6s]"
          aria-hidden="true"
        />
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground animate-pulse [animation-duration:1.8s]">
          <Compass className="h-10 w-10" aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-2xl font-medium text-foreground text-balance">
          Planning your trip...
        </h1>
        <p
          className={`text-sm text-muted-foreground transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
          aria-live="polite"
        >
          {messages[index]}
        </p>
      </div>

      <div className="h-1.5 w-56 max-w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </main>
  )
}
