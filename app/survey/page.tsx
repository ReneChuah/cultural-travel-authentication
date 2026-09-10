import type { Metadata } from "next"
import { SurveyWizard } from "@/components/survey/survey-wizard"

export const metadata: Metadata = {
  title: "Plan your trip — Roamio",
  description: "Tell us a few things and we'll craft a cultural itinerary made for you.",
}

export default function SurveyPage() {
  return <SurveyWizard />
}
