import type { Metadata } from "next"
import { ProfileClient } from "@/components/profile/profile-client"

export const metadata: Metadata = {
  title: "Profile — Roamio",
  description: "Manage your rewards, bookmarks, offline access, vouchers, and account settings.",
}

export default function ProfilePage() {
  return <ProfileClient />
}
