import { Card } from "@/components/ui/card"
import { useStepperContext } from "@/contexts/stepper-context"
import { motion } from "framer-motion"
import { NavigationButtons } from "../navigation-buttons"
import { CompanionSelection } from "@/components/companion-selection"
import { useUserPreferences } from "@/hooks/use-preferences"
import { RobotGuide } from "@/components/robot-guide"

export const ChooseCompanion = () => {
  const { handleNext, handlePrevious, activeStep, steps } = useStepperContext();
  const { setUserPreferences } = useUserPreferences();
  const currentStep = steps[activeStep];

  function handleCompanionSelection(companion: string) {
    setUserPreferences({ companion });
    localStorage.setItem("selectedCompanion", companion);
    localStorage.setItem("user_companion", companion);
    handleNext();
  }

  return (
    <div className="w-full h-full grid grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <RobotGuide message={currentStep.description as string} />
        <div className="w-full flex items-end justify-end px-24">
          <NavigationButtons
            isNextDisabled={false}
            isPreviousDisabled={false}
            showOnlyPreviousButton={true}
            onPrevious={handlePrevious}
          />
        </div>
      </motion.div>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full rounded-xl border border-[#9F8DFC]/20 p-6 shadow-xl md:p-8 relative overflow-hidden">
          <div className="bg-gradient-to-r from-[#9F8DFC]/10 to-transparent opacity-50" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CompanionSelection
              onSelect={handleCompanionSelection}
              selectedCompanion={localStorage.getItem("selectedCompanion")}
            />
          </motion.div>
        </Card>
      </div>
    </div>
  )
}
