"use server"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { BookOpen, Clock, Award, Flame } from "lucide-react"
// import { motion } from "framer-motion"
import { fetchSsrUserAchievements } from "@/services/ssr/fetch-achievements"
import { Overview } from "./tab-components/overview"

// // Mock data for stats
// const stats = [
//   { label: "Courses Completed", value: "2", icon: <BookOpen className="h-5 w-5" /> },
//   { label: "Total Learning Hours", value: "24", icon: <Clock className="h-5 w-5" /> },
//   { label: "Achievements Unlocked", value: "4", icon: <Award className="h-5 w-5" /> },
//   { label: "Current Streak", value: "7 days", icon: <Flame className="h-5 w-5" /> },
// ]

export default async function UserProfile() {
  const achievements = await fetchSsrUserAchievements();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-950 text-white">
      <div className="container mx-auto mt-12 py-12 px-4 space-y-8">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-purple-500">
                  <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback className="text-2xl">John Doe</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-500">
                  Level 3
                </Badge>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white">John Doe</h1>
                <p className="text-slate-400">Python Developer</p>
                <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Web Development</Badge>
                  <Badge variant="secondary">Data Science</Badge>
                </div>
              </div>
              <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/10">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div> */}
        <Overview achievements={achievements} />
      </div>
    </div>

  )
}