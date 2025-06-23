import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calculator } from "lucide-react"

interface QuizBossProps {
  bossHealth: number
  currentQuestionIndex: number
  totalQuestions: number
  damageAnimation: boolean
  getBossState: () => string
}

export function QuizBoss({
  bossHealth,
  currentQuestionIndex,
  totalQuestions,
  damageAnimation,
  getBossState,
}: QuizBossProps) {
  return (
    <div className={`mb-6 ${getBossState() === "critical" ? "bg-red-900/80" : getBossState() === "weakened" ? "bg-yellow-900/80" : "bg-purple-950/80"} rounded-lg p-4 border border-purple-500 max-w-7xl mx-auto`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Avatar
            className={`h-10 w-10 border-2 ${getBossState() === "critical" ? "border-red-500 animate-pulse" : getBossState() === "weakened" ? "border-yellow-500" : "border-purple-400"}`}
          >
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Quizmaster" />
            <AvatarFallback className="bg-purple-800 text-white">
              <Calculator className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold">Cunning Quizmaster</h3>
            <p className="text-xs text-purple-300">
              {getBossState() === "critical"
                ? "Nearly defeated!"
                : getBossState() === "weakened"
                  ? "Weakening..."
                  : "Full of quantum tricks"}
            </p>
          </div>
        </div>
        <div className="text-sm font-bold">
          Question {currentQuestionIndex + 1}/{totalQuestions}
        </div>
      </div>
      <div className="relative">
        <Progress
          value={bossHealth}
          className={`h-4 ${damageAnimation ? "animate-pulse" : ""} ${getBossState() === "critical"
              ? "bg-red-900 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-700"
              : getBossState() === "weakened"
                ? "bg-yellow-900 [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-orange-400"
                : "bg-purple-900 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-indigo-500"
            }`}
        />
        <span className="absolute top-0 right-2 text-xs font-bold text-white">{Math.round(bossHealth)}%</span>
      </div>
    </div>
  )
} 