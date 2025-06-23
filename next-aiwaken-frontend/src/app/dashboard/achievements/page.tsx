"use server"
import { fetchSsrUserAchievements } from "@/services/ssr/fetch-achievements"
import { Overview } from "./tab-components/overview"

export default async function UserProfile() {
  const achievements = await fetchSsrUserAchievements();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-950 text-white">
      <div className="container mx-auto mt-12 py-12 px-4 space-y-8">
        <Overview achievements={achievements} />
      </div>
    </div>

  )
}