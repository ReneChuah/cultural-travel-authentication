import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { StatusPill } from "./status-pill"
import { currency, orderTotal, type Order } from "./data"

export function OrderCard({ order, onOpen }: { order: Order; onOpen: (order: Order) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(order)}
      className="flex w-full items-center gap-4 rounded-3xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/40"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={order.image || "/placeholder.svg"}
          alt={`${order.destination}, ${order.country}`}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-serif text-lg font-semibold text-foreground">
              {order.destination}
            </h3>
            <p className="text-sm text-muted-foreground">{order.dates}</p>
          </div>
          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        </div>

        <p className="font-mono text-xs text-muted-foreground">#{order.reference}</p>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <StatusPill status={order.status} />
          <span className="font-serif text-base font-semibold text-foreground">
            {currency}
            {orderTotal(order).toLocaleString()}
          </span>
        </div>
      </div>
    </button>
  )
}
