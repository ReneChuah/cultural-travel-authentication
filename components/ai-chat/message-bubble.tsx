import { Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import { InlineItinerary } from "./inline-itinerary"
import type { ChatMessage } from "./data"

export function MessageBubble({ message, onApplyItinerary }: { message: ChatMessage; onApplyItinerary?: () => void }) {
  const isAI = message.role === "ai"

  return (
    <div className={cn("flex w-full gap-2.5", isAI ? "justify-start" : "justify-end")}>
      {isAI && (
        <span
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
          aria-hidden="true"
        >
          <Compass className="h-4 w-4" />
        </span>
      )}

      <div className={cn("flex max-w-[80%] flex-col", isAI ? "items-start" : "items-end")}>
        {message.text && (
          <div
            className={cn(
              "rounded-3xl px-4 py-2.5 text-sm leading-relaxed",
              isAI
                ? "rounded-tl-lg bg-card text-card-foreground border border-border"
                : "rounded-tr-lg bg-primary text-primary-foreground",
            )}
          >
            {message.text}
          </div>
        )}
        {message.itinerary && <InlineItinerary card={message.itinerary} onApply={onApplyItinerary} />}
      </div>
    </div>
  )
}
