import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompanionAvatar } from "@/components/companion-avatar"
import { Zap } from "lucide-react"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { motion } from "framer-motion"

interface QuizExplanationProps {
  explanation: string
  companion: string
  showExplanation: boolean
}

export function QuizExplanation({ explanation, companion, showExplanation }: QuizExplanationProps) {
  if (!showExplanation) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-indigo-950/80 border-indigo-500 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="flex items-center gap-4 mb-6 w-full">
              <div className="relative">
                <CompanionAvatar
                  name={companion}
                  size="lg"
                  className="shadow-lg border-2 border-[#9F8DFC]"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9F8DFC] text-white text-xs px-2 py-0.5 rounded-full shadow">
                  Guide
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">{companion}</span>
                <span className="text-xs text-gray-400">Your AI Learning Companion</span>
                <span className="text-xs text-[#9F8DFC] mt-1 font-semibold">Level 1</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center rounded-full p-2 bg-gradient-to-r from-blue-500 to-purple-500">
              <Zap className="h-5 w-5 text-white-300 animate-bounce" />
            </span>
            <span className="font-semibold text-blue-200 text-lg">Guide</span>
          </div>
          <div className="relative bg-blue-900/60 border-l-4 border-blue-400 rounded-md p-4 shadow-lg">
            <div className="absolute -left-3 top-4">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-400 animate-pulse"></span>
            </div>
            <TypingAnimation duration={20} className="text-blue-100 text-md">
              {explanation}
            </TypingAnimation>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 