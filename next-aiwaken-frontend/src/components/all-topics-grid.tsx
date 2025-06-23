"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import AnimationVariants from "@/lib/animations";
import { Lock, Star, Trophy, Zap, Heart, Calculator, Beaker } from "lucide-react";
import { TTopics } from "@/services/topic-service";

interface AllTopicsGridProps {
  topics: TTopics[];
  onTopicClick: (topic: TTopics) => void;
}

const getRewardIcon = (reward: string) => {
  if (reward.toLowerCase().includes('coin')) return <Zap className="h-3 w-3" />;
  if (reward.toLowerCase().includes('badge')) return <Trophy className="h-3 w-3" />;
  if (reward.toLowerCase().includes('heart')) return <Heart className="h-3 w-3" />;
  if (reward.toLowerCase().includes('xp')) return <Star className="h-3 w-3" />;
  return <Star className="h-3 w-3" />;
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'advanced':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getTopicIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'calculator':
      return <Calculator className="h-5 w-5" />;
    case 'flask':
      return <Beaker className="h-5 w-5" />;
    case 'star':
      return <Star className="h-5 w-5" />;
    default:
      return <Star className="h-5 w-5" />;
  }
};

export function AllTopicsGrid({ topics, onTopicClick }: AllTopicsGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={AnimationVariants.containerVariants}
      initial="hidden"
      animate="visible"
    >
      {topics.map((topic, index) => (
        <motion.div
          key={topic.id}
          variants={AnimationVariants.itemVariants}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${topic.locked ? 'opacity-60' : 'hover:border-[#9F8DFC]'
            }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${topic.color}`}>
                    {getTopicIcon(topic.icon as string)}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-white">
                      {topic.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getDifficultyColor(topic.difficulty)}`}
                      >
                        {topic.difficulty}
                      </Badge>
                      {topic.min_level_required && topic.min_level_required > 1 && (
                        <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                          Level {topic.min_level_required}+
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                {topic.locked && (
                  <Lock className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-300 line-clamp-2">
                {topic.description}
              </p>

              {topic.completion_percentage !== undefined && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Progress</span>
                    <span>{topic.completion_percentage}%</span>
                  </div>
                  <Progress
                    value={topic.completion_percentage}
                    className={`h-2 ${topic.is_completed ? "bg-green-500" : ""}`}
                  />
                  {topic.is_completed && (
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <Star className="h-3 w-3" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              )}

              {topic.rewards && topic.rewards.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-400">Rewards</h4>
                  <div className="flex flex-wrap gap-1">
                    {topic.rewards.slice(0, 3).map((reward, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs bg-[#9F8DFC]/10 text-[#9F8DFC] border-[#9F8DFC]/20 flex items-center gap-1"
                      >
                        {getRewardIcon(reward)}
                        {reward}
                      </Badge>
                    ))}
                    {topic.rewards.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 border-gray-200">
                        +{topic.rewards.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={() => onTopicClick(topic)}
                disabled={topic.locked}
                className={`w-full ${topic.locked
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-[#9F8DFC] hover:bg-[#9F8DFC]/80 text-white'
                  }`}
              >
                {topic.locked ? 'Locked' : topic.is_completed ? 'Review' : 'Start Learning'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
} 