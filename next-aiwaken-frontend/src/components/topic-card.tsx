"use client"

import { Lock, Sparkles, Code, BookOpen, Calculator, Beaker, Globe, Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { Difficulty, TopicCardProps } from "@/types/topic"
import { difficultyMap } from "@/constants/topics"

const getTopicIcon = (topicName: string) => {
  const name = topicName.toLowerCase()
  if (name.includes("python") || name.includes("programming") || name.includes("code")) {
    return Code
  }
  if (name.includes("math") || name.includes("algebra") || name.includes("calculus")) {
    return Calculator
  }
  if (name.includes("science") || name.includes("chemistry") || name.includes("physics")) {
    return Beaker
  }
  if (name.includes("english") || name.includes("literature") || name.includes("writing")) {
    return BookOpen
  }
  if (name.includes("art") || name.includes("design")) {
    return Palette
  }
  if (name.includes("geography") || name.includes("history")) {
    return Globe
  }
  return Sparkles
}

export function TopicCard({ topic, isSelected, onClick }: TopicCardProps) {
  const IconComponent = getTopicIcon(topic.name)
  const difficultyConfig = difficultyMap[topic.difficulty as Difficulty]

  const cardContent = (
    <motion.div
      className="relative group h-full"
      whileHover={{ scale: topic.locked ? 1 : 1.02 }}
      whileTap={{ scale: topic.locked ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="outline"
        className={cn(
          "h-full w-full flex-col gap-3 p-6 justify-center items-center relative overflow-hidden",
          "bg-gray-800/50 border-gray-700 hover:border-indigo-500/50 transition-all duration-300",
          "backdrop-blur-sm min-h-[140px]",
          isSelected && "border-indigo-500 bg-indigo-500/10",
          topic.locked && "opacity-60 cursor-not-allowed",
        )}
        onClick={() => !topic.locked && onClick(topic)}
        disabled={topic.locked}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {!topic.locked && (
          <Badge
            variant="secondary"
            className={cn(
              "absolute top-2 right-2 text-[10px] font-medium px-2 py-1",
              difficultyConfig.color,
              difficultyConfig.textColor,
              "border-0",
            )}
          >
            {difficultyConfig.label}
          </Badge>
        )}

        <motion.div
          className={cn(
            "rounded-xl p-3 mb-2 relative",
            topic.locked
              ? "bg-gray-700/50"
              : "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30",
          )}
          whileHover={{ rotate: topic.locked ? 0 : 5 }}
          transition={{ duration: 0.2 }}
        >
          <IconComponent
            className={cn(
              "h-6 w-6 transition-colors duration-300",
              topic.locked ? "text-gray-500" : "text-indigo-400 group-hover:text-indigo-300",
            )}
          />
        </motion.div>

        <span
          className={cn(
            "text-sm font-medium text-center leading-tight transition-colors duration-300",
            topic.locked ? "text-gray-500" : "text-gray-200 group-hover:text-white",
          )}
        >
          {topic.name}
        </span>

        {!topic.locked && topic.completion_percentage > 0 && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${topic.completion_percentage}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
        )}

        {topic.locked && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-gray-700/50 rounded-full">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Locked</span>
            </div>
          </motion.div>
        )}

        {topic.is_completed && (
          <div className="absolute top-2 left-2">
            <div className="p-1 bg-green-500 rounded-full">
              <motion.svg
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </motion.svg>
            </div>
          </div>
        )}
      </Button>

      {topic.locked && (
        <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <motion.div
            className="bg-gray-900 text-gray-200 text-xs p-2 rounded-lg shadow-lg mb-2 max-w-[200px] text-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            Reach level {topic.min_level_required} to unlock this topic
          </motion.div>
        </div>
      )}
    </motion.div>
  )

  return cardContent
}
