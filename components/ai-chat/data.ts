import type { ActivityIcon } from "@/components/trip-plan/data"

export type ItineraryLine = {
  time: string
  name: string
  icon: ActivityIcon
  note?: string
}

export type ItineraryCard = {
  title: string
  subtitle: string
  lines: ItineraryLine[]
}

export type ChatMessage = {
  id: string
  role: "ai" | "user"
  text?: string
  itinerary?: ItineraryCard
}

export const quickReplies = [
  "Nearest toilet?",
  "What to wear today?",
  "Can't get a taxi",
  "Any discounts nearby?",
  "Replan for rain",
]

export const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "ai",
    text: "Hi! I'm your Kyoto trip concierge. I'm keeping an eye on today's plan — ask me anything, day or night.",
  },
  {
    id: "m2",
    role: "user",
    text: "It's raining, can you replan today?",
  },
  {
    id: "m3",
    role: "ai",
    text: "Rain until about 4pm today. I've swapped the outdoor temple walk for indoor spots that stay cosy and dry — here's the adjusted plan:",
    itinerary: {
      title: "Rainy-day plan",
      subtitle: "Day 1 · updated 2 min ago",
      lines: [
        { time: "10:00", name: "Nishiki Market covered arcade", icon: "food", note: "Fully sheltered" },
        { time: "13:00", name: "Kyoto Railway Museum", icon: "landmark", note: "Indoor" },
        { time: "16:30", name: "Fushimi Inari shrine walk", icon: "camera", note: "Rain clears" },
      ],
    },
  },
  {
    id: "m4",
    role: "user",
    text: "Perfect, thank you!",
  },
]

const cannedReplies: Record<string, string> = {
  "Nearest toilet?": "There's a clean public restroom inside Nishiki Market, about 120m north of you — free to use, near the fish stalls.",
  "What to wear today?": "It's 14°C and drizzly today. Layers plus a light waterproof jacket will keep you comfortable — you likely won't need an umbrella after 4pm.",
  "Can't get a taxi": "Taxis are scarce in the rain. The Karasuma subway line runs every 5 min from Shijo Station, 3 min walk away, and gets you across town for ~RM8.",
  "Any discounts nearby?": "Your guide unlocked 10% off at the Nishiki tea house and a free matcha refill at Café Kotoba — both a short walk away. Want me to reserve a table?",
  "Replan for rain": "Done — I've moved outdoor stops to the afternoon and slotted indoor spots for the morning. Check the updated card above.",
}

export function replyFor(text: string): ChatMessage {
  const canned = cannedReplies[text]
  return {
    id: `ai-${Date.now()}`,
    role: "ai",
    text:
      canned ??
      "Good question! Let me check that against today's plan and the weather — I'll have a suggestion for you in a moment.",
  }
}
