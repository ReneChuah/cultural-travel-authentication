import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import type { TravelPackage } from "./packages"

export function PackageCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <article className="overflow-hidden rounded-4xl border border-border bg-card">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={pkg.image || "/placeholder.svg"}
          alt={`${pkg.headline} — ${pkg.country}`}
          fill
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {pkg.country}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h2 className="font-serif text-xl font-semibold leading-snug text-foreground text-balance">
          {pkg.headline}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{pkg.description}</p>
        <Link
          href={`/survey?package=${pkg.id}`}
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          View package
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
