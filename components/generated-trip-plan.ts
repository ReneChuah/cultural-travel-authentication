"use client"

import type { TripPlan } from "@/components/trip-plan/data"

const KEY = "wanderlore.generatedTrip"

export function saveGeneratedTripPlan(plan: TripPlan) {
  try {
    localStorage.setItem(KEY, JSON.stringify(plan))
  } catch {
    // ignore write failures
  }
}

export function loadGeneratedTripPlan(): TripPlan | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as TripPlan) : null
  } catch {
    return null
  }
}