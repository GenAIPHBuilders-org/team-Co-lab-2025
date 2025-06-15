"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Star, Crown } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for leaderboard
const leaderboardData = [
  {
    id: 1,
    name: "Alex Johnson",
    level: 42,
    xp: 12500,
    avatar: "/placeholder.svg",
    streak: 15,
    rank: 1,
  },
  {
    id: 2,
    name: "Sarah Chen",
    level: 38,
    xp: 11200,
    avatar: "/placeholder.svg",
    streak: 12,
    rank: 2,
  },
  {
    id: 3,
    name: "Michael Brown",
    level: 35,
    xp: 9800,
    avatar: "/placeholder.svg",
    streak: 10,
    rank: 3,
  },
  {
    id: 4,
    name: "Emma Wilson",
    level: 32,
    xp: 8900,
    avatar: "/placeholder.svg",
    streak: 8,
    rank: 4,
  },
  {
    id: 5,
    name: "David Lee",
    level: 30,
    xp: 8500,
    avatar: "/placeholder.svg",
    streak: 7,
    rank: 5,
  },
]

const RankIcon = ({ rank }: { rank: number }) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-400" />
    case 2:
      return <Trophy className="h-6 w-6 text-gray-400" />
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />
    default:
      return <Star className="h-6 w-6 text-purple-400" />
  }
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-950 text-white">
      <div className="container mx-auto mt-12 py-12 px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-slate-400">Top learners this month</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${index === 0 ? "md:mt-[-2rem]" : index === 1 ? "md:mt-[-1rem]" : ""
                }`}
            >
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20 border-4 border-purple-500">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2">
                        <RankIcon rank={user.rank} />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-sm text-slate-400">Level {user.level}</p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                          {user.xp} XP
                        </Badge>
                        <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                          {user.streak} day streak
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle>All Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <RankIcon rank={user.rank} />
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-slate-400">Level {user.level}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                      {user.xp} XP
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                      {user.streak} day streak
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
