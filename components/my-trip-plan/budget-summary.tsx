import { Wallet } from "lucide-react"

export type BudgetCategory = {
  name: string
  amount: number
  color: string
}

const categories: BudgetCategory[] = [
  { name: "Accommodation", amount: 1920, color: "var(--chart-1)" },
  { name: "Food", amount: 1320, color: "var(--chart-2)" },
  { name: "Transport", amount: 840, color: "var(--chart-4)" },
  { name: "Souvenirs", amount: 600, color: "var(--chart-3)" },
  { name: "Emergency buffer", amount: 1320, color: "var(--chart-5)" },
]

const total = categories.reduce((sum, c) => sum + c.amount, 0)
const spent = 4150
const remaining = total - spent

export function BudgetSummary({ currency }: { currency: string }) {
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
              {spent.toLocaleString()} spent of {currency}
              {total.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-serif text-lg font-semibold text-foreground">
            {currency}
            {remaining.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">remaining</p>
        </div>
      </div>

      <div
        className="mt-4 flex h-3.5 w-full overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`Budget split across ${categories.length} categories totalling ${currency}${total.toLocaleString()}`}
      >
        {categories.map((c) => (
          <span
            key={c.name}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ width: `${(c.amount / total) * 100}%`, backgroundColor: c.color }}
          />
        ))}
      </div>

      <ul className="mt-4 grid gap-y-2.5">
        {categories.map((c) => {
          const pct = (c.amount / total) * 100
          return (
            <li key={c.name} className="flex items-center gap-3 text-sm">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: c.color }}
                aria-hidden="true"
              />
              <span className="flex-1 text-foreground">{c.name}</span>
              <span className="font-medium text-foreground">
                {currency}
                {c.amount.toLocaleString()}
              </span>
              <span className="w-12 text-right text-xs text-muted-foreground">{pct.toFixed(1)}%</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
