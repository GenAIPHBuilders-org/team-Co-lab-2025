"use client"

import { motion, AnimatePresence } from "framer-motion"
import { LottieAnimation } from "./ui/lottie"
import { TypingAnimation } from "./magicui/typing-animation"
import yo from "./lottie-json/yo.json"

interface RobotGuideProps {
  message: string
}

export function RobotGuide({ message }: RobotGuideProps) {
  return (
    <div className="w-full flex items-center justify-center gap-8 p-4">
      <div className="relative">
        <LottieAnimation animationData={yo} height="auto" width={300} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="message"
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative max-w-lg"
        >
          <div className="w-full rounded-xl border border-[#9F8DFC]/50 p-6 shadow-xl bg-gradient-to-br from-black/40 to-[#9F8DFC]/10 backdrop-blur-md relative overflow-hidden">
            <motion.div
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(159, 141, 252, 0.1), rgba(159, 141, 252, 0.05))",
                  "linear-gradient(45deg, rgba(159, 141, 252, 0.15), rgba(159, 141, 252, 0.1))",
                  "linear-gradient(45deg, rgba(159, 141, 252, 0.1), rgba(159, 141, 252, 0.05))",
                ],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 rounded-xl"
            />

            <div className="relative z-10">
              <TypingAnimation
                className="text-sm md:text-base text-slate-200 font-medium leading-relaxed"
                duration={30}
                delay={500}
              >
                {message}
              </TypingAnimation>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9F8DFC]/20 via-transparent to-[#9F8DFC]/20 opacity-50 blur-xl" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
