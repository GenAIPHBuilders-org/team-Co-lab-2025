"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGenerateCourse } from "@/(features)/course-action";
import { Topic } from "@/types/topic";
import { topics } from "@/constants/topics";
import { TopicCard } from "./topic-card";
import { TopicModal } from "./topic-modal";

export function TopicSelectionCard() {
  const { generateCourseAsync, isPending } = useGenerateCourse();
  const [selectedTopic,] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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
    <>
      <Card className="overflow-hidden h-90 glow-border">
        <CardHeader>
          <CardTitle className="text-lg">Educational Topics</CardTitle>
          <CardDescription>Select a topic to explore</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isSelected={selectedTopic === topic.id}
                onClick={handleTopicClick}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <TopicModal
        topic={confirmingTopic}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleGenerateCourse}
        isPending={isPending}
      />
    </>
  );
}
