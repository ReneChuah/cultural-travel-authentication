"use client"

import { useState } from "react"
import { Wallet, Plus, X, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export type BudgetCategory = {
  name: string
  allocated: number
  spent: number
  color: string
}

const initialCategories: BudgetCategory[] = [
  { name: "Accommodation", allocated: 1920, spent: 1920, color: "var(--chart-1)" },
  { name: "Food", allocated: 1320, spent: 900, color: "var(--chart-2)" },
  { name: "Transport", allocated: 840, spent: 600, color: "var(--chart-4)" },
  { name: "Souvenirs", allocated: 600, spent: 400, color: "var(--chart-3)" },
  { name: "Emergency buffer", allocated: 1320, spent: 330, color: "var(--chart-5)" },
]

export function BudgetSummary({ currency }: { currency: string }) {
  const [categories, setCategories] = useState(initialCategories)
  const [sheetOpen, setSheetOpen] = useState(false)

  const totalAllocated = categories.reduce((s, c) => s + c.allocated, 0)
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0)
  const remaining = totalAllocated - totalSpent

  function addExpense(name: string, amount: number) {
    setCategories((prev) => prev.map((c) => (c.name === name ? { ...c, spent: c.spent + amount } : c)))
  }

  return (
    <section className="rounded-4xl border border-border bg-card p-5" aria-labelledby="budget-heading">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 text-secondary">
            <Wallet className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="budget-heading" className="text-sm font-semibold text-foreground">
              Trip budget
            </h2>
            <p className="text-xs text-muted-foreground">
              {currency}
              {totalSpent.toLocaleString()} spent of {currency}
              {totalAllocated.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p
            className={cn(
              "font-serif text-lg font-semibold",
              remaining < 0 ? "text-destructive" : "text-foreground",
            )}
          >
            {currency}
            {remaining.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">remaining</p>
        </div>
      </div>

      <div
        className="mt-4 flex h-3.5 w-full overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`Budget split across ${categories.length} categories totalling ${currency}${totalAllocated.toLocaleString()}`}
      >
        {categories.map((c) => (
          <span
            key={c.name}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ width: `${(c.allocated / totalAllocated) * 100}%`, backgroundColor: c.color }}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Breakdown</h3>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add expense
        </button>
      </div>

      <ul className="mt-3 grid gap-y-2">
        {categories.map((c) => {
          const over = c.spent > c.allocated
          return (
            <li
              key={c.name}
              className={cn(
                "rounded-xl",
                over && "border border-destructive/50 bg-destructive/5 px-2.5 py-2",
              )}
            >
              <div className="flex items-center gap-3 text-sm">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: c.color }}
                  aria-hidden="true"
                />
                <span className="flex-1 text-foreground">{c.name}</span>
                <span
                  className={cn(
                    "font-medium tabular-nums",
                    over ? "text-destructive" : "text-foreground",
                  )}
                >
                  {currency}
                  {c.spent.toLocaleString()}
                  <span className="text-muted-foreground">
                    {" "}
                    / {currency}
                    {c.allocated.toLocaleString()}
                  </span>
                </span>
              </div>
              {over && (
                <p className="mt-1 flex items-center gap-1.5 pl-6 text-xs font-semibold text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                  Over budget by {currency}
                  {(c.spent - c.allocated).toLocaleString()}
                </p>
              )}
            </li>
          )
        })}
      </ul>

      {sheetOpen && (
        <ExpenseSheet
          currency={currency}
          categories={categories}
          onSave={addExpense}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </section>
  )
}

function ExpenseSheet({
  currency,
  categories,
  onSave,
  onClose,
}: {
  currency: string
  categories: BudgetCategory[]
  onSave: (name: string, amount: number) => void
  onClose: () => void
}) {
  const [category, setCategory] = useState(categories[0].name)
  const [amount, setAmount] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = Number.parseFloat(amount)
    if (!Number.isFinite(value) || value <= 0) return
    onSave(category, value)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Add an expense"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/50 sm:items-center sm:p-5"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-t-4xl border border-border bg-card p-5 sm:rounded-4xl"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif text-lg font-semibold text-foreground">Add expense</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-border"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <label className="mt-4 block text-sm font-medium text-foreground" htmlFor="expense-category">
          Category
        </label>
        <select
          id="expense-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <label className="mt-4 block text-sm font-medium text-foreground" htmlFor="expense-amount">
          Amount
        </label>
        <div className="mt-1.5 flex items-center rounded-2xl border border-input bg-background px-4 focus-within:ring-2 focus-within:ring-primary">
          <span className="text-sm font-medium text-muted-foreground">{currency}</span>
          <input
            id="expense-amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            autoFocus
            className="w-full bg-transparent px-2 py-3 text-sm text-foreground outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-5 flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Save
        </button>
      </form>
    </div>
  )
}
