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

const steps = [
  {
    title: "Welcome to AIwaken",
    description: "I'm your AI guide! Let's walk through the essentials to get you started quickly.",
    robotMessage: "Hi there! 👋 Welcome to AIwaken. I'll help you get familiar with the platform. Ready for a quick tour?",
  },
  {
    title: "Pick Your AI Companion",
    description: "Choose a companion who will help you grow and support your learning journey.",
    robotMessage:
      "Growth is a journey! Pick a companion who will encourage and guide you as you develop new skills.",
    isCompanionSelection: true,
  },
  {
    title: "Meet Your Emotional Companion",
    description: "Your companion isn't just smart—they understand emotions and can support you through challenges.",
    robotMessage:
      "I'm here to help, not just with knowledge, but with empathy and encouragement whenever you need it.",
  },
  {
    title: "Explore Generative Courses",
    description: "Access dynamic, AI-powered courses in math, science, English, and more—tailored to your pace and interests.",
    robotMessage:
      "Ready to learn? Dive into generative courses that adapt to you, covering subjects like math, science, English, and beyond!",
  },
  {
    title: "You're Ready to Go!",
    description: "You’re all set to make the most of AIwaken. Dive in and explore!",
    robotMessage:
      "Awesome! You’re ready to start using AIwaken. If you need help, your companion and I are always here for you.",
  },
]

export function OnboardingStepper() {
  const router = useRouter()
  const { setUserStatusCb, isLoading } = useSetUserStatus()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null)

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
    localStorage.setItem("user_companion", companionName)

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
    <div
      className={`w-full ${currentStepData.isCompanionSelection ? "h-full" : "h-screen"
        } p-4 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur`}
    >
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
    </div>
  )
}
