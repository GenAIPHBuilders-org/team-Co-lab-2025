"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import AnimationVariants from "@/lib/animations"
import type { Course } from "@/app/dashboard/course-structure/mock"
import { useRouter } from "next/navigation"
import { PlayCircle, BookOpen, Clock } from "lucide-react"

type TCourseCardProps = {
  courseData: Course
  progressValue: number
}

export function CourseCard({ courseData, progressValue }: TCourseCardProps) {
  const router = useRouter()

  const handleContinueCourse = () => {
    router.push("/dashboard/course")
  }

  const getSubjectImage = (subject: string) => {
    switch (subject?.toLowerCase()) {
      case "english":
        return "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80"
      case "mathematics":
        return "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      case "science":
        return "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
      case "basic python":
        return "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      default:
        return "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  }

  return (
    <motion.div
      variants={AnimationVariants.itemVariants}
      className="w-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-gray-800/50 border-gray-700 hover:border-indigo-500/50 transition-all duration-300 group">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={getSubjectImage(courseData?.subject) || "/placeholder.svg"}
            alt={courseData?.subject || "Course image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-300 font-medium">Progress: {progressValue}%</span>
              <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-xs">
                {courseData?.difficulty.toUpperCase()}
              </Badge>
            </div>
            <Progress value={progressValue} className="h-2 bg-gray-700" />
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-white mb-2 line-clamp-1">{courseData?.course_title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{courseData?.course_description}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>{courseData?.sections?.length || 0} chapters</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>~2h remaining</span>
            </div>
          </div>

          <Button
            onClick={handleContinueCourse}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium transition-all duration-300 group"
          >
            <PlayCircle className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
            {progressValue >= 100 ? "Review Course" : "Continue Learning"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
