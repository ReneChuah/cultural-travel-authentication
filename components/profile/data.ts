import type { LucideIcon } from "lucide-react"
import { Bell, CreditCard, HelpCircle, Settings } from "lucide-react"

export type SavedItem = {
  id: string
  name: string
  place: string
  image: string
}

export type Voucher = {
  id: string
  value: string
  detail: string
  code: string
  expiry: string
}

export type OfflineItem = {
  id: string
  name: string
  meta: string
  sizeMb: number
  downloaded: boolean
}

export const rewardPoints = 1250

export const referralLink = "wanderlore.app/r/maya-4x2k"

export const bookmarks: SavedItem[] = [
  { id: "kyoto", name: "Kyoto temple stays", place: "Japan", image: "/packages/kyoto.png" },
  { id: "iceland", name: "Aurora lodges", place: "Iceland", image: "/packages/iceland.png" },
  { id: "jaipur", name: "Diwali in Jaipur", place: "India", image: "/packages/jaipur.png" },
  { id: "venice", name: "Carnival of Venice", place: "Italy", image: "/festivals/venice.png" },
  { id: "gion", name: "Gion Matsuri", place: "Japan", image: "/festivals/gion.png" },
  { id: "songkran", name: "Songkran festival", place: "Thailand", image: "/festivals/songkran.png" },
]

export const history: SavedItem[] = [
  { id: "paris", name: "Paris flights 50% off", place: "France", image: "/packages/paris.png" },
  { id: "rio", name: "Post-Carnival Rio", place: "Brazil", image: "/packages/rio.png" },
  { id: "korea", name: "Autumn in Seoul", place: "South Korea", image: "/countries/korea.png" },
  { id: "china", name: "Great Wall trek", place: "China", image: "/countries/china.png" },
  { id: "holi", name: "Holi colours", place: "India", image: "/festivals/holi.png" },
]

export const offlineTickets: OfflineItem[] = [
  { id: "t1", name: "Fushimi Inari entry", meta: "12 Apr · 08:30", sizeMb: 1.2, downloaded: true },
  { id: "t2", name: "Kiyomizu-dera temple", meta: "12 Apr · 15:00", sizeMb: 0.9, downloaded: true },
  { id: "t3", name: "Tea ceremony pass", meta: "14 Apr · 10:00", sizeMb: 1.1, downloaded: false },
  { id: "t4", name: "Pottery workshop", meta: "14 Apr · 16:00", sizeMb: 0.8, downloaded: false },
]

export const offlineMaps: OfflineItem[] = [
  { id: "m1", name: "Central Kyoto", meta: "Gion · Higashiyama", sizeMb: 42, downloaded: true },
  { id: "m2", name: "Arashiyama district", meta: "Bamboo grove area", sizeMb: 28, downloaded: false },
  { id: "m3", name: "Fushimi ward", meta: "Inari shrine trails", sizeMb: 31, downloaded: false },
]

export const vouchers: Voucher[] = [
  { id: "v1", value: "RM50 off", detail: "Min. spend RM500 on any package", code: "WANDER50", expiry: "31 Dec 2026" },
  { id: "v2", value: "15% off", detail: "Guided cultural tours", code: "CULTURE15", expiry: "30 Sep 2026" },
  { id: "v3", value: "RM120 off", detail: "Flights + hotel bundles", code: "FLYSTAY120", expiry: "15 Nov 2026" },
]

export const accountSettings: { label: string; icon: LucideIcon }[] = [
  { label: "Account settings", icon: Settings },
  { label: "Payment methods", icon: CreditCard },
  { label: "Notifications", icon: Bell },
  { label: "Help & support", icon: HelpCircle },
]
