"use client";
import React, {
  useMemo,
  createContext,
  useContext,
  useState,
  useCallback
} from "react";

export interface IStepProps {
  title: string;
  description?: string;
  content: React.ReactNode;
  label: string;
}

export interface IStepperContextType {
  activeStep: number;
  setActiveStep: (newStep: number) => void;
  navigateTo: (label: string) => void;
  steps: IStepProps[];
  isLastStep: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
}


const StepperContext = createContext<IStepperContextType>({
  activeStep: 0,
  setActiveStep: () => { },
  navigateTo: () => { },
  steps: [],
  isLastStep: false,
  handleNext: () => { },
  handlePrevious: () => { },
});

interface StepperProviderProps {
  children: React.ReactNode;
  steps: IStepProps[];
  onComplete?: () => void;
}

export const useStepperContext = () => {
  if (!StepperContext) {
    throw new Error("useStepperContext must be used within a StepperProvider");
  }
  return useContext(StepperContext);
};

export const StepperProvider: React.FC<StepperProviderProps> = ({
  children,
  steps,
  onComplete,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const navigateTo = useCallback((label: string) => {
    const nextStepIndex = steps.findIndex((step) => step.label === label);
    if (nextStepIndex !== -1) {
      setActiveStep(nextStepIndex);
    }
  }, [steps]);

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = useCallback(() => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onComplete?.();
    }
  }, [activeStep, steps.length, onComplete]);

  const handlePrevious = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }, [activeStep]);


  return (
    <StepperContext.Provider value={
      useMemo(
        () => ({
          activeStep,
          setActiveStep,
          navigateTo,
          steps,
          isLastStep,
          handleNext,
          handlePrevious
        }), [
        activeStep,
        navigateTo,
        steps,
        isLastStep,
        handleNext,
        handlePrevious
      ])}>
      {children}
    </StepperContext.Provider>
  );
};