export type Festival = {
  id: string
  name: string
  location: string
  dates: string
  image: string
  month: number // 0-11
}

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export const festivals: Festival[] = [
  {
    id: "cny",
    name: "Lantern Festival",
    location: "Pingxi, Taiwan",
    dates: "Feb 12 – 15",
    image: "/festivals/lantern-cny.png",
    month: 1,
  },
  {
    id: "venice",
    name: "Carnival of Venice",
    location: "Venice, Italy",
    dates: "Feb 8 – 25",
    image: "/festivals/venice.png",
    month: 1,
  },
  {
    id: "holi",
    name: "Holi Festival of Colours",
    location: "Mathura, India",
    dates: "Mar 13 – 14",
    image: "/festivals/holi.png",
    month: 2,
  },
  {
    id: "songkran",
    name: "Songkran Water Festival",
    location: "Chiang Mai, Thailand",
    dates: "Apr 13 – 15",
    image: "/festivals/songkran.png",
    month: 3,
  },
  {
    id: "gion",
    name: "Gion Matsuri",
    location: "Kyoto, Japan",
    dates: "Jul 1 – 31",
    image: "/festivals/gion.png",
    month: 6,
  },
  {
    id: "oktoberfest",
    name: "Oktoberfest",
    location: "Munich, Germany",
    dates: "Sep 20 – Oct 5",
    image: "/festivals/oktoberfest.png",
    month: 8,
  },
  {
    id: "dayofdead",
    name: "Día de los Muertos",
    location: "Oaxaca, Mexico",
    dates: "Oct 31 – Nov 2",
    image: "/festivals/dayofdead.png",
    month: 9,
  },
  {
    id: "diwali",
    name: "Diwali Festival of Lights",
    location: "Jaipur, India",
    dates: "Nov 1 – 5",
    image: "/festivals/diwali.png",
    month: 10,
  },
]
