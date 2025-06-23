"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGenerateCourse } from "@/(features)/course-action";
import { TopicCard } from "./topic-card";
import { TopicModal } from "./topic-modal";
import { motion } from "framer-motion";
import AnimationVariants from "@/lib/animations";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { TTopics } from "@/services/topic-service";
import { useFetchAllTopics } from "@/(features)/topic-action";
import { TokenStorage } from "@/lib/token-storage";
import { CourseCard } from "./course-card";
import { Course } from "@/app/dashboard/course-structure/mock";

export function TopicSelectionCard() {
  const [progressValue, setProgressValue] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const courseData = TokenStorage.getCourseData();
  const { allAvailableTopic } = useFetchAllTopics();
  const { generateCourseAsync, isPending } = useGenerateCourse();
  const [selectedTopic,] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmingTopic, setConfirmingTopic] = useState<TTopics | null>(null);
  const router = useRouter();

  const topics = allAvailableTopic.topics.slice(0, 4);
  console.log(topics);
  const handleTopicClick = (topic: TTopics) => {
    if (!topic.locked) {
      setConfirmingTopic(topic);
      setModalOpen(true);
    }
  };

  const handleGenerateCourse = async (subject: string, difficulty: string) => {
    try {
      await generateCourseAsync({ subject, difficulty });
      setModalOpen(false);
    } catch (error) {
      console.error("Error generating course:", error);
      setModalOpen(false);
    }
  };

  const handleViewAllTopics = () => {
    router.push("/dashboard/all-topics");
  };


  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => {
      setProgressValue(40)
    }, 100)
    return () => clearTimeout(timer)
  }, [])


  return (
    <React.Fragment>
      <Card className="bg-gray-900 p-6 rounded-lg relative shadow-lg flex-2 overflow-hidden">
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        <CardContent className="p-6">
          <motion.div
            className="flex items-center justify-between mb-4"
            initial="hidden"
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={AnimationVariants.itemVariants}
            animate={isLoaded ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-2xl font-bold"
              initial={false}
              animate={{ scale: 1 }}
            >
              Educational Topics
            </motion.h2>
            <motion.div
              className="flex items-center gap-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
            >
              <span className="text-xs text-muted-foreground">Pick one</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewAllTopics}
                className="text-[#9F8DFC] hover:text-[#9F8DFC]/80 hover:bg-[#9F8DFC]/10"
              >
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-muted-foreground text-sm">
              Select a topic to explore
            </span>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isSelected={selectedTopic === topic.id}
                onClick={handleTopicClick}
              />
            ))}
          </motion.div>

        </CardContent>
        {courseData && (
          <CourseCard courseData={courseData as Course} progressValue={progressValue as number} />
        )}
      </Card>

      <TopicModal
        topic={confirmingTopic}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleGenerateCourse}
        isPending={isPending}
      />
    </React.Fragment>
  );
}
