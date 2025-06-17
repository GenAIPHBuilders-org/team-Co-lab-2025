"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CompanionAvatar } from "./companion-avatar"
import { Badge } from "./ui/badge"

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
  const [companions, setCompanions] = useState<CompanionsData["companions"]>({
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

  const handleSelect = (companionName: string) => {
    setCompanions(companions)
    onSelect(companionName)
    localStorage.setItem("selectedCompanion", companionName)
  }
  useEffect(() => {
    const savedCompanion = localStorage.getItem("selectedCompanion")
    if (savedCompanion && !selectedCompanion) {
      onSelect(savedCompanion)
    }
  }, [onSelect, selectedCompanion])

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
    <div className="grid grid-cols-2 gap-6 w-full">
      <AnimatePresence>
        {Object.entries(companions).map(([name, details]) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={cn(
                "p-3 w-full cursor-pointer border-2 transition-all duration-200 h-full",
                getCompanionColor(name),
                selectedCompanion === name ? "ring-2 ring-[#9F8DFC] shadow-lg" : "hover:shadow-md",
              )}
              onClick={() => handleSelect(name)}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex-shrink-0">
                  <CompanionAvatar name={name} className="mb-1" size="lg" />
                </div>
                <div className="flex-grow w-full">
                  <div className="flex flex-col items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xl">{name}</h3>
                      <AnimatePresence>
                        {selectedCompanion === name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="h-5 w-5 rounded-full bg-[#9F8DFC] flex items-center justify-center"
                          >
                            <Check className="h-3 w-3 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className="text-base text-muted-foreground">{details.title}</p>
                  </div>
                  <p className="text-sm mb-2">{details.personality}</p>
                  <Badge variant="outline" className={`text-xs text-muted-foreground ${getCompanionColor(name)}`}>Motivation style: {details.motivation_style}</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
