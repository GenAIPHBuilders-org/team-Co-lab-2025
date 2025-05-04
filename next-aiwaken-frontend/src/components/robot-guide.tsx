"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LottieAnimation } from "./ui/lottie"
import robot from "./lottie-json/robot.json"

interface RobotGuideProps {
  message: string
}

export function RobotGuide({ message }: RobotGuideProps) {
  const [displayedMessage, setDisplayedMessage] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  // Typing effect
  useEffect(() => {
    setIsTyping(true)
    setDisplayedMessage("")

    let index = 0
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedMessage((prev) => prev + message.charAt(index))
        index++
      } else {
        clearInterval(timer)
        setIsTyping(false)
      }
    }, 20) // Speed of typing

    return () => clearInterval(timer)
  }, [message])

  return (
    <div className="flex flex-col items-center space-y-4">
      <LottieAnimation animationData={robot} height="auto" width={300} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-md rounded-lg bg-slate-100 p-4 text-center"
      >
        {/* Speech bubble pointer */}
        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-slate-100" />

        <p className="text-sm md:text-base">
          {displayedMessage}
          {isTyping && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
            >
              |
            </motion.span>
          )}
        </p>
      </motion.div>
    </div>
  )
}
