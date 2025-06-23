"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useState } from "react";
import { TGetUserAchievementsResponse } from "@/services/topic-service";
import { Trophy } from "lucide-react";
import { useFetchCompletedTopics } from "@/(features)/topic-action";

type OverviewProps = {
  achievements: TGetUserAchievementsResponse[] | null;
}
export const Overview = ({ achievements }: OverviewProps) => {
  const [activeTab, setActiveTab] = useState("achievements")

  const { completedTopics, isLoading: isLoadingCompleted } = useFetchCompletedTopics();

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
              {/* Timeline for completed topics */}
              {isLoadingCompleted ? (
                <div className="text-slate-400">Loading completed topics...</div>
              ) : completedTopics && completedTopics.topics.length > 0 ? (
                <div className="flex flex-col gap-0 relative">
                  {completedTopics.topics.map((topic, index) => (
                    <div key={topic.id} className="flex gap-4 items-start relative">
                      {/* Timeline dot and line */}
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 border-2 border-purple-300 z-10 mt-2" />
                        {index !== completedTopics.topics.length - 1 && (
                          <div className="w-0.5 flex-1 bg-slate-700 min-h-[2.5rem]" />
                        )}
                      </div>
                      {/* Topic card */}
                      <div className="flex-1 mb-6">
                        <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-4 shadow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-block w-6 h-6 rounded-full ${topic.color} flex items-center justify-center text-lg font-bold`}>{topic.icon ? <span className="sr-only">{topic.icon}</span> : "📚"}</span>
                            <span className="text-white font-semibold text-base">{topic.name}</span>
                          </div>
                          <div className="text-xs text-slate-400 mb-1">{topic.description}</div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-purple-400 font-semibold">{topic.completion_percentage}% completed</span>
                            {topic.updated_at && (
                              <span className="text-slate-500">• {new Date(topic.updated_at).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400">No completed topics yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}