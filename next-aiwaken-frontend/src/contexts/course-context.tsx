"use client"

import { createContext, useContext, ReactNode } from "react"
import { AIContentGenerationResponse } from "@/types/course"

interface CourseContextProps {
  course: AIContentGenerationResponse | null
  ssrCourseSuggestion: AICourseSuggestionResponse | null
}

const CourseContext = createContext<CourseContextProps | undefined>(
  undefined,
)

export const CourseProvider = ({
  children,
  data,
  ssrCourseSuggestion,
}: {
  children: ReactNode
  data: AIContentGenerationResponse | null
  ssrCourseSuggestion: AICourseSuggestionResponse | null
}) => {
  return (
    <CourseContext.Provider value={{ course: data, ssrCourseSuggestion }}>
      {children}
    </CourseContext.Provider>
  )
}

export const useCourseContext = () => {
  const context = useContext(CourseContext)
  if (context === undefined) {
    throw new Error(
      "useCourseContext must be used within a CourseProvider",
    )
  }
  return context
}
