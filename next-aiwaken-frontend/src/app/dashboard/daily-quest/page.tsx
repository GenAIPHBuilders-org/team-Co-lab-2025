"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Trophy, Star, Target, Flame, Gift, Crown } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for daily quest
const dailyQuest = {
  title: "Python Master Challenge",
  description: "Complete 3 Python coding exercises with 100% accuracy",
  reward: {
    xp: 500,
    coins: 200,
    special: "Python Expert Badge"
  },
  progress: 66,
  timeLeft: "12:45:30",
  difficulty: "Advanced",
  category: "Programming"
}

export default function DailyQuestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-950 text-white">
      <div className="container mx-auto mt-12 py-12 px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-8"
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-10" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">Daily Quest</h1>
                <p className="text-purple-100 mb-4">
                  Hello Mortal, we meet again! Your journey with AIwaken continues, and we have some exciting new challenges for you to conquer.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className="bg-white/20 text-white">
                    <Flame className="h-4 w-4 mr-1" />
                    Daily Streak: 5 days
                  </Badge>
                  <Badge className="bg-white/20 text-white">
                    <Trophy className="h-4 w-4 mr-1" />
                    Quests Completed: 12
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-purple-100 mb-1">Next Quest in</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-200" />
                    <p className="text-2xl font-mono font-bold">{dailyQuest.timeLeft}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today&apos;s Quest</CardTitle>
                <Badge className="bg-purple-500/20 text-purple-400">
                  {dailyQuest.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{dailyQuest.title}</h3>
                <p className="text-slate-400">{dailyQuest.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-purple-400">{dailyQuest.progress}%</span>
                </div>
                <Progress value={dailyQuest.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-slate-400">XP Reward</p>
                    <p className="font-semibold">+{dailyQuest.reward.xp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10">
                  <Gift className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-slate-400">Coins</p>
                    <p className="font-semibold">+{dailyQuest.reward.coins}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10">
                  <Crown className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-slate-400">Special Reward</p>
                    <p className="font-semibold">{dailyQuest.reward.special}</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                <Target className="h-4 w-4 mr-2" />
                Start Quest
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle>Recent Quests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Trophy className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Data Structures Challenge</h3>
                      <p className="text-sm text-slate-400">Completed 2 days ago</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      Completed
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
