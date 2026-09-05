import Image from "next/image"
import { ArrowLeft, CreditCard, CalendarDays, Download } from "lucide-react"
import { StatusPill } from "./status-pill"
import { currency, orderTotal, type Order } from "./data"

export function ReceiptDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  const total = orderTotal(order)

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-5 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to orders"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <h1 className="font-serif text-xl font-semibold text-foreground">Receipt</h1>
        </div>
      </header>

      <div className="flex flex-col gap-6 px-5 pb-32 pt-5">
        <section className="overflow-hidden rounded-4xl border border-border bg-card">
          <div className="relative h-36 w-full">
            <Image
              src={order.image || "/placeholder.svg"}
              alt={`${order.destination}, ${order.country}`}
              fill
              sizes="(max-width: 512px) 100vw, 512px"
              className="object-cover"
            />
          </div>
          <div className="flex items-start justify-between gap-3 p-5">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                {order.destination}
              </h2>
              <p className="text-sm text-muted-foreground">
                {order.country} · {order.dates}
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">#{order.reference}</p>
            </div>
            <StatusPill status={order.status} />
          </div>
        </section>

        <section className="rounded-4xl border border-border bg-card p-5" aria-label="Itemized charges">
          <h3 className="text-sm font-semibold text-foreground">Summary</h3>
          <ul className="mt-3 flex flex-col divide-y divide-border">
            {order.items.map((item) => (
              <li key={item.label} className="flex items-start justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  {item.detail && (
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  )}
                </div>
                <span className="shrink-0 text-sm font-medium text-foreground">
                  {currency}
                  {item.price.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-semibold text-foreground">Total paid</span>
            <span className="font-serif text-2xl font-semibold text-foreground">
              {currency}
              {total.toLocaleString()}
            </span>
          </div>
        </section>

        <section className="rounded-4xl border border-border bg-card p-5" aria-label="Payment details">
          <div className="flex items-center justify-between py-1">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4 text-secondary" aria-hidden="true" />
              Payment method
            </span>
            <span className="font-mono text-sm text-foreground">•••• {order.paymentMask}</span>
          </div>
          <div className="mt-2 flex items-center justify-between py-1">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-secondary" aria-hidden="true" />
              Booked on
            </span>
            <span className="text-sm text-foreground">{order.bookingDate}</span>
          </div>
        </section>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-transparent px-5 py-3.5 font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          <Download className="h-5 w-5" aria-hidden="true" />
          Download receipt
        </button>
      </div>
    </div>
  )
}
