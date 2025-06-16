import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useStepperContext } from "@/contexts/stepper-context"
import { Check, LucideIcon } from "lucide-react"
import { useUserPreferences } from "@/hooks/use-preferences"
import { NavigationButtons } from "../navigation-buttons"
import { useUserPreferencesStore } from "@/store/user-preferences-store"
import { RobotGuide } from "@/components/robot-guide"
import { explanationDepths } from "./mock"

export const ExplanationDepth = () => {
  const { handleNext, handlePrevious, activeStep, steps } = useStepperContext();
  const currentStep = steps[activeStep];
  const { setUserPreferences } = useUserPreferences();
  const { explanationDepth: selectedExplanationDepth } = useUserPreferencesStore()

  function handleExplanationDepthSelection(explanationDepth: string) {
    setUserPreferences({ explanationDepth });
    handleNext();
  }

  return (
    <div className="w-full h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <RobotGuide message={currentStep.description || "Select how detailed you want the explanations to be"} />
      </motion.div>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl rounded-xl border border-[#9F8DFC]/20 p-6 shadow-xl md:p-8 relative overflow-hidden">
          <div className="bg-gradient-to-r from-[#9F8DFC]/10 to-transparent opacity-50" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {explanationDepths.map((depth, index) => {
              const Icon = depth.icon as LucideIcon;
              return (
                <motion.div
                  key={depth.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className={`p-6 cursor-pointer hover:border-[#9F8DFC] transition-colors border-2 border-[#9F8DFC40] ${selectedExplanationDepth === depth.id ? "border-[#9F8DFC]" : ""
                      }`}
                    onClick={() => handleExplanationDepthSelection(depth.id)}
                  >
                    <div className="flex flex-col items-center text-center relative">
                      {selectedExplanationDepth === depth.id && (
                        <div className="absolute top-0 right-0">
                          <Check className="w-6 h-6 text-[#9F8DFC]" />
                        </div>
                      )}
                      <Icon className="w-8 h-8 text-[#9F8DFC] mb-3" />
                      <span className="text-2xl font-bold text-white mb-2">{depth.title}</span>
                      <span className="text-slate-400">{depth.description}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="p-4">
        <NavigationButtons
          isNextDisabled={false}
          isPreviousDisabled={false}
          showOnlyPreviousButton={true}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  )
}
