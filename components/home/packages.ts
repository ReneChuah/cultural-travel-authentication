export type TravelPackage = {
  id: string
  country: string
  image: string
  headline: string
  description: string
}

export const packages: TravelPackage[] = [
  {
    id: "paris",
    country: "France",
    image: "/packages/paris.png",
    headline: "Paris Olympics aftermath: flights 50% off",
    description: "The crowds have gone home — walk a calmer city and save big on autumn fares.",
  },
  {
    id: "kyoto",
    country: "Japan",
    image: "/packages/kyoto.png",
    headline: "Kyoto after the blossoms: temple stays half price",
    description: "Trade the cherry-blossom rush for quiet gardens, tea houses, and cheaper ryokan nights.",
  },
  {
    id: "rio",
    country: "Brazil",
    image: "/packages/rio.png",
    headline: "Post-Carnival Rio: beaches half empty",
    description: "Samba season is over, so the sands are open and the beachfront hotels are discounted.",
  },
  {
    id: "iceland",
    country: "Iceland",
    image: "/packages/iceland.png",
    headline: "Northern Lights peak: aurora lodges discounted",
    description: "Chase the clearest skies of the year from cozy cabins at their lowest rates.",
  },
  {
    id: "jaipur",
    country: "India",
    image: "/packages/jaipur.png",
    headline: "Diwali in Jaipur: cultural tours from $39",
    description: "Lantern-lit palaces and festival markets — join a small-group cultural tour for less.",
  },
]
