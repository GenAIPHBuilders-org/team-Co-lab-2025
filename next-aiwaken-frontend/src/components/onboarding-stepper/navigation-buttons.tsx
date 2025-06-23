import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface NavigationButtonsProps {
  onPrevious: () => void
  onNext?: () => void
  isPreviousDisabled: boolean
  isNextDisabled: boolean
  isLastStep?: boolean
  className?: string
  showOnlyPreviousButton?: boolean
  isLoading?: boolean
}

export const NavigationButtons = ({
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
  isLastStep = false,
  className = "",
  showOnlyPreviousButton = false,
  isLoading = false
}: NavigationButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`w-full max-w-3xl flex justify-between items-center px-4 ${className}`}
    >

      <Button
        variant="ghost"
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800/50 px-6 py-2"
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      {!showOnlyPreviousButton && (
        <Button
          className="flex items-center gap-2 bg-[#9F8DFC] text-white hover:bg-[#9F8DFC]/90 transition-colors px-6 py-2"
          onClick={onNext}
          disabled={isNextDisabled}
          loading={isLoading}
        >
          {isLastStep ? "Finish" : "Proceed"}
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
        </Button>
      )}

    </motion.div>
  )
} 