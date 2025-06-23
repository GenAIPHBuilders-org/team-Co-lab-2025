"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CompanionAvatar } from "./companion-avatar"
import { motion } from "framer-motion"
import { Sparkles, Heart, Target } from "lucide-react"
import { useAuthentication } from "@/contexts/auth-context"

interface CompanionCardProps {
  className?: string
}

export function CompanionCard({ className }: CompanionCardProps) {
  const { user } = useAuthentication();
  const companion = user?.preferences.companion

  const companionData = {
    Gabriel: {
      title: "The Curious Thinker",
      personality: "Gabriel is curious, thoughtful, and enjoys exploring the 'why' behind concepts",
      motivation_style: "philosophical and thought-provoking",
    },
    Brian: {
      title: "The Calm Strategist",
      personality: "Brian is methodical, patient, and focuses on clarity and precision",
      motivation_style: "structured and methodical",
    },
    Ryan: {
      title: "The Bold Problem-Solver",
      personality: "Ryan is energetic, direct, and takes on challenges head-on",
      motivation_style: "energetic and action-oriented",
    },
    Kent: {
      title: "The Friendly Guide",
      personality: "Kent is supportive, optimistic, and believes in your potential",
      motivation_style: "warm and supportive",
    }
  }

  const currentCompanion = companionData[companion as keyof typeof companionData] || companionData.Gabriel
  const progressPercentage = (user?.stats.experience as number / (user?.stats.experience_to_next_level as number)) * 100

  const getCompanionColor = (name: string) => {
    switch (name) {
      case "Gabriel":
        return "bg-purple-700/10 border-purple-700/30"
      case "Brian":
        return "bg-blue-700/10 border-blue-700/30"
      case "Ryan":
        return "bg-red-700/10 border-red-700/30"
      case "Kent":
        return "bg-green-700/10 border-green-700/30"
      default:
        return "bg-slate-700/10 border-slate-700/30"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`bg-gradient-to-br h-full from-gray-800/50 to-gray-900/50 border-gray-700/50 ${getCompanionColor(companion as string)} ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#9F8DFC]" />
            Your Companion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <CompanionAvatar
                name={companion as string}
                size="lg"
                className="shadow-lg border-2 border-[#9F8DFC]"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9F8DFC] text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                Level {user?.stats.level}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{companion}</h3>
              <p className="text-sm text-gray-300">{currentCompanion.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-xs text-gray-400">AI Learning Partner</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-[#9F8DFC]" />
                <span className="text-sm font-medium text-white">Personality</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{currentCompanion.personality}</p>
            </div>

            <div>
              <Badge variant="outline" className={`text-xs ${getCompanionColor(companion as string)}`}>
                Motivation: {currentCompanion.motivation_style}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Experience</span>
                <span>{user?.stats.experience} / {user?.stats.experience_to_next_level} XP</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#9F8DFC] to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 