export type ActivityIcon =
  | "landmark"
  | "food"
  | "camera"
  | "nature"
  | "view"
  | "tea"
  | "craft"

export type Activity = {
  id: string
  time: string
  name: string
  icon: ActivityIcon
  thumb: string
  cost: number
}

export type Hotel = {
  id: string
  name: string
  image: string
  stars: number
  pricePerNight: number
}

export type Guide = {
  name: string
  avatar: string
  stars: number
  bio: string
  pricePerDay: number
}

export type TripDay = {
  id: string
  label: string
  theme: string
  cover: string
  activities: Activity[]
  warning?: string
}

export type TripPlan = {
  destination: string
  currency: string
  guideRequested: boolean
  days: TripDay[]
  hotels: Hotel[]
  guide: Guide
}

export const tripPlan: TripPlan = {
  destination: "Kyoto",
  currency: "RM",
  guideRequested: true,
  days: [
    {
      id: "day-1",
      label: "Day 1",
      theme: "Temples & Old Kyoto",
      cover: "/trip/day1-cover.png",
      warning: "1.5km of stone steps at Fushimi Inari — tap to swap for the shorter lower loop",
      activities: [
        { id: "fushimi", time: "08:30", name: "Fushimi Inari shrine walk", icon: "landmark", thumb: "/trip/act-fushimi.png", cost: 0 },
        { id: "nishiki", time: "11:30", name: "Nishiki Market brunch", icon: "food", thumb: "/trip/act-nishiki.png", cost: 45 },
        { id: "kiyomizu", time: "15:00", name: "Kiyomizu-dera temple", icon: "camera", thumb: "/trip/act-kiyomizu.png", cost: 20 },
      ],
    },
    {
      id: "day-2",
      label: "Day 2",
      theme: "Arashiyama & Nature",
      cover: "/trip/day2-cover.png",
      warning: "2km uphill to the monkey park — tap to swap for a tram",
      activities: [
        { id: "bamboo", time: "09:00", name: "Arashiyama bamboo grove", icon: "nature", thumb: "/trip/act-bamboo.png", cost: 0 },
        { id: "monkey", time: "11:00", name: "Iwatayama hilltop viewpoint", icon: "view", thumb: "/trip/act-monkey.png", cost: 25 },
        { id: "river", time: "14:00", name: "Riverside kaiseki lunch", icon: "food", thumb: "/trip/act-river.png", cost: 60 },
      ],
    },
    {
      id: "day-3",
      label: "Day 3",
      theme: "Food & Craft",
      cover: "/trip/day3-cover.png",
      activities: [
        { id: "tea", time: "10:00", name: "Traditional tea ceremony", icon: "tea", thumb: "/trip/act-tea.png", cost: 80 },
        { id: "ramen", time: "13:00", name: "Ramen tasting tour", icon: "food", thumb: "/trip/act-ramen.png", cost: 40 },
        { id: "pottery", time: "16:00", name: "Kiyomizu pottery workshop", icon: "craft", thumb: "/trip/act-pottery.png", cost: 120 },
      ],
    },
  ],
  hotels: [
    { id: "machiya", name: "The Machiya Ryokan", image: "/trip/hotel-machiya.png", stars: 4.5, pricePerNight: 320 },
    { id: "garden", name: "Kyoto Garden Hotel", image: "/trip/hotel-garden.png", stars: 4, pricePerNight: 210 },
    { id: "sakura", name: "Sakura Boutique Stay", image: "/trip/hotel-sakura.png", stars: 5, pricePerNight: 480 },
  ],
  guide: {
    name: "Aiko Tanaka",
    avatar: "/trip/guide-aiko.png",
    stars: 4.9,
    bio: "Kyoto native, tea ceremony & hidden-temple specialist.",
    pricePerDay: 250,
  },
}

export function dayTotal(day: TripDay): number {
  return day.activities.reduce((sum, a) => sum + a.cost, 0)
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
