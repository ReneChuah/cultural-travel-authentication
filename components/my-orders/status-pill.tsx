import { CheckCircle2, CircleCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import type { OrderStatus } from "./data"

export function StatusPill({ status }: { status: OrderStatus }) {
  const isConfirmed = status === "confirmed"
  const Icon = isConfirmed ? CheckCircle2 : CircleCheck
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        isConfirmed ? "bg-success/12 text-success" : "bg-muted text-muted-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {isConfirmed ? "Confirmed" : "Completed"}
    </span>
  )
}
