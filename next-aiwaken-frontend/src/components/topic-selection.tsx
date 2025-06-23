"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGenerateCourse } from "@/(features)/course-action"
import { TopicCard } from "./topic-card"
import { motion } from "framer-motion"
import AnimationVariants from "@/lib/animations"
import { useRouter } from "next/navigation"
import { Eye, BookOpen } from "lucide-react"
import type { TTopics } from "@/services/topic-service"
import { useFetchAllTopics, useStartCourse } from "@/(features)/topic-action"
import { CourseCard } from "./course-card"
import type { Course } from "@/app/dashboard/course-structure/mock"
import { TopicModal } from "./dialog/topic-modal"
import { useCourseContext } from "@/contexts/course-context"

export function TopicSelectionCard() {
  const [progressValue, setProgressValue] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const { course: courseData } = useCourseContext()
  const { allAvailableTopic } = useFetchAllTopics()
  const { generateCourseAsync, isPending } = useGenerateCourse()
  const [selectedTopic] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [confirmingTopic, setConfirmingTopic] = useState<TTopics | null>(null)
  const router = useRouter()
  const { startCourse } = useStartCourse();
  const topics = allAvailableTopic.topics.slice(0, 4)

  const handleTopicClick = (topic: TTopics) => {
    if (!topic.locked) {
      setConfirmingTopic(topic)
      setModalOpen(true)
    }
  }

  const handleGenerateCourse = async (subject: string, difficulty: string, topicId: string) => {
    try {
      await generateCourseAsync({ subject, difficulty })
      startCourse({ topic_id: topicId })
      setModalOpen(false)
    } catch (error) {
      console.error("Error generating course:", error)
      setModalOpen(false)
    }
  }

  const handleViewAllTopics = () => {
    router.push("/dashboard/all-topics")
  }

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => {
      setProgressValue(40)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <React.Fragment>
      <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-800 relative overflow-hidden h-full">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

        <CardHeader className="pb-4">
          <motion.div
            className="flex items-center justify-between"
            initial="hidden"
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={AnimationVariants.itemVariants}
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <motion.h2 className="text-2xl font-bold text-white" initial={false} animate={{ scale: 1 }}>
                  Educational Topics
                </motion.h2>
                <motion.p
                  className="text-sm text-gray-400 mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Choose a topic to start your learning journey
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewAllTopics}
                className="bg-gray-800/50 border-gray-700 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-indigo-300 transition-all duration-300"
              >
                <Eye className="h-4 w-4 mr-2" />
                View All Topics
              </Button>
            </motion.div>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-6 w-full">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <TopicCard topic={topic} isSelected={selectedTopic === topic.id} onClick={handleTopicClick} />
              </motion.div>
            ))}
          </motion.div>

          {courseData && progressValue !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="border-t border-gray-800 pt-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-white">Continue Learning</h3>
              </div>
              <CourseCard courseData={courseData as Course} progressValue={progressValue} />
            </motion.div>
          )}
        </CardContent>
      </Card>

      <TopicModal
        topic={confirmingTopic}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleGenerateCourse}
        isPending={isPending}
      />
    </React.Fragment>
  )
}
