import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="mx-auto max-w-lg px-5 pt-4">
      <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-3">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          aria-label="Search festivals, places, experiences"
          placeholder="Search festivals, places, experiences..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </div>
  )
}
