"use client"
// Future improvements: refactor to use a single modal component for all topics, add animations, and improve accessibility.
// Future improvements: refactor this component.
import { useState } from "react"
import {
  Calculator,
  FlaskRoundIcon as Flask,
  Lock,
  ChevronRight,
  Star,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Difficulty = "beginner" | "intermediate" | "advanced"

interface DifficultyConfig {
  label: string
  color: string
  textColor: string
  level: number
  stats: {
    strength: number
    intelligence: number
    endurance: number
  }
}

const difficultyMap: Record<Difficulty, DifficultyConfig> = {
  beginner: {
    label: "Beginner",
    color: "bg-green-100",
    textColor: "text-green-700",
    level: 1,
    stats: {
      strength: 3,
      intelligence: 5,
      endurance: 4,
    },
  },
  intermediate: {
    label: "Intermediate",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    level: 5,
    stats: {
      strength: 6,
      intelligence: 8,
      endurance: 7,
    },
  },
  advanced: {
    label: "Advanced",
    color: "bg-red-100",
    textColor: "text-red-700",
    level: 10,
    stats: {
      strength: 9,
      intelligence: 12,
      endurance: 10,
    },
  },
}

const topics = [
  {
    id: 1,
    name: "Mathematics",
    icon: Calculator,
    color: "bg-orange-100 text-orange-600",
    locked: false,
    difficulty: "beginner" as Difficulty,
    description: "Master the fundamentals of mathematics including arithmetic, algebra, and basic geometry.",
    rewards: ["AI Companion", "200 XP", "Math Wizard Badge"],
  },
  {
    id: 2,
    name: "Science",
    icon: Flask,
    color: "bg-green-100 text-green-600",
    locked: true,
    difficulty: "beginner" as Difficulty,
    description: "Explore the natural world through scientific inquiry and experimentation.",
    rewards: ["Scientific Method Mastery", "Observation +3", "Analytical Thinking"],
  },
]

export function TopicSelectionCard() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmingTopic, setConfirmingTopic] = useState<(typeof topics)[0] | null>(null)

  const handleTopicClick = (topic: (typeof topics)[0]) => {
    if (!topic.locked) {
      setConfirmingTopic(topic)
      setModalOpen(true)
    }
  }

  const handleConfirm = () => {
    if (confirmingTopic) {
      setSelectedTopic(confirmingTopic.id)
      setModalOpen(false)
    }
  }

  return (
    <>
      <TooltipProvider>
        <Card className="overflow-hidden h-64">
          <CardHeader className="">
            <CardTitle className="text-lg">Educational Topics</CardTitle>
            <CardDescription>Select a topic to explore</CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-2 gap-2">
              {topics.map((topic) => {
                const Icon = topic.icon

                const topicButton = (
                  <Button
                    key={topic.id}
                    variant="outline"
                    className={cn(
                      "h-auto flex-col gap-2 p-4 justify-start items-center border border-[#9F8DFC] relative",
                      selectedTopic === topic.id ? "border-slate-400 bg-slate-50" : "border-[#9F8DFC]",
                      topic.locked ? "opacity-80" : "",
                    )}
                    onClick={() => handleTopicClick(topic)}
                    disabled={topic.locked}
                  >
                    <div className={cn("rounded-full p-2", topic.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium text-[#9F8DFC]">{topic.name}</span>
                    {topic.locked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-500/70 rounded-sm">
                        <Lock className="h-4 w-4 text-slate-100" />
                      </div>
                    )}
                    {!topic.locked && (
                      <div
                        className={cn(
                          "absolute top-1 right-1 px-1.5 py-0.5 rounded-sm text-[10px] font-medium",
                          difficultyMap[topic.difficulty].color,
                          difficultyMap[topic.difficulty].textColor,
                        )}
                      >
                        {difficultyMap[topic.difficulty].label}
                      </div>
                    )}
                  </Button>
                )

                return topic.locked ? (
                  <TooltipProvider key={topic.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>{topicButton}</TooltipTrigger>
                      <TooltipContent>
                        <p>Complete previous topics to unlock</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  topicButton
                )
              })}
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md border-0 bg-gray-900/80 text-white shadow-[0_0_15px_rgba(159,141,252,0.5)] overflow-hidden p-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-10"></div>

          <button
            onClick={() => setModalOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 text-[#9F8DFC]" />
            <span className="sr-only">Close</span>
          </button>

          <div className="relative z-10">
            <DialogHeader className="border-b border-[#9F8DFC]/50 bg-gradient-to-r from-[#9F8DFC] to-gray-900 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#9F8DFC]">
                    <Star className="h-4 w-4 text-[#9F8DFC]" />
                  </div>
                  <DialogTitle className="text-xl font-bold ">QUEST CONFIRMATION</DialogTitle>
                </div>
                {confirmingTopic && (
                  <div className="flex items-center gap-1 rounded-full bg-[#9F8DFC] px-3 py-1 text-xs font-bold ">
                    <span>LVL {difficultyMap[confirmingTopic.difficulty].level}</span>
                  </div>
                )}
              </div>
              {confirmingTopic && (
                <DialogDescription className="mt-2 text-lg font-medium ">
                  {confirmingTopic.name}
                </DialogDescription>
              )}
            </DialogHeader>

            {confirmingTopic && (
              <div className="p-6">
                <div className="mb-4 rounded-md bg-gray-800/50 p-4">
                  <p className="text-sm text-gray-300">{confirmingTopic.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-bold text-[#9F8DFC]">REWARDS</h4>
                  <ul className="space-y-2">
                    {confirmingTopic.rewards.map((reward, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#9F8DFC]"></div>
                        <span className="text-gray-300">{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setModalOpen(false)}
                    className="mb-2 border-gray-700 bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white sm:mb-0"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    className="relative overflow-hidden bg-gradient-to-r from-[#9F8DFC] to-[#9F8DFC] text-white hover:from-[#9F8DFC] hover:to-[#9F8DFC]"
                  >
                    <span className="relative z-10 flex items-center font-bold">
                      Confirm <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="h-full w-full bg-[#9F8DFC]/20"></span>
                    </span>
                  </Button>
                </DialogFooter>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
