"use client"

import { MapPin } from "lucide-react"
import { Chip, Collapsible, RangeSlider, ToggleSwitch } from "../controls"
import {
  breakdownCategories,
  budgetStyles,
  currencies,
  type SurveyData,
} from "../data"

function rebalance(current: Record<string, number>, key: string, next: number): Record<string, number> {
  const clamped = Math.max(0, Math.min(100, Math.round(next)))
  const others = breakdownCategories.filter((c) => c !== key)
  const oldOthersTotal = others.reduce((sum, c) => sum + current[c], 0)
  const remaining = 100 - clamped
  const result: Record<string, number> = { [key]: clamped }

  if (oldOthersTotal <= 0) {
    const even = Math.floor(remaining / others.length)
    others.forEach((c, i) => {
      result[c] = i === others.length - 1 ? remaining - even * (others.length - 1) : even
    })
  } else {
    let allocated = 0
    others.forEach((c, i) => {
      if (i === others.length - 1) {
        result[c] = remaining - allocated
      } else {
        const share = Math.round((current[c] / oldOthersTotal) * remaining)
        result[c] = share
        allocated += share
      }
    })
  }
  return result
}

export function StepBudget({
  data,
  update,
}: {
  data: SurveyData
  update: (patch: Partial<SurveyData>) => void
}) {
  const currencySymbol =
    data.currency === "USD" ? "$" : data.currency === "EUR" ? "€" : data.currency === "GBP" ? "£" : ""

  function amountFor(category: string) {
    const value = Math.round((data.breakdown[category] / 100) * data.budget)
    return `${data.breakdown[category]}% · ${currencySymbol}${value.toLocaleString()}`
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-semibold text-foreground text-balance">Budget &amp; preference</h1>
        <p className="text-sm text-muted-foreground">Set a total and we&apos;ll plan within it.</p>
      </div>

      <div className="flex items-stretch gap-2">
        <div className="flex flex-1 items-center rounded-xl border border-border bg-card px-4">
          <span className="text-lg font-semibold text-muted-foreground">{currencySymbol || data.currency}</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={data.budget || ""}
            onChange={(e) => update({ budget: Math.max(0, Number(e.target.value)), style: null })}
            placeholder="0"
            aria-label="Total budget"
            className="w-full bg-transparent px-2 py-3.5 text-2xl font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
          />
        </div>
        <select
          value={data.currency}
          onChange={(e) => update({ currency: e.target.value })}
          aria-label="Currency"
          className="rounded-xl border border-border bg-card px-3 text-sm font-semibold text-foreground outline-none focus:border-primary"
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {budgetStyles.map((style) => (
          <Chip
            key={style.id}
            selected={data.style === style.id}
            onClick={() => update({ style: style.id, budget: style.amount })}
          >
            {style.id}
          </Chip>
        ))}
      </div>

      <Collapsible title="Adjust breakdown">
        <div className="flex flex-col gap-4">
          {breakdownCategories.map((category) => (
            <div key={category} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{category}</span>
                <span className="text-xs font-medium tabular-nums text-muted-foreground">{amountFor(category)}</span>
              </div>
              <RangeSlider
                ariaLabel={`${category} percentage`}
                value={data.breakdown[category]}
                onChange={(v) => update({ breakdown: rebalance(data.breakdown, category, v) })}
              />
            </div>
          ))}
        </div>
      </Collapsible>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium text-foreground">Would you like a local guide?</span>
          <ToggleSwitch checked={data.guide} onChange={(v) => update({ guide: v })} label="Would you like a local guide?" />
        </div>
        {data.guide && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            We&apos;ll match you with a local guide based on your trip.
          </p>
        )}
      </div>
    </div>
  )
}
