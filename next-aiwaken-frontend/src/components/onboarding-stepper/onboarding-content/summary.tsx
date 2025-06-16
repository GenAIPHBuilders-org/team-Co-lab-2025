import { Card } from "@/components/ui/card"
import { useStepperContext } from "@/contexts/stepper-context"
import { motion } from "framer-motion"
import { NavigationButtons } from "../navigation-buttons"
import { useUserPreferencesStore } from "@/store/user-preferences-store"
import { CheckCircle2 } from "lucide-react"
import { RobotGuide } from "@/components/robot-guide"

export const Summary = () => {
  const { handleNext, handlePrevious, activeStep, steps } = useStepperContext();
  const currentStep = steps[activeStep];
  const { ageRange, motivationLevel, companion, explanationDepth, learningGoal, learningStyle } = useUserPreferencesStore();

  const mockPreferences = {
    ageRange: ageRange || "No Selection",
    motivationLevel: motivationLevel || "No Selection",
    companion: companion || "No Selection",
    explanationDepth: explanationDepth || "No Selection",
    learningGoal: learningGoal || "No Selection",
    learningStyle: learningStyle || "No Selection"
  };

  const preferenceItems = [
    {
      label: "Age Range",
      value: mockPreferences.ageRange,
      description: "Your selected age group"
    },
    {
      label: "Motivation Level",
      value: mockPreferences.motivationLevel,
      description: "Your learning drive"
    },
    {
      label: "AI Companion",
      value: mockPreferences.companion,
      description: "Your chosen learning partner"
    },
    {
      label: "Explanation Depth",
      value: mockPreferences.explanationDepth,
      description: "Preferred level of detail"
    },
    {
      label: "Learning Goal",
      value: mockPreferences.learningGoal,
      description: "Your primary objective"
    },
    {
      label: "Learning Style",
      value: mockPreferences.learningStyle,
      description: "Your preferred learning environment"
    }
  ];

  return (
    <div className="w-full h-full grid grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <RobotGuide message={currentStep.description || "Here's a summary of your preferences. You can always update these settings later."} />
        <div className="w-full flex justify-end mt-4 px-12">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isPreviousDisabled={activeStep === 0}
            isNextDisabled={false}
            isLastStep={activeStep === steps.length - 1}
          />
        </div>
      </motion.div>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl rounded-xl border border-[#9F8DFC]/20 p-6 shadow-xl md:p-8 relative overflow-hidden">
          <div className="bg-gradient-to-r from-[#9F8DFC]/10 to-transparent opacity-50" />
          <div className="space-y-4 grid grid-cols-2 gap-3">
            {preferenceItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-4 border border-[#9F8DFC]/20 hover:border-[#9F8DFC]/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#9F8DFC] mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                      <p className="text-[#9F8DFC] font-medium">{item.value}</p>
                      <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
