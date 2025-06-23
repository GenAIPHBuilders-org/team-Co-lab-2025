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
    description: "Welcome! I'm Sora, your guide for this learning journey. Let's begin by personalizing your learning experience by understanding your preferences and goals. Together, we'll create a unique path that matches your learning style and aspirations.",
    content: <AppIntroduction />,
  },
  {
    label: "age-range",
    title: "Age Range",
    description: "Select your age range to help us tailor the learning experience to your needs. This helps us adjust the complexity of explanations and choose appropriate examples that resonate with your life stage.",
    content: <AgeRangeSelection />,
  },
  {
    label: "motivation-level",
    title: "Motivation Level",
    description: "Help us understand your learning drive. Are you looking for a casual exploration, or are you deeply committed to mastering new concepts? This helps us set the right pace and challenge level for your journey.",
    content: <MotivationLevel />,
  },
  {
    label: "explanation-depth",
    title: "Explanation Depth",
    description: "Select how detailed you want the explanations to be. Choose between quick overviews for a high-level understanding or in-depth explorations that dive deep into concepts and their applications.",
    content: <ExplanationDepth />,
  },
  {
    label: "learning-goal",
    title: "Learning Goal",
    description: "Choose your primary objective for using AIwaken. Whether you're looking to gain practical skills, explore theoretical concepts, or prepare for specific challenges, we'll customize the content to help you achieve your goals.",
    content: <LearningGoal />,
  },
  {
    label: "adventure-style",
    title: "Adventure Style",
    description: "Choose your adventure style! What kind of world would you like your learning journey to take place in? From futuristic cities to mystical realms, select an environment that inspires and engages you.",
    content: <AdventureStyle />,
  },
  {
    label: "choose-companion",
    title: "Choose Companion",
    description: "Select a companion that matches your learning style. Your companion will guide you through the learning process, adapting their teaching approach to complement your preferred way of understanding new concepts.",
    content: <ChooseCompanion />,
  },
  {
    label: "summary",
    title: "Summary",
    description: "Here's a summary of your preferences. You can always update these settings later through your profile settings. We're excited to begin this learning journey with you! Good luck on your adventure!",
    content: <Summary />,
  }
];
