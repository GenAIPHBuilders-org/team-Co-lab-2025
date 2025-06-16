import { AppIntroduction } from "../onboarding-content/app-introduction";
import { IStepProps } from "@/contexts/stepper-context";
import { AgeRangeSelection } from "../onboarding-content/age-range-selection";
import { MotivationLevel } from "../onboarding-content/motivation-level";
import { LearningGoal } from "../onboarding-content/learning-goal";
import { ExplanationDepth } from "../onboarding-content/explanation-depth";
import { ChooseCompanion } from "../onboarding-content/choose-companion";
import { Summary } from "../onboarding-content/summary";
import { AdventureStyle } from "../onboarding-content/adventure-style";

export const steps: IStepProps[] = [
  {
    label: "Welcome",
    title: "Welcome to AIwaken",
    description: "Welcome! I'm Sora, your guide for this learning journey. Let's begin by personalizing your learning experience by understanding your preferences and goals.",
    content: <AppIntroduction />,
  },
  {
    label: "age-range",
    title: "Age Range",
    description: "Select your age range to help us tailor the learning experience to your needs",
    content: <AgeRangeSelection />,
  },
  {
    label: "motivation-level",
    title: "Motivation Level",
    description: "Help us understand your learning drive",
    content: <MotivationLevel />,
  },
  {
    label: "explanation-depth",
    title: "Explanation Depth",
    description: "Select how detailed you want the explanations to be",
    content: <ExplanationDepth />,
  },
  {
    label: "learning-goal",
    title: "Learning Goal",
    description: "Choose your primary objective for using AIwaken",
    content: <LearningGoal />,
  },
  {
    label: "adventure-style",
    title: "Adventure Style",
    description: "Choose your adventure style! What kind of world would you like your learning journey to take place in?",
    content: <AdventureStyle />,
  },
  {
    label: "choose-companion",
    title: "Choose Companion",
    description: "Select a companion that matches your learning style",
    content: <ChooseCompanion />,
  },
  {
    label: "summary",
    title: "Summary",
    description: "Here's a summary of your preferences. You can always update these settings later. Good luck on your learning journey!",
    content: <Summary />,
  }
];
