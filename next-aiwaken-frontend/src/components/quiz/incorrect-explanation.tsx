import { CompanionAvatar } from "@/components/companion-avatar"
import { XCircle } from "lucide-react"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { AnimatedModal } from "@/components/ui/animated-modal"

interface IncorrectExplanationProps {
  incorrectExplanation: Record<string, string>
  selectedAnswer: string
  companion: string
  showExplanation: boolean
}

export function IncorrectExplanation({
  incorrectExplanation,
  selectedAnswer,
  companion,
  showExplanation,
}: IncorrectExplanationProps) {
  if (!showExplanation || !selectedAnswer || !incorrectExplanation[selectedAnswer]) return null

  return (
    <AnimatedModal
      isOpen={showExplanation}
      showCloseButton={true}
      size="xl"
    >
      <div className="flex items-center gap-4 w-full mb-10 py-4">
        <div className="relative">
          <CompanionAvatar
            name={companion}
            size="lg"
            className="shadow-lg border-2 border-[#F87171]"
          />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#F87171] text-white text-xs px-2 py-0.5 rounded-full shadow">
            Guide
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-white">{companion}</span>
          <span className="text-xs text-gray-400">Your AI Learning Companion</span>
          <span className="text-xs text-[#F87171] mt-1 font-semibold">Level 1</span>
        </div>
      </div>
      <div className="bg-red-950/80 border border-red-500 text-white rounded-lg p-3">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center rounded-full p-2 bg-gradient-to-r from-red-500 to-pink-500">
            <XCircle className="h-5 w-5 text-white-300 animate-bounce" />
          </span>
          <span className="font-semibold text-red-200 text-lg">Incorrect</span>
        </div>
        <div className="relative bg-red-900/60 border-l-4 border-red-400 rounded-md p-4 shadow-lg">
          <div className="absolute -left-3 top-4">
            <span className="inline-block h-3 w-3 rounded-full bg-red-400 animate-pulse"></span>
          </div>
          <TypingAnimation duration={20} className="text-red-100 text-md">
            {incorrectExplanation[selectedAnswer]}
          </TypingAnimation>
        </div>
      </div>
    </AnimatedModal>
  )
}
