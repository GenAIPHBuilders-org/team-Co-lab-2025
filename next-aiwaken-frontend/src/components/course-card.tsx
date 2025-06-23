import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AnimationVariants from "@/lib/animations"
import type { Course } from "@/app/dashboard/course-structure/mock"
import { useRouter } from "next/navigation"

type TCourseCardProps = {
  courseData: Course
  progressValue: number
}

export function CourseCard({
  courseData,
  progressValue,
}: TCourseCardProps) {
  const router = useRouter()

  const handleContinueCourse = () => {
    router.push("/dashboard/course")
  }

  return (
    <motion.div variants={AnimationVariants.itemVariants} className="w-full ">
      {courseData && progressValue !== null && (
        <Card className="flex-2 overflow-hidden bg-gray-900 p-6 rounded-lg relative shadow-lg hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 bg-muted/30 relative">
            <Image
              src={
                (() => {
                  switch (courseData?.subject?.toLowerCase()) {
                    case "english":
                      return "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80";
                    case "mathematics":
                      return "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                    case "science":
                      return "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80";
                    case "basic python":
                      return "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                    default:
                      return "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                  }
                })()
              }
              alt={courseData?.subject || "Course image"}
              fill
              className="object-cover opacity-30 rounded-lg"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-0 left-0 right-0 h-1.5">
              <div className="bg-[#9F8DFC] h-full transition-all duration-300" style={{ width: `${progressValue}%` }}></div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="w-full flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{courseData?.course_title}</h3>
              <Badge variant="outline" className="bg-[#9F8DFC]/10 text-[#9F8DFC] border-[#9F8DFC] px-3 py-1">
                {courseData?.difficulty.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{courseData?.course_description}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">
                {courseData?.sections?.length || 0} chapters
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-[#9F8DFC] text-white font-semibold hover:bg-[#9F8DFC]/90 transition-colors duration-300"
                onClick={handleContinueCourse}
              >
                {progressValue >= 100 ? "Review" : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}