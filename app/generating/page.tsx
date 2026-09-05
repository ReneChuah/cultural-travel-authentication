"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Compass } from "lucide-react"

const messages = [
  "Reading your preferences",
  "Mapping cultural highlights",
  "Balancing your budget",
  "Pacing your days",
  "Finishing your itinerary",
]

export default function GeneratingPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => Math.min(messages.length - 1, i + 1))
    }, 1100)
    const redirect = setTimeout(() => router.push("/trip-plan"), 6000)
    return () => {
      clearInterval(interval)
      clearTimeout(redirect)
    }
  }, [router])

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-background px-8 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary [animation-duration:1.4s]" aria-hidden="true" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-2xl font-semibold text-foreground text-balance">
          Crafting your journey
        </h1>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {messages[index]}…
        </p>
      </div>

      <div className="flex items-center gap-2" aria-hidden="true">
        {messages.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${i <= index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/25"}`}
          />
        ))}
      </div>
    </main>
  )
}
