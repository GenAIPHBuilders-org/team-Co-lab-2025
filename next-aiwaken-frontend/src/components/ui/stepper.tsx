"use client";
import React from "react";
import { useStepperContext } from "@/contexts/stepper-context";
import { Step } from "./step";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface StepperProps {
  cardTitle?: string;
  className?: string;
  style?: React.CSSProperties;
  showStepper?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({ className, showStepper = true, style }) => {
  const { steps, activeStep } = useStepperContext();

  return (
    <div className={cn("w-full min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-900 to-gray-950", className)} style={style}>
      {showStepper && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center px-4 py-6 sticky top-0 z-10 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800"
        >
          <Step
            activeStep={activeStep}
            steps={steps}
            currentStep={steps[activeStep]}
          />
        </motion.div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps[activeStep].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};