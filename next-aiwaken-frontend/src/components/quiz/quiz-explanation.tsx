import { CompanionAvatar } from "@/components/companion-avatar"
import { Check } from "lucide-react"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { AnimatedModal } from "@/components/dialog/animated-modal"
import { useAuthentication } from "@/contexts/auth-context"
import { Badge } from "../ui/badge"

interface QuizExplanationProps {
  explanation: string
  companion: string
  showExplanation: boolean
  onClose: () => void
}

export function QuizExplanation({ explanation, companion, showExplanation, onClose }: QuizExplanationProps) {
  const { user } = useAuthentication();
  if (!showExplanation) return null

  return (
    <AnimatedModal
      isOpen={showExplanation}
      onClose={onClose}
      showCloseButton={true}
      size="xl"
    >
      <div className="flex items-center gap-4 w-full mb-10 py-4">
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
          <span className="text-xs text-[#9F8DFC] mt-1 font-semibold">Level {user?.stats.level}</span>
        </div>
      </div>
      <div className="bg-indigo-950/80 border-green-500 text-white rounded-lg p-3">
        <Badge variant="outline" className="my-2 text-green-200 bg-green-700 w-full py-2 text-lg">Correct!</Badge>
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center rounded-full p-2 bg-gradient-to-r from-lime-600 to-lime-200">
            <Check className="h-5 w-5 text-white-300 animate-bounce" />
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
      </div>
    </AnimatedModal>
  )
}