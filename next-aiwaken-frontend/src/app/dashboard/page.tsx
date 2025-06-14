/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TopicSelectionCard } from "@/components/topic-selection"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { TokenStorage } from "@/lib/token-storage"
import { containerVariants, itemVariants } from "@/lib/animations"
import { UserCard } from "@/components/user-card"

export default function Page() {
  const courseData = TokenStorage.getCourseData();
  const router = useRouter()

  const [progressValue, setProgressValue] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => {
      setProgressValue(40)
    }, 100)
    return () => clearTimeout(timer)
  }, [])


  const handleContinueCourse = () => {
    router.push("/dashboard/course")
  }

  return (
    <div className="flex flex-1 mt-16 flex-col gap-4 p-4 bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur">
      <motion.div
        className="grid auto-rows-min gap-4 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <UserCard />
        <motion.div variants={itemVariants}>
          <TopicSelectionCard />
        </motion.div>
        <motion.div variants={itemVariants} className="w-full md:col-span-2">
          <motion.div variants={itemVariants} className="w-full md:col-span-2">
            {courseData && progressValue !== null && (
              <Card className="flex-2 overflow-hidden">
                <div className="h-56 bg-muted/30 relative">
                  <img
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
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1">
                    <div className="bg-[#9F8DFC] h-full" style={{ width: `${progressValue}%` }}></div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="w-full flex items-center justify-start mb-2">
                    <h3 className="font-medium ">{courseData?.course_title}</h3>
                    <Badge variant="outline" className="ml-2 bg-transparent text-[#9F8DFC] border-[#9F8DFC]">
                      {courseData?.difficulty.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{courseData?.course_description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 bg-[#9F8DFC] text-white font-semibold relative overflow-hidden group"
                    onClick={handleContinueCourse}
                  >
                    {progressValue >= 100 ? "Review" : "Continue"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
