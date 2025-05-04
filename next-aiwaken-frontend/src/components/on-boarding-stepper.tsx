"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RobotGuide } from "./robot-guide"
import { ChevronLeft, ChevronRight } from "lucide-react"

const steps = [
  {
    title: "Welcome to the Platform",
    description: "I'm your AI assistant! I'll guide you through our platform's key features.",
    robotMessage: "Hello there! 👋 I'm excited to show you around our platform. Let's get started with a quick tour!",
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
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100)
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-xl"
      >
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <RobotGuide message="You're all set! Feel free to explore the platform on your own now." />
          <h2 className="text-2xl font-bold">Welcome to the Platform!</h2>
          <p className="text-muted-foreground">
            You&apos;ve completed the onboarding. Start exploring all the features now.
          </p>
          <Button onClick={() => window.location.reload()}>Start Using the Platform</Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl md:p-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            Skip Tour
          </Button>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="mb-8 flex justify-center">
        <RobotGuide message={steps[currentStep].robotMessage} />
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
          <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
          <p className="text-muted-foreground">{steps[currentStep].description}</p>
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
        <Button onClick={handleNext} className="flex items-center gap-1">
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
          {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
