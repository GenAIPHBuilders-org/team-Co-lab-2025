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
import { Brain, Shield, Sparkles } from "lucide-react"

export default function Page() {
  const courseData = TokenStorage.getCourseData();
  const router = useRouter()

  const [, setProgressValue] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(65)
    }, 1000)

    setIsLoaded(true)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const handleContinueCourse = () => {
    router.push("/dashboard/course")
  }

  return (
    <div className="flex flex-1 mt-12 flex-col gap-4 p-4 bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur">
      <motion.div
        className="grid auto-rows-min gap-4 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="md:col-span-1">
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
              <div className="bg-gray-900 p-6 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Hunter Rank</h3>
                        <p className="text-sm text-gray-400">E-Rank Hunter</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30">Level 5</Badge>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Experience</span>
                        <span className="text-gray-300">250/500 XP</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-500 w-1/2"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-gray-300">Intelligence</span>
                        </div>
                        <span className="text-2xl font-bold text-white">42</span>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-gray-300">Wisdom</span>
                        </div>
                        <span className="text-2xl font-bold text-white">38</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Current Quest</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Advanced AI Concepts</span>
                        <span className="text-sm text-gray-400">3/5 completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <TopicSelectionCard />
        </motion.div>
        <motion.div variants={itemVariants} className="w-full md:col-span-2">
          {courseData && (
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
                  <div className="bg-[#9F8DFC] h-full" style={{ width: `${40}%` }}></div>
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
                  {40 >= 100 ? "Review" : "Continue"}
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
