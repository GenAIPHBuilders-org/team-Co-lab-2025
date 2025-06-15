"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, BookOpen, Clock, Award, Zap, Flame, Crown } from "lucide-react"
import { motion } from "framer-motion"

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Completed your first course",
    icon: <Trophy className="h-6 w-6 text-yellow-400" />,
    date: "2024-03-15",
    progress: 100,
  },
  {
    id: 2,
    title: "Quick Learner",
    description: "Completed 5 lessons in one day",
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    date: "2024-03-16",
    progress: 100,
  },
  {
    id: 3,
    title: "Perfect Score",
    description: "Achieved 100% in a quiz",
    icon: <Star className="h-6 w-6 text-purple-400" />,
    date: "2024-03-17",
    progress: 100,
  },
  {
    id: 4,
    title: "Consistent Learner",
    description: "Logged in for 7 consecutive days",
    icon: <Flame className="h-6 w-6 text-orange-400" />,
    date: "2024-03-18",
    progress: 100,
  },
  {
    id: 5,
    title: "Course Master",
    description: "Complete 3 courses",
    icon: <Crown className="h-6 w-6 text-yellow-500" />,
    date: null,
    progress: 66,
  },
]

// Mock data for stats
const stats = [
  { label: "Courses Completed", value: "2", icon: <BookOpen className="h-5 w-5" /> },
  { label: "Total Learning Hours", value: "24", icon: <Clock className="h-5 w-5" /> },
  { label: "Achievements Unlocked", value: "4", icon: <Award className="h-5 w-5" /> },
  { label: "Current Streak", value: "7 days", icon: <Flame className="h-5 w-5" /> },
]

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-950 text-white">
      <div className="container mx-auto mt-12 py-12 px-4 space-y-8">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-purple-500">
                  <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-500">
                  Level 3
                </Badge>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white">John Doe</h1>
                <p className="text-slate-400">Python Developer</p>
                <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Web Development</Badge>
                  <Badge variant="secondary">Data Science</Badge>
                </div>
              </div>
              <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/10">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-slate-900/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your overall learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-400">Overall Progress</span>
                      <span className="text-sm font-medium text-white">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-400">Current Course</span>
                      <span className="text-sm font-medium text-white">Advanced Python</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-900/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-purple-500/10">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{achievement.title}</h3>
                          <p className="text-sm text-slate-400">{achievement.description}</p>
                          {achievement.date && (
                            <p className="text-xs text-slate-500 mt-1">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          )}
                          {achievement.progress < 100 && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Progress</span>
                                <span className="text-white">{achievement.progress}%</span>
                              </div>
                              <Progress value={achievement.progress} className="h-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning journey timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        {index !== 2 && <div className="w-0.5 h-12 bg-slate-700" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Completed Python Basics Quiz</p>
                        <p className="text-xs text-slate-400">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>

  )
}