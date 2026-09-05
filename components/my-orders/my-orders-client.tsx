"use client"

import { useState } from "react"
import Link from "next/link"
import { PackageOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { TripsSubNav } from "@/components/my-trips/trips-sub-nav"
import { OrderCard } from "./order-card"
import { ReceiptDetail } from "./receipt-detail"
import { upcomingOrders, pastOrders, type Order } from "./data"

type TabKey = "upcoming" | "past"

const tabs: { key: TabKey; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past orders" },
]

export function MyOrdersClient() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming")
  const [selected, setSelected] = useState<Order | null>(null)

  if (selected) {
    return (
      <div className="mx-auto min-h-dvh w-full max-w-lg bg-background">
        <ReceiptDetail order={selected} onBack={() => setSelected(null)} />
      </div>
    )
  }

  const orders = activeTab === "upcoming" ? upcomingOrders : pastOrders

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-5 pb-3 pt-4 backdrop-blur">
        <h1 className="font-serif text-xl font-semibold text-foreground">My orders</h1>
        <div className="mt-3">
          <TripsSubNav active="orders" />
        </div>
        <div className="mt-3 flex gap-2" role="tablist" aria-label="Order status">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-5 pb-28 pt-5">
        {orders.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="flex flex-col gap-3">
            {orders.map((order) => (
              <li key={order.id}>
                <OrderCard order={order} onOpen={setSelected} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-secondary">
        <PackageOpen className="h-8 w-8" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <h2 className="font-serif text-xl font-semibold text-foreground">No trips booked yet</h2>
        <p className="text-sm text-muted-foreground text-pretty">
          When you book a trip, your receipts and bookings will show up here.
        </p>
      </div>
      <Link
        href="/survey"
        className="mt-1 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Start a trip
      </Link>
    </div>
  )
}
