export type OrderStatus = "confirmed" | "completed"

export type LineItem = {
  label: string
  detail?: string
  price: number
}

export type Order = {
  id: string
  reference: string
  destination: string
  country: string
  image: string
  dates: string
  status: OrderStatus
  bookingDate: string
  paymentMask: string
  items: LineItem[]
}

export const currency = "RM"

export const upcomingOrders: Order[] = [
  {
    id: "kyoto",
    reference: "TRV-48291",
    destination: "Kyoto",
    country: "Japan",
    image: "/packages/kyoto.png",
    dates: "12 – 14 Apr 2026",
    status: "confirmed",
    bookingDate: "5 Sep 2026",
    paymentMask: "4242",
    items: [
      { label: "Flights", detail: "2 travelers · round trip", price: 2600 },
      { label: "The Machiya Ryokan", detail: "2 nights", price: 640 },
      { label: "Local guide", detail: "Aiko Tanaka · 3 days", price: 750 },
      { label: "Activities & experiences", detail: "estimate", price: 555 },
      { label: "Travel insurance", price: 265 },
    ],
  },
  {
    id: "iceland",
    reference: "TRV-51730",
    destination: "Reykjavík",
    country: "Iceland",
    image: "/packages/iceland.png",
    dates: "3 – 7 Nov 2026",
    status: "confirmed",
    bookingDate: "18 Aug 2026",
    paymentMask: "4242",
    items: [
      { label: "Flights", detail: "2 travelers · round trip", price: 3200 },
      { label: "Aurora Lodge", detail: "4 nights", price: 1520 },
      { label: "Activities & experiences", detail: "aurora tour · estimate", price: 480 },
      { label: "Travel insurance", price: 220 },
    ],
  },
]

export const pastOrders: Order[] = [
  {
    id: "paris",
    reference: "TRV-40118",
    destination: "Paris",
    country: "France",
    image: "/packages/paris.png",
    dates: "5 – 9 Sep 2025",
    status: "completed",
    bookingDate: "12 Jun 2025",
    paymentMask: "4242",
    items: [
      { label: "Flights", detail: "2 travelers · round trip", price: 1800 },
      { label: "Hôtel Le Marais", detail: "3 nights", price: 960 },
      { label: "Local guide", detail: "Camille Roy · 2 days", price: 460 },
      { label: "Activities & experiences", detail: "estimate", price: 380 },
      { label: "Travel insurance", price: 180 },
    ],
  },
  {
    id: "jaipur",
    reference: "TRV-33902",
    destination: "Jaipur",
    country: "India",
    image: "/packages/jaipur.png",
    dates: "22 – 27 Oct 2024",
    status: "completed",
    bookingDate: "30 Jul 2024",
    paymentMask: "8817",
    items: [
      { label: "Flights", detail: "1 traveler · round trip", price: 1500 },
      { label: "Rambagh Heritage Stay", detail: "4 nights", price: 720 },
      { label: "Activities & experiences", detail: "cultural tour · estimate", price: 320 },
      { label: "Travel insurance", price: 150 },
    ],
  },
]

export function orderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.price, 0)
}
