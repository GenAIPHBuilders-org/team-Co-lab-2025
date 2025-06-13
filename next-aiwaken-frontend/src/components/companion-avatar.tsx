import type { FC } from "react"
import { cn } from "@/lib/utils"
import { LottieAnimation } from "./ui/lottie"
import gab from "./lottie-json/gab.json";
import brian from "./lottie-json/brian.json";
import kent from "./lottie-json/kent.json";
import robot from "./lottie-json/robot.json";
import ryan from "./lottie-json/ryan.json";


interface CompanionAvatarProps {
  name: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export const CompanionAvatar: FC<CompanionAvatarProps> = ({ name, className, size = "md" }) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  }

  const getAnimationData = () => {
    switch (name) {
      case "Gabriel":
        return gab
      case "Brian":
        return brian
      case "Ryan":
        return ryan
      case "Kent":
        return kent
      default:
        return robot
    }
  }

  return (
    <div
      className={cn(
        "rounded-full bg-gray-700/20 flex items-center justify-center",
        sizeClasses[size],
        className,
      )}
    >
      <LottieAnimation animationData={getAnimationData()} height="auto" width="75%" />
    </div>
  )
}
