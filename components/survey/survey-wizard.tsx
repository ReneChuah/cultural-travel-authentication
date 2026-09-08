"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { countries, extraCountries, initialSurveyData, type SurveyData } from "./data"
import { saveTripSelection } from "../trip-selection"
import { StepDestination } from "./steps/step-destination"
import { StepTravelers } from "./steps/step-travelers"
import { StepHealth } from "./steps/step-health"
import { StepPace } from "./steps/step-pace"
import { StepBudget } from "./steps/step-budget"

const TOTAL_STEPS = 5

export function SurveyWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<SurveyData>(initialSurveyData)

  function update(patch: Partial<SurveyData>) {
    setData((prev) => ({ ...prev, ...patch }))
  }

  const canContinue = (() => {
    switch (step) {
      case 0:
        return Boolean(data.destinationCountry)
      case 1:
        return Boolean(data.party)
      case 3:
        return Boolean(data.pace)
      case 4:
        return data.budget > 0
      default:
        return true
    }
  })()

  function persistSelection() {
    const country = [...countries, ...extraCountries].find((c) => c.id === data.destinationCountry)
    const hasRegion = data.destinationRegion && data.destinationRegion !== "Current location"
    const destinationName = hasRegion
      ? (data.destinationRegion as string)
      : (country?.name ?? "your destination")
    const travelers =
      data.party === "solo" ? 1 : data.counts.adults + data.counts.children + data.counts.elderly
    const pace = data.pace === "slow" ? "Relaxed" : data.pace === "fast" ? "Fast-paced" : null

    saveTripSelection({
      destinationName,
      regionName: hasRegion ? (data.destinationRegion as string) : null,
      budget: data.budget || 0,
      guide: data.guide,
      travelers: Math.max(1, travelers),
      pace,
      dietary,
      travelerHealth,
      otherNotes,
      interests,
    })
  }

  function handleContinue() {
    if (!canContinue) return
    if (step === TOTAL_STEPS - 1) {
      persistSelection()
      router.push("/generating")
      return
    }
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))
    if (typeof window !== "undefined") window.scrollTo({ top: 0 })
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1))
    if (typeof window !== "undefined") window.scrollTo({ top: 0 })
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="relative mx-auto flex max-w-lg items-center justify-center px-5 py-4">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go back"
              className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          <div className="flex items-center gap-2" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={TOTAL_STEPS}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === step ? "w-6 bg-primary" : i < step ? "w-2 bg-primary" : "w-2 bg-muted-foreground/25",
                )}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-5 py-6">
        {step === 0 && <StepDestination data={data} update={update} />}
        {step === 1 && <StepTravelers data={data} update={update} />}
        {step === 2 && <StepHealth data={data} update={update} />}
        {step === 3 && <StepPace data={data} update={update} />}
        {step === 4 && <StepBudget data={data} update={update} />}
      </main>

      <footer className="sticky bottom-0 z-20 border-t border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-lg px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-4">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="flex w-full items-center justify-center rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step === TOTAL_STEPS - 1 ? "Plan my trip" : "Continue"}
          </button>
        </div>
      </footer>
    </div>
  )
}
