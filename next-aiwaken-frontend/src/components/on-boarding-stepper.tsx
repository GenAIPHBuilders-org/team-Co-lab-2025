"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RobotGuide } from "./robot-guide"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "./ui/card"
import { useSetUserStatus } from "@/(features)/authentication-action"
import { useRouter } from "next/navigation"
import { CompanionSelection } from "./companion-selection"

// Updated steps to include companion selection
const steps = [
  {
    title: "Welcome to the Platform",
    description: "I'm your AI assistant! I'll guide you through our platform's key features.",
    robotMessage: "Hello there! 👋 I'm excited to show you around our platform. Let's get started with a quick tour!",
  },
  {
    title: "Choose Your Companion",
    description: "Select an AI companion that matches your preferred interaction style.",
    robotMessage:
      "Everyone works differently! Choose a companion that resonates with your style. This companion will guide you through your journey on our platform.",
    isCompanionSelection: true,
  },
  {
    title: "Create Your First Project",
    description: "Learn how to create and manage your projects with ease.",
    robotMessage:
      "Creating projects is simple! Just click the 'New Project' button and follow the prompts. You can organize your work however you like.",
  },
  {
    title: "Collaborate with Your Team",
    description: "Invite team members and collaborate in real-time.",
    robotMessage:
      "Teamwork makes the dream work! Invite colleagues by email and start collaborating instantly. Everyone can contribute simultaneously.",
  },
  {
    title: "Deploy Your Work",
    description: "Deploy your projects with a single click to our global network.",
    robotMessage:
      "When you're ready to go live, just hit deploy! Your project will be available worldwide in seconds with our global CDN.",
  },
  {
    title: "You're All Set!",
    description: "You're now ready to use the platform to its full potential.",
    robotMessage:
      "Congratulations! You're all set to start creating amazing things. If you need help, I'm always here to assist you!",
  },
]

export function OnboardingStepper() {
  const router = useRouter()
  const { setUserStatusCb, isLoading } = useSetUserStatus()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null)

  // Load selected companion from localStorage on initial render
  useEffect(() => {
    const savedCompanion = localStorage.getItem("selectedCompanion")
    if (savedCompanion) {
      setSelectedCompanion(savedCompanion)
    }
  }, [])

  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100)
  }, [currentStep])

  function handleNext() {
    if (steps[currentStep].isCompanionSelection && !selectedCompanion) {
      return
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  function handleSelectCompanion(companionName: string) {
    setSelectedCompanion(companionName)
    localStorage.setItem("selectedCompanion", companionName)

    const companionsData = {
      companions: {
        Gabriel: {
          title: "The Curious Thinker",
          personality: "Gabriel is curious, thoughtful, and enjoys exploring the 'why' behind concepts",
          motivation_style: "philosophical and thought-provoking",
        },
        Brian: {
          title: "The Calm Strategist",
          personality: "Brian is methodical, patient, and focuses on clarity and precision",
          motivation_style: "structured and methodical",
        },
        Ryan: {
          title: "The Bold Problem-Solver",
          personality: "Ryan is energetic, direct, and takes on challenges head-on",
          motivation_style: "energetic and action-oriented",
        },
        Kent: {
          title: "The Friendly Guide",
          personality: "Kent is supportive, optimistic, and believes in your potential",
          motivation_style: "warm and supportive",
        },
      },
    }

    localStorage.setItem("companionsData", JSON.stringify(companionsData))
  }

  async function handleOnboardingComplete() {
    try {
      await setUserStatusCb()
      router.push("/dashboard")
      window.location.reload()
    } catch (error) {
      console.error("Error updating user status:", error)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isComplete) {
    return (
      <Card className="w-full max-w-3xl rounded-xl glow-card border border-[#9F8DFC] p-6 shadow-xl md:p-8 glow-border ">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-3xl rounded-xl p-8 shadow-xl"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <RobotGuide
              message={`You're all set! ${selectedCompanion ? `${selectedCompanion} will be your guide as you explore the platform.` : "Feel free to explore the platform on your own now."}`}
            />
            <h2 className="text-2xl font-bold">Welcome to the Platform!</h2>
            <p className="text-muted-foreground">
              You&apos;ve completed the onboarding. Start exploring all the features now.
            </p>
            <div className="w-full flex items-center justify-center mt-4">
              <Button onClick={handleOnboardingComplete} variant="outline">
                Start Using the Platform
              </Button>
            </div>
          </div>
        </motion.div>
      </Card>
    )
  }

  const currentStepData = steps[currentStep]

  return (
    <Card className="w-full max-w-3xl h-auto rounded-xl glow-card border border-[#9F8DFC] p-6 shadow-xl md:p-8 glow-border">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="mb-8 flex justify-center">
        <RobotGuide message={currentStepData.robotMessage} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
          <p className="text-slate-300">{currentStepData.description}</p>

          {currentStepData.isCompanionSelection && (
            <div className="mt-6">
              <CompanionSelection onSelect={handleSelectCompanion} selectedCompanion={selectedCompanion} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={isLoading || (currentStepData.isCompanionSelection && !selectedCompanion)}
          className="flex items-center gap-1"
          variant={"outline"}
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
          {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  )
}
