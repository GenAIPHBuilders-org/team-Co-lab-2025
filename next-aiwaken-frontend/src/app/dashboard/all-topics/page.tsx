"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Grid, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { AllTopicsGrid } from "@/components/all-topics-grid";
import { useGenerateCourse } from "@/(features)/course-action";
import { TopicModal } from "@/components/topic-modal";
import { useFetchAllTopics } from "@/(features)/topic-action";
import { TTopics } from "@/services/topic-service";

export default function AllTopicsPage() {
  const router = useRouter();
  const { allAvailableTopic, isLoading } = useFetchAllTopics();
  const { generateCourseAsync, isPending } = useGenerateCourse();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<TTopics | null>(null);

  const data = allAvailableTopic.topics

  const filteredTopics = data.filter((topic) => {
    const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || topic.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleTopicClick = (topic: TTopics) => {
    if (!topic.locked) {
      setSelectedTopic(topic);
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

  const getDifficultyStats = () => {
    const stats = {
      beginner: data.filter(t => t.difficulty === "beginner").length,
      intermediate: data.filter(t => t.difficulty === "intermediate").length,
      advanced: data.filter(t => t.difficulty === "advanced").length,
    };
    return stats;
  };

  const stats = getDifficultyStats();

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="text-white hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >

              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white">All Topics</h1>
                  <p className="text-gray-400">Explore all available learning topics</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="text-white"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="text-white"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Topics</p>
                      <p className="text-2xl font-bold text-white">{allAvailableTopic.total}</p>
                    </div>
                    <div className="w-8 h-8 bg-[#9F8DFC]/20 rounded-lg flex items-center justify-center">
                      <span className="text-[#9F8DFC] text-sm font-semibold">T</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Beginner</p>
                      <p className="text-2xl font-bold text-green-400">{stats.beginner}</p>
                    </div>
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 text-sm font-semibold">B</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Intermediate</p>
                      <p className="text-2xl font-bold text-yellow-400">{stats.intermediate}</p>
                    </div>
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 text-sm font-semibold">I</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Advanced</p>
                      <p className="text-2xl font-bold text-red-400">{stats.advanced}</p>
                    </div>
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-red-400 text-sm font-semibold">A</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row gap-4 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedDifficulty === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("all")}
                  className="text-white"
                >
                  All
                </Button>
                <Button
                  variant={selectedDifficulty === "beginner" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("beginner")}
                  className="text-white"
                >
                  Beginner
                </Button>
                <Button
                  variant={selectedDifficulty === "intermediate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("intermediate")}
                  className="text-white"
                >
                  Intermediate
                </Button>
                <Button
                  variant={selectedDifficulty === "advanced" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("advanced")}
                  className="text-white"
                >
                  Advanced
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {filteredTopics.length > 0 ? (
                <AllTopicsGrid topics={filteredTopics} onTopicClick={handleTopicClick} />
              ) : (
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No topics found</h3>
                    <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </>
        )}
      </div>

      <TopicModal
        topic={selectedTopic}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleGenerateCourse}
        isPending={isPending}
      />
    </div>
  );
} 