import Link from "next/link"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Trip plan", href: "/my-trip-plan" },
  { label: "Orders", href: "/my-orders" },
]

export function TripsSubNav({ active }: { active: "plan" | "orders" }) {
  const activeHref = active === "plan" ? "/my-trip-plan" : "/my-orders"
  return (
    <div className="flex gap-1 rounded-full border border-border bg-muted/60 p-1">
      {tabs.map((tab) => {
        const isActive = tab.href === activeHref
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex-1 rounded-full px-4 py-1.5 text-center text-sm font-semibold transition-colors",
              isActive
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
