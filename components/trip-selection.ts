"use client"

import { useEffect, useState } from "react"

export type TripSelection = {
  destinationName: string
  regionName: string | null
  budget: number
  guide: boolean
  travelers: number
  pace: string | null
}

const KEY = "wanderlore.trip"

export const defaultSelection: TripSelection = {
  destinationName: "Kyoto",
  regionName: "Kyoto",
  budget: 6000,
  guide: true,
  travelers: 2,
  pace: "Relaxed",
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
