"use client";
// Future improvements: refactor to use a single modal component for all topics, add animations, and improve accessibility.
// Future improvements: refactor this component.
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  FlaskRoundIcon as Flask,
  Lock,
  ChevronRight,
  Star,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGenerateCourse } from "@/(features)/course-action";

type Difficulty = "beginner" | "intermediate" | "advanced";

interface DifficultyConfig {
  label: string;
  color: string;
  textColor: string;
  level: number;
  stats: {
    strength: number;
    intelligence: number;
    endurance: number;
  };
}

const difficultyMap: Record<Difficulty, DifficultyConfig> = {
  beginner: {
    label: "Beginner",
    color: "bg-green-100",
    textColor: "text-green-700",
    level: 1,
    stats: {
      strength: 3,
      intelligence: 5,
      endurance: 4,
    },
  },
  intermediate: {
    label: "Intermediate",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    level: 5,
    stats: {
      strength: 6,
      intelligence: 8,
      endurance: 7,
    },
  },
  advanced: {
    label: "Advanced",
    color: "bg-red-100",
    textColor: "text-red-700",
    level: 10,
    stats: {
      strength: 9,
      intelligence: 12,
      endurance: 10,
    },
  },
};

const topics = [
  {
    id: 1,
    name: "Mathematics",
    icon: Calculator,
    color: "bg-orange-100 text-orange-600",
    locked: false,
    difficulty: "beginner" as Difficulty,
    description:
      "Master the fundamentals of mathematics including arithmetic, algebra, and basic geometry.",
    rewards: ["AI Companion", "200 XP", "Math Wizard Badge"],
  },
  {
    id: 2,
    name: "Science",
    icon: Flask,
    color: "bg-green-100 text-green-600",
    locked: false,
    difficulty: "beginner" as Difficulty,
    description:
      "Explore the natural world through scientific inquiry and experimentation.",
    rewards: [
      "Scientific Method Mastery",
      "Observation +3",
      "Analytical Thinking",
    ],
  },
  {
    id: 3,
    name: "English",
    icon: Star,
    color: "bg-blue-100 text-blue-600",
    locked: false,
    difficulty: "beginner" as Difficulty,
    description:
      "Develop your English language skills including grammar, vocabulary, and reading comprehension.",
    rewards: [
      "Grammar Guru Badge",
      "200 XP",
      "Vocabulary Booster"
    ],
  },
  {
    id: 4,
    name: "Basic Python",
    icon: Flask,
    color: "bg-purple-100 text-purple-600",
    locked: false,
    difficulty: "beginner" as Difficulty,
    description:
      "Learn the basics of Python programming including syntax, variables, and simple logic.",
    rewards: [
      "Python Novice Badge",
      "200 XP",
      "Code Starter Pack"
    ],
  },
];

export function TopicSelectionCard() {
  const { generateCourseAsync, isPending } = useGenerateCourse();
  const [selectedTopic,] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmingTopic, setConfirmingTopic] = useState<
    (typeof topics)[0] | null
  >(null);

  const handleTopicClick = (topic: (typeof topics)[0]) => {
    if (!topic.locked) {
      setConfirmingTopic(topic);
      setModalOpen(true);
    }
  };

  async function handleGenerateCourse(subject: string, difficulty: string) {
    try {
      await generateCourseAsync({ subject, difficulty });
      setModalOpen(false);
    } catch (error) {
      console.error("Error generating course:", error);
      setModalOpen(false);
    }
  }

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const rewardItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };
  return (
    <>
      <TooltipProvider>
        <Card className="overflow-hidden h-90 glow-border">
          <CardHeader className="">
            <CardTitle className="text-lg">Educational Topics</CardTitle>
            <CardDescription>Select a topic to explore</CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-2 gap-2">
              {topics.map((topic) => {
                const Icon = topic.icon;

                const topicButton = (
                  <Button
                    key={topic.id}
                    variant="outline"
                    className={cn(
                      "h-auto flex-col gap-2 p-4 justify-start items-center border border-[#9F8DFC] relative",
                      selectedTopic === topic.id
                        ? "border-slate-400 bg-slate-50"
                        : "border-[#9F8DFC]",
                      topic.locked ? "opacity-80" : ""
                    )}
                    onClick={() => handleTopicClick(topic)}
                    disabled={topic.locked}
                  >
                    <div className={cn("rounded-full p-2", topic.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium text-[#9F8DFC]">
                      {topic.name}
                    </span>
                    {topic.locked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-500/70 rounded-sm">
                        <Lock className="h-4 w-4 text-slate-100" />
                      </div>
                    )}
                    {!topic.locked && (
                      <div
                        className={cn(
                          "absolute top-1 right-1 px-1.5 py-0.5 rounded-sm text-[10px] font-medium",
                          difficultyMap[topic.difficulty].color,
                          difficultyMap[topic.difficulty].textColor
                        )}
                      >
                        {difficultyMap[topic.difficulty].label}
                      </div>
                    )}
                  </Button>
                );

                return topic.locked ? (
                  <TooltipProvider key={topic.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>{topicButton}</TooltipTrigger>
                      <TooltipContent>
                        <p>Complete previous topics to unlock</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  topicButton
                );
              })}
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>

      <AnimatePresence>
        {modalOpen && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="sm:max-w-md border-0 bg-gray-900/80 text-white shadow-[0_0_15px_rgba(159,141,252,0.5)] overflow-hidden p-0">
              <motion.div
                className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.5 }}
              ></motion.div>

              <motion.button
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-20"
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-4 w-4 text-[#9F8DFC]" />
                <span className="sr-only">Close</span>
              </motion.button>

              <motion.div
                className="relative z-10"
                variants={dialogVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <DialogHeader className="border-b border-[#9F8DFC]/50 bg-gradient-to-r from-[#9F8DFC] to-gray-900 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#9F8DFC]"
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1,
                        }}
                      >
                        <Star className="h-4 w-4 text-[#9F8DFC]" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <DialogTitle className="text-xl font-bold">
                          QUEST CONFIRMATION
                        </DialogTitle>
                      </motion.div>
                    </div>
                    {confirmingTopic && (
                      <motion.div
                        className="flex items-center gap-1 rounded-full bg-[#9F8DFC] px-3 py-1 text-xs font-bold"
                        initial={{ opacity: 0, scale: 0, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.3, type: "spring" }}
                      >
                        <span>
                          LVL {difficultyMap[confirmingTopic.difficulty].level}
                        </span>
                      </motion.div>
                    )}
                  </div>
                  {confirmingTopic && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <DialogDescription className="mt-2 text-lg font-medium">
                        {confirmingTopic.name}
                      </DialogDescription>
                    </motion.div>
                  )}
                </DialogHeader>

                {confirmingTopic && (
                  <div className="p-6">
                    <motion.div
                      className="mb-4 rounded-md bg-gray-800/50 p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-sm text-gray-300">
                        {confirmingTopic.description}
                      </p>
                    </motion.div>

                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.h4
                        className="mb-2 text-sm font-bold text-[#9F8DFC]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        REWARDS
                      </motion.h4>
                      <ul className="space-y-2">
                        {confirmingTopic.rewards.map((reward, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                            custom={index}
                            variants={rewardItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <motion.div
                              className="h-1.5 w-1.5 rounded-full bg-[#9F8DFC]"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                            ></motion.div>
                            <span className="text-gray-300">{reward}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          variant="outline"
                          onClick={() => setModalOpen(false)}
                          className="mb-2 border-gray-700 bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white sm:mb-0"
                        >
                          Decline
                        </Button>
                      </motion.div>
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <Button
                          onClick={() => handleGenerateCourse(confirmingTopic.name, confirmingTopic.difficulty)}
                          loading={isPending}
                          disabled={isPending}
                          className="relative overflow-hidden bg-gradient-to-r from-[#9F8DFC] to-[#9F8DFC] text-white hover:from-[#9F8DFC] hover:to-[#9F8DFC]"
                        >
                          <motion.span
                            className="relative z-10 flex items-center font-bold"
                            whileHover={{ x: 5 }}
                          >
                            Confirm
                            <motion.div
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                duration: 0.6,
                              }}
                            >
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </motion.div>
                          </motion.span>
                          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="h-full w-full bg-[#9F8DFC]/20"></span>
                          </span>
                        </Button>
                      </motion.div>
                    </DialogFooter>
                  </div>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
