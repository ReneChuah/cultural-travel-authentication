import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { TopBar } from "@/components/home/top-bar"
import { BottomNav } from "@/components/home/bottom-nav"
import { PackageCard } from "@/components/home/package-card"
import { SearchBar } from "@/components/home/search-bar"
import { BannerCarousel } from "@/components/home/banner-carousel"
import { packages } from "@/components/home/packages"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-background">
      <TopBar />

      <SearchBar />

      <BannerCarousel />

      <main className="mx-auto max-w-lg px-5 pb-28 pt-5">
        <div className="mb-5">
          <h1 className="font-serif text-2xl font-semibold text-foreground text-balance">
            Deals worth a detour
          </h1>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Culture-first trips timed to the world&apos;s biggest moments.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <Link
          href="/festivals-calendar"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-primary px-5 py-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          <CalendarDays className="h-5 w-5" aria-hidden="true" />
          Explore festivals by month
        </Link>
      </main>

      <BottomNav active="home" showFab />
    </div>
  )
}
