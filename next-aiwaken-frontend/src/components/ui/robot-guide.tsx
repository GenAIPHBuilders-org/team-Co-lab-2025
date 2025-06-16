import { Bot } from "lucide-react"
import { motion } from "framer-motion"

interface RobotGuideProps {
  title: string
  description: string
  className?: string
}

export const RobotGuide = ({ title, description, className = "" }: RobotGuideProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-8 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <Bot className="w-8 h-8 text-[#9F8DFC]" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <p className="text-slate-300">
        {description}
      </p>
    </motion.div>
  )
} 