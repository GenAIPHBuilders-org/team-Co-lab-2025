"use client"

import { createContext, useContext, ReactNode } from "react"
import { TTopics } from "@/services/topic-service"

interface LatestCourseContextProps {
  latestCourse: TTopics | null
}

const LatestCourseContext = createContext<LatestCourseContextProps | undefined>(
  undefined,
)

export const LatestCourseProvider = ({
  children,
  data,
}: {
  children: ReactNode
  data: TTopics | null
}) => {
  return (
    <LatestCourseContext.Provider value={{ latestCourse: data }}>
      {children}
    </LatestCourseContext.Provider>
  )
}

export const useLatestCourse = () => {
  const context = useContext(LatestCourseContext)
  if (context === undefined) {
    throw new Error(
      "useLatestCourse must be used within a LatestCourseProvider",
    )
  }
  return context
} 