"use client"

import { motion } from "framer-motion"
import { Sparkles, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedModal } from "./animated-modal"
import { useRandomMessage } from "@/hooks/use-random-message"

interface IMotivationalModalProps {
  isOpen: boolean
  onClose?: () => void
  title?: string
  message?: string
  actionText?: string
  onAction?: () => void
}

const motivationalQuotes = [
  "You've got this! Every small step counts.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Your limitation—it's only your imagination.",
  "Remember why you started.",
  "Dream it. Wish it. Do it.",
  "It's okay to take a break, but don't give up.",
]

const icons = [Sparkles, Target, Zap]

export function MotivationalModal({
  isOpen,
  onClose,
  title = "Stay Motivated!",
  message,
  actionText = "Let's Go!",
  onAction,
}: IMotivationalModalProps) {
  const randomQuote = useRandomMessage(motivationalQuotes)
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)]

  const handleAction = () => {
    onAction?.()
    onClose?.()
  }

  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose} size="lg" showCloseButton={true}>
      <div className="text-center space-y-6 ">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
        >
          <RandomIcon className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto"
          >
            {message || randomQuote}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="flex gap-3 justify-center pt-4"
        >
          <Button variant="outline" onClick={onClose} className="px-6">
            Maybe Later
          </Button>
          <Button
            onClick={handleAction}
            className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {actionText}
            </motion.span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center space-x-1 pt-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </AnimatedModal>
  )
}
