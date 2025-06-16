"use client";

import { StepperProvider } from "@/contexts/stepper-context";
import { steps } from "./components/onboarding-steps";
import { Stepper } from "../ui/stepper";
import { useRouter } from "next/navigation";

export const OnboardingStepperContainer = () => {
  const router = useRouter();

  const handleComplete = () => {
    console.log('Onboarding completed');
    router.push('/dashboard');
  };

  return (
    <StepperProvider steps={steps} onComplete={handleComplete}>
      <Stepper />
    </StepperProvider>
  );
}