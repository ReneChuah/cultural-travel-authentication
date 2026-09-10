import Link from "next/link"
import { Compass, User } from "lucide-react"

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-3.5">
        <Link href="/home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">Roamio</span>
        </Link>

        <Link
          href="/profile"
          aria-label="Profile and settings"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <User className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </header>
  )
}
