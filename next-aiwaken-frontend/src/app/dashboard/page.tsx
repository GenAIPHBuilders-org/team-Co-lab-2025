"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TopicSelectionCard } from "@/components/topic-selection"
import { TokenStorage } from "@/lib/token-storage"
import { UserCard } from "@/components/user-card"
import AnimationVariants from "@/lib/animations"
import { CourseCard } from "@/components/course-card"
import { Course } from "./course-structure/mock"

export default function Page() {
  const courseData = TokenStorage.getCourseData();
  const [progressValue, setProgressValue] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => {
      setProgressValue(40)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-1 mt-16 flex-col gap-4 p-4 bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur">
      <motion.div
        className="grid auto-rows-min gap-4 md:grid-cols-2"
        variants={AnimationVariants.containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <UserCard />
        <motion.div variants={AnimationVariants.itemVariants}>
          <TopicSelectionCard />
        </motion.div>
        <motion.div variants={AnimationVariants.itemVariants} className="w-full md:col-span-2">
          <CourseCard courseData={courseData as Course} progressValue={progressValue as number} />
        </motion.div>
      </motion.div>
    </div>
  )
}
