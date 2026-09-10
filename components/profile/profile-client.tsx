"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Check,
  ChevronRight,
  Copy,
  LogOut,
  Map,
  Pencil,
  Sparkles,
  Ticket,
} from "lucide-react"
import { BottomNav } from "@/components/home/bottom-nav"
import { SavedRow } from "./saved-row"
import { OfflineView } from "./offline-view"
import {
  accountSettings,
  bookmarks,
  history,
  offlineMaps,
  offlineTickets,
  referralLink,
  rewardPoints,
  vouchers,
} from "./data"

type View = "main" | "tickets" | "maps"

export function ProfileClient() {
  const [view, setView] = useState<View>("main")
  const [copied, setCopied] = useState<string | null>(null)

  function copy(id: string, text: string) {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied((c) => (c === id ? null : c)), 1600)
  }

  if (view === "tickets") {
    return <OfflineView title="Offline tickets" items={offlineTickets} onBack={() => setView("main")} />
  }
  if (view === "maps") {
    return <OfflineView title="Offline maps" items={offlineMaps} onBack={() => setView("main")} />
  }

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-5 py-4 backdrop-blur">
        <h1 className="font-serif text-xl font-semibold text-foreground">Profile</h1>
      </header>

      <main className="flex flex-col gap-7 px-5 pb-28 pt-5">
        {/* Avatar + username */}
        <section className="flex items-center gap-4">
          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border">
            <Image src="/profile/avatar.png" alt="Maya Traveler" fill sizes="80px" className="object-cover" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-xl font-semibold text-foreground">Maya Traveler</h2>
            <p className="truncate text-sm text-muted-foreground">@mayawanders</p>
          </div>
          <button
            type="button"
            aria-label="Edit profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50"
          >
            <Pencil className="h-4.5 w-4.5" aria-hidden="true" />
          </button>
        </section>

        {/* Rewards + referral */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-4 rounded-4xl border border-border bg-card p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Reward points</p>
              <p className="font-serif text-2xl font-semibold text-foreground">{rewardPoints.toLocaleString()}</p>
            </div>
            <button
              type="button"
              className="rounded-full bg-secondary/15 px-4 py-2 text-sm font-semibold text-secondary transition-colors hover:bg-secondary/25"
            >
              Redeem
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-4xl border border-border bg-card p-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">My referral link</p>
              <p className="truncate text-sm font-semibold text-foreground">{referralLink}</p>
            </div>
            <button
              type="button"
              onClick={() => copy("referral", referralLink)}
              aria-label="Copy referral link"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {copied === "referral" ? <Check className="h-4.5 w-4.5" /> : <Copy className="h-4.5 w-4.5" />}
            </button>
          </div>
        </section>

        {/* Bookmarks */}
        <SavedRow title="Bookmarks" items={bookmarks} />

        {/* History */}
        <SavedRow title="History" items={history} />

        {/* Offline access */}
        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">Offline access</h2>
          <div className="overflow-hidden rounded-4xl border border-border bg-card">
            <ul className="divide-y divide-border">
              <li>
                <button
                  type="button"
                  onClick={() => setView("tickets")}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Ticket className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">Offline tickets</span>
                    <span className="block text-xs text-muted-foreground">Access passes without signal</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView("maps")}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Map className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">Offline maps</span>
                    <span className="block text-xs text-muted-foreground">Download regions to explore offline</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </div>
        </section>

        {/* Vouchers */}
        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">Vouchers</h2>
          <ul className="flex flex-col gap-3">
            {vouchers.map((v) => (
              <li
                key={v.id}
                className="flex items-center gap-4 rounded-4xl border border-border bg-card p-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg font-semibold text-primary">{v.value}</p>
                  <p className="truncate text-sm text-foreground">{v.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Expires {v.expiry}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copy(v.id, v.code)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-dashed border-primary/60 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                >
                  {copied === v.id ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      {v.code}
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Account settings */}
        <section className="overflow-hidden rounded-4xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {accountSettings.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-sm font-semibold text-foreground">{item.label}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </button>
                </li>
              )
            })}
            <li>
              <Link
                href="/signup"
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-destructive/10"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                  <LogOut className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="flex-1 text-sm font-semibold text-destructive">Log out</span>
              </Link>
            </li>
          </ul>
        </section>

        <p className="text-center text-xs text-muted-foreground">Roamio · v1.0.0</p>
      </main>

      <BottomNav active="profile" />
    </div>
  )
}
