"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CompanionAvatar } from "./companion-avatar"

type Companion = {
  title: string
  personality: string
  motivation_style: string
}

type CompanionsData = {
  companions: {
    [key: string]: Companion
  }
}

interface CompanionSelectionProps {
  onSelect: (companionName: string) => void
  selectedCompanion: string | null
}

export function CompanionSelection({ onSelect, selectedCompanion }: CompanionSelectionProps) {
  const [companions,] = useState<CompanionsData["companions"]>({
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
    },
  })

  // Get companion color based on name
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(companions).map(([name, details]) => (
        <motion.div key={name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card
            className={cn(
              "p-4 cursor-pointer border-2 transition-all duration-200",
              getCompanionColor(name),
              selectedCompanion === name ? "shadow-md" : "hover:shadow-sm",
            )}
            onClick={() => onSelect(name)}
          >
            <div className="flex flex-col items-center text-center mb-3">
              <CompanionAvatar name={name} className="mb-3" />
              <div className="flex items-center justify-center">
                <h3 className="font-bold text-lg">{name}</h3>
                {selectedCompanion === name && (
                  <div className="h-5 w-5 rounded-full bg-[#9F8DFC] flex items-center justify-center ml-2">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{details.title}</p>
            </div>
            <p className="mt-3 text-sm">{details.personality}</p>
            <p className="mt-2 text-xs text-muted-foreground">Motivation style: {details.motivation_style}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
