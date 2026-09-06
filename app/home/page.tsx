import { TopBar } from "@/components/home/top-bar"
import { BottomNav } from "@/components/home/bottom-nav"
import { PackageCard } from "@/components/home/package-card"
import { packages } from "@/components/home/packages"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-background">
      <TopBar />

      <main className="mx-auto max-w-lg px-5 pt-5">
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
      </main>

      <BottomNav active="home" showFab />
    </div>
  )
}
