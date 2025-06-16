import { Card, CardContent } from "./ui/card"
import { motion } from "framer-motion"
import { Progress } from "./ui/progress"

type TProgressCardProps = {
  progressValue: number;
}

export const ProgressCard = ({ progressValue }: TProgressCardProps) => {
  return (
    <Card className="flex-2 glow-border h-80 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <motion.h2
            className="text-2xl font-bold"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Your Progress
          </motion.h2>
          <motion.div
            className="xp-badge"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
            }}
          >
            <span>65</span>
          </motion.div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Level 6</span>
            <span className="text-sm text-muted-foreground">Level 7</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
        <motion.div
          className="flex justify-between text-sm"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="text-[#9F8DFC]">Current XP: 650/1000</span>
          <span className="text-[#9F8DFC]">+350 XP needed</span>
        </motion.div>
      </CardContent>
    </Card>
  )
}