"use client"

import Link from "next/link"
import { Home, Briefcase, MessageCircle, User, Plane } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { label: "Home", href: "/home", icon: Home, active: true },
  { label: "My trips", href: "/my-trip-plan", icon: Briefcase, active: false },
  { label: "AI chat", href: "/ai-chat", icon: MessageCircle, active: false },
  { label: "Profile", href: "/profile", icon: User, active: false },
]

export function BottomNav() {
  return (
    <>
      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-lg -translate-x-1/2">
        <div className="relative">
          <nav
            aria-label="Primary"
            className="grid grid-cols-4 border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2.5 backdrop-blur"
          >
            {items.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl py-1.5 text-xs font-medium transition-colors",
                    index === 1 && "mr-8",
                    index === 2 && "ml-8",
                    item.active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Floating action button rendered last so it paints above the nav bar */}
          <Link
            href="/survey"
            className="absolute -top-7 left-1/2 flex -translate-x-1/2 flex-col items-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
              <Plane className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="mt-1 text-xs font-semibold text-primary">Start a trip</span>
          </Link>
        </div>
      </div>
      {/* Spacer so feed content is not hidden behind the fixed nav */}
      <div className="h-24" aria-hidden="true" />
    </>
  )
}
