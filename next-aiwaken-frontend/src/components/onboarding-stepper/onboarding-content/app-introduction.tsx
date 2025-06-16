import { RobotGuide } from "@/components/robot-guide"
import { useStepperContext } from "@/contexts/stepper-context"
import { motion } from "framer-motion"
import { NavigationButtons } from "../navigation-buttons"

export const AppIntroduction = () => {
  const { handleNext, handlePrevious, activeStep, steps } = useStepperContext();
  const currentStep = steps[activeStep];

  const handleNextClick = () => {
    if (activeStep < steps.length - 1) {
      console.log('Next button clicked', { activeStep, totalSteps: steps.length });
      handleNext();
    }
  };

  return (
    <div className="w-full p-4 flex h-full flex-col items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-center"
      >
        <RobotGuide message={currentStep.description || "Welcome to AIwaken! Let's get started."} />
      </motion.div>
      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNextClick}
        isPreviousDisabled={activeStep === 0}
        isNextDisabled={activeStep === steps.length - 1}
        isLastStep={activeStep === steps.length - 1}
      />
    </div>
  )
}