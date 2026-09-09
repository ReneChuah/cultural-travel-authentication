"use client"

import { useEffect, useState } from "react"

export type TripSelection = {
  destinationName: string
  regionName: string | null
  budget: number
  guide: boolean
  travelers: number
  pace: string | null
  dietary: string[]
  travelerHealth: Record<string, { tags: string[]; note: string }>
  otherNotes: string
  interests: string[]
  arrivalDate: string | null   
  duration: string | null     
}

const NIGHTS_BY_DURATION: Record<string, number> = {
  "Weekend": 2,
  "3-5 days": 4,
  "1 week": 7,
  "Custom": 3,
}

export function getNights(duration: string | null): number {
  return duration ? (NIGHTS_BY_DURATION[duration] ?? 3) : 3
}

export function formatTripDates(selection: TripSelection): string {
  if (!selection.arrivalDate) return "Dates to be confirmed"
  const nights = getNights(selection.duration)
  const start = new Date(`${selection.arrivalDate}T00:00:00`)
  const end = new Date(start)
  end.setDate(end.getDate() + nights)

  const fmt = (d: Date) => d.toLocaleDateString("en-US", { day: "numeric", month: "short" })
  const year = end.getFullYear()
  return `${fmt(start)} – ${fmt(end)} ${year}`
}

const KEY = "wanderlore.trip"

export const defaultSelection: TripSelection = {
  destinationName: "Kyoto",
  regionName: "Kyoto",
  budget: 6000,
  guide: true,
  travelers: 2,
  pace: "Relaxed",
  dietary: [],
  travelerHealth: {},
  otherNotes: "",
  interests: [],
  arrivalDate: null,
  duration: null,
}

export function saveTripSelection(sel: TripSelection) {
  try {
    localStorage.setItem(KEY, JSON.stringify(sel))
  } catch {
    // ignore write failures (private mode, quota, SSR)
  }
}

export function loadTripSelection(): TripSelection | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...defaultSelection, ...(JSON.parse(raw) as Partial<TripSelection>) } : null
  } catch {
    return null
  }
}

/**
 * Reads the persisted survey selection on the client. Renders the mock default
 * first (matching SSR) then hydrates with the real choice from localStorage.
 */
export function useTripSelection(): TripSelection {
  const [selection, setSelection] = useState<TripSelection>(defaultSelection)

  useEffect(() => {
    const loaded = loadTripSelection()
    if (loaded) setSelection(loaded)
  }, [])

  return selection
}
