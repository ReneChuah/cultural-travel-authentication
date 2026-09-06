import type { Metadata } from "next"
import Link from "next/link"
import {
  Bell,
  ChevronRight,
  CreditCard,
  Globe,
  HelpCircle,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react"
import { BottomNav } from "@/components/home/bottom-nav"

export const metadata: Metadata = {
  title: "Profile — Wanderlore",
  description: "Manage your account and preferences.",
}

const settings: { label: string; hint: string; icon: typeof Settings }[] = [
  { label: "Account settings", hint: "Name, email, password", icon: Settings },
  { label: "Notifications", hint: "Trip alerts and deals", icon: Bell },
  { label: "Payment methods", hint: "Cards and billing", icon: CreditCard },
  { label: "Language & region", hint: "English · Malaysia (RM)", icon: Globe },
  { label: "Privacy & security", hint: "Data and permissions", icon: ShieldCheck },
  { label: "Help & support", hint: "FAQs and contact", icon: HelpCircle },
]

export default function ProfilePage() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-5 py-4 backdrop-blur">
        <h1 className="font-serif text-xl font-semibold text-foreground">Profile</h1>
      </header>

      <main className="flex flex-col gap-6 px-5 pb-28 pt-5">
        <section className="flex items-center gap-4 rounded-4xl border border-border bg-card p-5">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <User className="h-8 w-8" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-lg font-semibold text-foreground">Maya Traveler</h2>
            <p className="truncate text-sm text-muted-foreground">maya.traveler@gmail.com</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/50"
          >
            Edit
          </button>
        </section>

        <section className="overflow-hidden rounded-4xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {settings.map((item) => {
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
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{item.hint}</span>
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <Link
          href="/signup"
          className="flex items-center justify-center gap-2 rounded-full border border-border bg-card py-4 text-base font-semibold text-primary transition-colors hover:border-primary/50"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          Log out
        </Link>

        <p className="text-center text-xs text-muted-foreground">Wanderlore · v1.0.0</p>
      </main>

      <BottomNav active="profile" />
    </div>
  )
}
