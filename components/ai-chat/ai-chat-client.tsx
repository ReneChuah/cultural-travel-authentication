"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Compass, Plus, Send } from "lucide-react"
import { MessageBubble } from "./message-bubble"
import { BottomNav } from "@/components/home/bottom-nav"
import { initialMessages, quickReplies, replyFor, type ChatMessage } from "./data"
import { useTripSelection } from "@/components/trip-selection"
import { tripPlan } from "@/components/trip-plan/data" 

export function AiChatClient() {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState("")
  const [composing, setComposing] = useState(false)
  const [sending, setSending] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const tripSelection = useTripSelection()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setDraft("")
    setSending(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          userProfile: tripSelection,
          tripContext: tripPlan,
        }),
      })

      if (!res.ok) throw new Error(`API returned ${res.status}`)

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "ai", text: data.reply },
      ])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "ai",
          text: "Sorry, I'm having trouble connecting right now — try again in a moment.",
        },
      ])
    } finally {
      setSending(false)
    }
  }


  return (
    <div className="mx-auto flex h-dvh w-full max-w-lg flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary" aria-hidden="true">
          <Compass className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-lg font-semibold leading-tight text-foreground">Trip concierge</h1>
          <p className="flex items-center gap-1.5 text-xs font-medium text-success">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            Online
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5">
        <div className="flex flex-col gap-5">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {sending && (
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <span className="animate-pulse">●</span>
              <span className="animate-pulse [animation-delay:150ms]">●</span>
              <span className="animate-pulse [animation-delay:300ms]">●</span>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </main>

      <div className="border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickReplies.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => send(chip)}
              className="shrink-0 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {chip}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(draft)
          }}
          className="flex items-center gap-2 px-4 pb-4"
        >
          <button
            type="button"
            aria-label="Add attachment"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onCompositionStart={() => setComposing(true)}
            onCompositionEnd={() => setComposing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !composing && e.nativeEvent.keyCode !== 229) {
                e.preventDefault()
                send(draft)
              }
            }}
            placeholder="Ask anything..."
            aria-label="Message"
            className="h-11 flex-1 rounded-full border border-border bg-card px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
          >
            <Send className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </div>

      <BottomNav active="chat" variant="static" />
    </div>
  )
}
