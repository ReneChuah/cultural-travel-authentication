"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-primary/40",
      )}
    >
      {children}
    </button>
  )
}

export function Stepper({
  label,
  value,
  min = 0,
  max = 20,
  onChange,
}: {
  label: string
  value: number
  min?: number
  max?: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 disabled:opacity-40"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="w-6 text-center text-base font-semibold tabular-nums text-foreground">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 disabled:opacity-40"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors",
        checked ? "border-primary bg-primary" : "border-border bg-muted",
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 rounded-full bg-card transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  )
}

export function RangeSlider({
  value,
  onChange,
  rightLabel,
  ariaLabel,
}: {
  value: number
  onChange: (v: number) => void
  rightLabel?: ReactNode
  ariaLabel: string
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
      />
      {rightLabel != null && (
        <span className="w-24 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground">
          {rightLabel}
        </span>
      )}
    </div>
  )
}

export function Collapsible({
  title,
  defaultOpen = false,
  children,
}: {
  title: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left"
      >
        <span className="font-medium text-foreground">{title}</span>
        <ChevronDown
          className={cn("h-5 w-5 text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && <div className="border-t border-border px-4 py-4">{children}</div>}
    </div>
  )
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"]

function iso(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}

export function DatePicker({
  value,
  onChange,
}: {
  value: string | null
  onChange: (v: string) => void
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selected = value ? new Date(`${value}T00:00:00`) : null
  const [view, setView] = useState(() => {
    const base = selected ?? today
    return { y: base.getFullYear(), m: base.getMonth() }
  })

  const firstDay = new Date(view.y, view.m, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()
  const monthLabel = firstDay.toLocaleString("en-US", { month: "long", year: "numeric" })

  const cells: (number | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  function shift(delta: number) {
    setView((v) => {
      const total = v.m + delta
      return { y: v.y + Math.floor(total / 12), m: ((total % 12) + 12) % 12 }
    })
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="text-sm font-semibold text-foreground">{monthLabel}</span>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="py-1 text-center text-xs font-medium text-muted-foreground">
            {w}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <span key={`e-${i}`} />
          const cellDate = new Date(view.y, view.m, d)
          const isPast = cellDate < today
          const isSelected = selected != null && iso(view.y, view.m, d) === value
          return (
            <button
              key={d}
              type="button"
              disabled={isPast}
              onClick={() => onChange(iso(view.y, view.m, d))}
              className={cn(
                "flex h-9 items-center justify-center rounded-full text-sm transition-colors",
                isSelected
                  ? "bg-primary font-semibold text-primary-foreground"
                  : "text-foreground hover:bg-muted",
                isPast && "cursor-not-allowed text-muted-foreground/40 hover:bg-transparent",
              )}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}
