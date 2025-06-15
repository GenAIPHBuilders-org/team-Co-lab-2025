"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useGenerateCourse } from "@/(features)/course-action";
import { Topic } from "@/types/topic";
import { topics } from "@/constants/topics";
import { TopicCard } from "./topic-card";
import { TopicModal } from "./topic-modal";
import { motion } from "framer-motion";
import AnimationVariants from "@/lib/animations";

export function TopicSelectionCard() {
  const { generateCourseAsync, isPending } = useGenerateCourse();
  const [selectedTopic,] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmingTopic, setConfirmingTopic] = useState<Topic | null>(null);

  const handleTopicClick = (topic: Topic) => {
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


  return (
    <React.Fragment>
      <Card className="bg-gray-900 p-6 rounded-lg relative shadow-lg flex-2 h-90 overflow-hidden">
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        <CardContent className="p-6">
          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={AnimationVariants.itemVariants}
          >
            <motion.h2
              className="text-2xl font-bold"
              initial={false}
              animate={{ scale: 1 }}
            >
              Educational Topics
            </motion.h2>
            <motion.div
              className="topic-badge"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 8px rgba(159, 141, 252, 0.5)",
              }}
            >
              <span className="text-xs text-muted-foreground">Pick one</span>
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
            className="grid grid-cols-2 gap-2"
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
