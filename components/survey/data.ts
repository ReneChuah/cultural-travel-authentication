export type Party = "solo" | "couple" | "friends" | "family"
export type Pace = "fast" | "slow"

export type TravelerCounts = {
  adults: number
  children: number
  elderly: number
}

export type TravelerInfo = {
  tags: string[]
  note: string
}

export type SurveyData = {
  destinationCountry: string | null
  destinationRegion: string | null
  party: Party | null
  counts: TravelerCounts
  travelers: Record<string, TravelerInfo>
  dietary: string[]
  dietaryNote: string
  otherNotes: string
  pace: Pace | null
  interests: string[]
  arrivalDate: string | null
  duration: string | null
  budget: number
  currency: string
  style: string | null
  breakdown: Record<string, number>
  guide: boolean
}

export type Country = {
  id: string
  name: string
  image: string
  regions: string[]
}

export const countries: Country[] = [
  {
    id: "france",
    name: "France",
    image: "/countries/france.png",
    regions: ["Île-de-France", "Provence", "Normandy", "Brittany", "French Riviera", "Loire Valley"],
  },
  {
    id: "china",
    name: "China",
    image: "/countries/china.png",
    regions: ["Beijing", "Shanghai", "Sichuan", "Yunnan", "Guangdong", "Xi'an"],
  },
  {
    id: "uk",
    name: "United Kingdom",
    image: "/countries/uk.png",
    regions: ["London", "Scotland", "Wales", "Cornwall", "Lake District", "Yorkshire"],
  },
  {
    id: "japan",
    name: "Japan",
    image: "/countries/japan.png",
    regions: ["Tokyo", "Kyoto", "Osaka", "Hokkaido", "Okinawa", "Hiroshima"],
  },
  {
    id: "thailand",
    name: "Thailand",
    image: "/countries/thailand.png",
    regions: ["Bangkok", "Chiang Mai", "Phuket", "Krabi", "Koh Samui", "Ayutthaya"],
  },
  {
    id: "italy",
    name: "Italy",
    image: "/countries/italy.png",
    regions: ["Rome", "Tuscany", "Venice", "Amalfi Coast", "Sicily", "Milan"],
  },
  {
    id: "malaysia",
    name: "Malaysia",
    image: "/countries/malaysia.png",
    regions: ["Kuala Lumpur", "Penang", "Langkawi", "Sabah", "Malacca", "Cameron Highlands"],
  },
  {
    id: "korea",
    name: "South Korea",
    image: "/countries/korea.png",
    regions: ["Seoul", "Busan", "Jeju", "Gyeongju", "Incheon", "Gangwon"],
  },
]

export const extraCountries: Country[] = [
  { id: "spain", name: "Spain", image: "/countries/italy.png", regions: ["Madrid", "Barcelona", "Andalusia", "Valencia"] },
  { id: "vietnam", name: "Vietnam", image: "/countries/thailand.png", regions: ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hoi An"] },
]

export const healthTags = [
  "No limitations",
  "Knee/joint issues",
  "Limited mobility",
  "Pregnant",
  "Uses wheelchair",
]
export const healthExclusive = "No limitations"

export const dietaryTags = [
  "No restrictions",
  "Halal",
  "Vegetarian",
  "Vegan",
  "Seafood allergy",
  "Nut allergy",
]
export const dietaryExclusive = "No restrictions"

export const interestOptions = [
  "History & culture",
  "Nature & outdoors",
  "Food",
  "Festivals & events",
  "Shopping",
  "Nightlife",
  "Art & museums",
  "Relaxation",
]

export const durationOptions = ["Weekend", "3-5 days", "1 week", "Custom"]

export const currencies = ["USD", "EUR", "GBP", "MYR", "JPY", "THB"]

export const budgetStyles: { id: string; amount: number }[] = [
  { id: "Backpacker", amount: 900 },
  { id: "Comfortable", amount: 2800 },
  { id: "Premium", amount: 7000 },
]

export const breakdownCategories = [
  "Accommodation",
  "Food",
  "Transport",
  "Souvenirs",
  "Emergency buffer",
]

export const defaultBreakdown: Record<string, number> = {
  Accommodation: 35,
  Food: 25,
  Transport: 20,
  Souvenirs: 10,
  "Emergency buffer": 10,
}

export const initialSurveyData: SurveyData = {
  destinationCountry: null,
  destinationRegion: null,
  party: null,
  counts: { adults: 1, children: 0, elderly: 0 },
  travelers: {},
  dietary: [],
  dietaryNote: "",
  otherNotes: "",
  pace: null,
  interests: [],
  arrivalDate: null,
  duration: null,
  budget: 0,
  currency: "USD",
  style: null,
  breakdown: { ...defaultBreakdown },
  guide: false,
}

export type TravelerRef = { id: string; label: string }

export function buildTravelers(party: Party | null, counts: TravelerCounts): TravelerRef[] {
  if (party === "solo") return [{ id: "you", label: "You" }]
  if (!party) return []
  const list: TravelerRef[] = []
  for (let i = 0; i < counts.adults; i++) list.push({ id: `adult-${i}`, label: `Adult ${i + 1}` })
  for (let i = 0; i < counts.children; i++) list.push({ id: `child-${i}`, label: `Child ${i + 1}` })
  for (let i = 0; i < counts.elderly; i++) list.push({ id: `elderly-${i}`, label: `Elderly ${i + 1}` })
  return list
}

export function toggleWithExclusive(current: string[], tag: string, exclusive: string): string[] {
  if (tag === exclusive) return current.includes(exclusive) ? [] : [exclusive]
  const base = current.filter((t) => t !== exclusive)
  return base.includes(tag) ? base.filter((t) => t !== tag) : [...base, tag]
}
