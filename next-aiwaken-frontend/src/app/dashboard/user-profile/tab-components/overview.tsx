"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useState } from "react";
import { TGetUserAchievementsResponse } from "@/services/topic-service";
import { Trophy } from "lucide-react";

type OverviewProps = {
  achievements: TGetUserAchievementsResponse[] | null;
}
export const Overview = ({ achievements }: OverviewProps) => {
  const [activeTab, setActiveTab] = useState("achievements")


  if (!achievements) {
    return null;
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="bg-slate-900/50">
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

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
                      <Trophy className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{achievement.achievement_title}</h3>
                      <p className="text-sm text-slate-400">{achievement.achievement_description}</p>
                      {achievement.achievement_progress < 100 && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-white">{achievement.achievement_progress}%</span>
                          </div>
                          <Progress value={achievement.achievement_progress} className="h-1" />
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
  )
}