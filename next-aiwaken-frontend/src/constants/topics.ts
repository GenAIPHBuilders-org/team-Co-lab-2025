import {
  BookOpen,
  Calculator as CalculatorIcon,
  Code,
  FlaskRound,
} from "lucide-react";
import { Difficulty, DifficultyConfig, Topic } from "@/types/topic";

export const difficultyMap: Record<Difficulty, DifficultyConfig> = {
  beginner: {
    label: "Beginner",
    color: "bg-green-100",
    textColor: "text-green-700",
    level: 1,
  },
  intermediate: {
    label: "Intermediate",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    level: 5,
  },
  advanced: {
    label: "Advanced",
    color: "bg-red-100",
    textColor: "text-red-700",
    level: 10,
  },
};

export const topics: Topic[] = [
  {
    id: 1,
    name: "Mathematics",
    icon: CalculatorIcon,
    color: "bg-orange-100 text-orange-600",
    locked: false,
    difficulty: "beginner",
    description:
      "Master the fundamentals of mathematics including arithmetic, algebra, and basic geometry.",
    rewards: ["50 Coins", "200 XP", "Math Wizard Badge"],
  },
  {
    id: 2,
    name: "Science",
    icon: FlaskRound,
    color: "bg-green-100 text-green-600",
    locked: false,
    difficulty: "beginner",
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
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
    locked: false,
    difficulty: "beginner",
    description:
      "Develop your English language skills including grammar, vocabulary, and reading comprehension.",
    rewards: ["Grammar Guru Badge", "200 XP", "Vocabulary Booster"],
  },
  {
    id: 4,
    name: "Basic Python",
    icon: Code,
    color: "bg-purple-100 text-purple-600",
    locked: false,
    difficulty: "advanced",
    description:
      "Learn the basics of Python programming including syntax, variables, and simple logic.",
    rewards: ["Python Novice Badge", "200 XP", "Code Starter Pack"],
  },
];
