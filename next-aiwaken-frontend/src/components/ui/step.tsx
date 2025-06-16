"use client";
import React from "react";
import { IStepProps } from "@/contexts/stepper-context";
import { Progress } from "./progress";

interface StepComponentProps {
  activeStep: number;
  steps: IStepProps[];
  currentStep: IStepProps;
}

export const Step: React.FC<StepComponentProps> = ({
  activeStep,
  steps,
  currentStep
}) => {
  return (
    <div className="mb-8 relative w-full">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[#9F8DFC]">
          Step {activeStep + 1} of {steps.length}
        </span>
        <span className="text-sm text-slate-400">
          {currentStep.title}
        </span>
      </div>
      <Progress
        value={((activeStep + 1) / steps.length) * 100}
        className="h-1.5 bg-slate-700 [&>div]:bg-[#9F8DFC]"
      />
    </div>
  );
};