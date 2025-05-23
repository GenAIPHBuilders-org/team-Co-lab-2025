import type { FC } from "react"
import { cn } from "@/lib/utils"

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

  const getAvatarContent = () => {
    switch (name) {
      case "Gabriel":
        return (
          <div
            className={cn(
              "rounded-full bg-purple-700/20 flex items-center justify-center",
              sizeClasses[size],
              className,
            )}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4">
              <circle cx="12" cy="12" r="10" stroke="#9F8DFC" strokeWidth="1.5" />
              <path
                d="M8 14C8.5 15.5 10 17 12 17C14 17 15.5 15.5 16 14"
                stroke="#9F8DFC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="9" cy="10" r="1.25" fill="#9F8DFC" />
              <circle cx="15" cy="10" r="1.25" fill="#9F8DFC" />
              <path d="M12 7C10.5 7 9.5 7.5 9 8" stroke="#9F8DFC" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15 8C14.5 7.5 13.5 7 12 7" stroke="#9F8DFC" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 14V17" stroke="#9F8DFC" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )
      case "Brian":
        return (
          <div
            className={cn("rounded-full bg-blue-700/20 flex items-center justify-center", sizeClasses[size], className)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4">
              <circle cx="12" cy="12" r="10" stroke="#6366F1" strokeWidth="1.5" />
              <path
                d="M8 13.5C9 15 10.5 16 12 16C13.5 16 15 15 16 13.5"
                stroke="#6366F1"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="9" cy="10" r="1.25" fill="#6366F1" />
              <circle cx="15" cy="10" r="1.25" fill="#6366F1" />
              <path d="M8 7.5L10 8.5" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M16 7.5L14 8.5" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )
      case "Ryan":
        return (
          <div
            className={cn("rounded-full bg-red-700/20 flex items-center justify-center", sizeClasses[size], className)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4">
              <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="1.5" />
              <path
                d="M8 14C9 16 10.5 17 12 17C13.5 17 15 16 16 14"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="9" cy="10" r="1.25" fill="#EF4444" />
              <circle cx="15" cy="10" r="1.25" fill="#EF4444" />
              <path d="M7 7L10 9" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M17 7L14 9" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )
      case "Kent":
        return (
          <div
            className={cn(
              "rounded-full bg-green-700/20 flex items-center justify-center",
              sizeClasses[size],
              className,
            )}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4">
              <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="1.5" />
              <path
                d="M8 13C9 15.5 10.5 16.5 12 16.5C13.5 16.5 15 15.5 16 13"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="9" cy="10" r="1.25" fill="#10B981" />
              <circle cx="15" cy="10" r="1.25" fill="#10B981" />
              <path d="M12 7C10.5 7 9.5 7.5 9 8" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15 8C14.5 7.5 13.5 7 12 7" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )
      default:
        return (
          <div
            className={cn("rounded-full bg-gray-700/20 flex items-center justify-center", sizeClasses[size], className)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4">
              <circle cx="12" cy="12" r="10" stroke="#9F8DFC" strokeWidth="1.5" />
              <circle cx="9" cy="10" r="1.25" fill="#9F8DFC" />
              <circle cx="15" cy="10" r="1.25" fill="#9F8DFC" />
              <path
                d="M9 15C10 16 11 16.5 12 16.5C13 16.5 14 16 15 15"
                stroke="#9F8DFC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )
    }
  }

  return getAvatarContent()
}
